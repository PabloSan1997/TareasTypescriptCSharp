/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { usuarioLogin } from "./apis/usuarioLogin";
import { useCookies } from 'react-cookie';
import { agregarTarea, cambiarEstadoTarea, eliminarTarea, readTareas } from "./apis/tareasRquest";

const Contexto = React.createContext({});

// eslint-disable-next-line react-refresh/only-export-components
export const initialUsuario: UsarioLogin = {
    name: '',
    password: ''
}

export function Provedor({ children }: Children) {
    const [permiso, setPermiso] = React.useState(false);
    const [login, setLogin] = React.useState<UsarioLogin>(initialUsuario);
    const [name, setName] = React.useState("Pablo");
    const [cookies, setCookie, removeCookie] = useCookies(['pasale']);
    const [tareas, setTareas] = React.useState<Tarea[]>([]);
    const [mostrarTarea, setMostrarTarea] = React.useState<Tarea>();
    const [mostrar, setMostrar] = React.useState(false);
    const [actualizar, setActualizar] = React.useState(false);

    React.useEffect(() => {
        usuarioLogin(login)
            .then(data => {
                setPermiso(data.permiso);
                setCookie('pasale', data.token, {
                    maxAge: 5 * 60 * 60
                });
            })
            .catch(() => {
                setPermiso(false);
                setLogin(initialUsuario);
            });
    }, [login]);
    React.useEffect(() => {
        readTareas(cookies.pasale)
            .then(data => {
                setName(data.name);
                setTareas(data.tareas);
                setPermiso(true);
            })
            .catch(() => {
                setPermiso(false);
                setTareas([]);
            });
    }, [permiso, actualizar]);

    const logout = () => {
        removeCookie('pasale');
        setPermiso(false);
    }

    const agregarNuevaTarea = async (tareanueva: TareaCrear) => {
        try {
            await agregarTarea(cookies.pasale, tareanueva);
            setActualizar(!actualizar);
        } catch (error) {
            alert('Problemas al agregar nueva tarea');
        }
    }

    const eliminaTareaProceso = async (id_tarea: string) => {
        try {
            await eliminarTarea(cookies.pasale, id_tarea);
            setActualizar(!actualizar);
        } catch (error) {
            alert("Problemas para eliminar elemento");
        }
    }

    const cumplirTarea = async (tarea: Tarea) => {
        try {
            const data = await cambiarEstadoTarea(cookies.pasale, tarea);
            setActualizar(!actualizar);
            console.log(data);
        } catch (error) {
            alert('Error al checar tarea');
        }
    }

    return (
        <Contexto.Provider value={{
            permiso,
            login,
            setLogin,
            name,
            tareas,
            logout,
            mostrarTarea,
            setMostrarTarea,
            mostrar,
            setMostrar,
            agregarNuevaTarea,
            eliminaTareaProceso,
            cumplirTarea
        }}>
            {children}
        </Contexto.Provider>
    );
}

export const UseContexto = () => React.useContext(Contexto) as Contexto;