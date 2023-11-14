import { UseContexto } from "../Contexto";
import {Navigate} from 'react-router-dom';

export function Tareas(){
    const {permiso} = UseContexto();
    if(!permiso) return <Navigate to="/login"/>
    return(
        <div className="tareas">
            Aqui van las tareas
        </div>
    );
}