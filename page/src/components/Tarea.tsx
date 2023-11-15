import { UseContexto } from "../Contexto";
import { convertirTiempo } from "../utilities/convertirTiempo";
import '../estilos/tarea.css';

export function CajaTarea(props:Tarea){
    const {tareaTitle, creada} = props;
     const {setMostrarTarea, setMostrar, cumplirTarea} = UseContexto();
    const {fecha, hora} = convertirTiempo(creada);
    const mostrar = () =>{
        setMostrarTarea(props);
        setMostrar(true);
    }
    const editarPalomita=()=>{
        cumplirTarea(props);
    }
    return(
        <div className={`caja-tarea ${props.estado?'hecha':'no-hecha'}`}>
            <span className="palomita" onClick={editarPalomita}>&#10003;</span>
            <h2 className="tarea-title" onClick={mostrar}>{tareaTitle}</h2>
            <span className="tiempo">{fecha} {hora}</span>
        </div>
    );
}