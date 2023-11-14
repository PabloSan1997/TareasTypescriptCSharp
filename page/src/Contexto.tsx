import React from "react";
import { usuarioLogin } from "./apis/usuarioLogin";

const Contexto = React.createContext({});

const initialUsuario:UsarioLogin = {
    name:'pablo',
    password:'admin1223'
}

export function Provedor({ children }: Children) {
    const [permiso, setPermiso] = React.useState(false);
    const [login, setLogin] = React.useState<UsarioLogin>(initialUsuario);
    React.useEffect(()=>{
        usuarioLogin(login)
        .then(data => setPermiso(data.permiso))
        .catch(()=> setPermiso(false));
    },[]);
    return (
        <Contexto.Provider value={{
            permiso,
            login,
            setLogin
        }}>
            {children}
        </Contexto.Provider>
    );
}

export const UseContexto = () => React.useContext(Contexto) as Contexto;