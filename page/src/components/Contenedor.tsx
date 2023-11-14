import { UseContexto } from "../Contexto";
import { CajaTarea } from "./Tarea";

export function ContenedorTareas(){
    const {tareas} = UseContexto();
    return(
        <main className="contenedor-tareas">
            {tareas.map(p=>(
                <CajaTarea key={p.id_tarea} {...p}/>
            ))}
        </main>
    );
}