import { UseContexto } from "../Contexto";
import {Navigate} from 'react-router-dom';


export function Redirigir(){
    const {permiso} = UseContexto();
    if(permiso) return <Navigate to="/tareas"/>
    return <Navigate to="/login"/>
}