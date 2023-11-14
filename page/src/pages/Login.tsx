import { UseContexto } from "../Contexto";
import {Navigate} from 'react-router-dom';

export function Login(){
    const {permiso} = UseContexto();
    if(permiso) return <Navigate to="/tareas"/>
    return(
        <div className="login">Aqui va el login</div>
    );
}