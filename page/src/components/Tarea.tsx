import { UseContexto } from "../Contexto";
import { convertirTiempo } from "../utilities/convertirTiempo";


export function CajaTarea(props:Tarea){
    const {tareaTitle, creada} = props;
     const {setMostrarTarea, setMostrar} = UseContexto();
    const {fecha, hora} = convertirTiempo(creada);
    const mostrar = () =>{
        setMostrarTarea(props);
        setMostrar(true);
    }
    return(
        <div className="caja-tarea">
            <h2 className="tarea-title" onClick={mostrar}>{tareaTitle}</h2>
            <span className="tiempo">{fecha} {hora}</span>
        </div>
    );
}