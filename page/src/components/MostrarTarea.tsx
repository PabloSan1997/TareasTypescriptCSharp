import { UseContexto } from "../Contexto";
import { convertirTiempo } from "../utilities/convertirTiempo";

export function MostrarTarea(){
    const {mostrarTarea, setMostrar, eliminaTareaProceso} = UseContexto();
    const {tareaTitle, tareaDescription, creada, id_tarea} = mostrarTarea;
    const {fecha, hora} = convertirTiempo(creada);
    const quitar =()=>{
        eliminaTareaProceso(id_tarea).then(()=>setMostrar(false));
    }
    return(
        <div className="mostrar-tarea">
            <span className="cerrar" onClick={()=>setMostrar(false)}>X</span>
            <h2 className="tarea-titulo">{tareaTitle}</h2>
            <p className="descripcion">{tareaDescription}</p>
            <span className="fecha">{fecha} {hora}</span>
            <button className="boton" onClick={quitar}>Eliminar Tarea</button>
        </div>
    );
}