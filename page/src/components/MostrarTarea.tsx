import { UseContexto } from "../Contexto";
import { convertirTiempo } from "../utilities/convertirTiempo";

export function MostrarTarea(){
    const {mostrarTarea, setMostrar} = UseContexto();
    const {tareaTitle, tareaDescription, creada} = mostrarTarea;
    const {fecha, hora} = convertirTiempo(creada);
    return(
        <div className="mostrar-tarea">
            <span className="cerrar" onClick={()=>setMostrar(false)}>X</span>
            <h2 className="tarea-titulo">{tareaTitle}</h2>
            <p className="descripcion">{tareaDescription}</p>
            <span className="fecha">{fecha} {hora}</span>
        </div>
    );
}