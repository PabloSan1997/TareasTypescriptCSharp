import { UseContexto } from "../Contexto";
import { Navigate } from 'react-router-dom';
import { ContenedorTareas } from "../components/Contenedor";
import { MostrarTarea } from "../components/MostrarTarea";
import { FormularioAgregar } from "../components/FormularioAgregar";

export function Tareas() {
    const { permiso, mostrar } = UseContexto();
    if (!permiso) return <Navigate to="/login" />
    return (
        <> 
            <FormularioAgregar/>
            <ContenedorTareas />
            {mostrar ? <MostrarTarea /> : null}
        </>
    );
}