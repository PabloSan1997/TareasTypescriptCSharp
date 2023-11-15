import React from "react";
import { UseContexto } from "../Contexto";
import '../estilos/agregarFormulario.css';

export function FormularioAgregar() {
    const { agregarNuevaTarea } = UseContexto();
    const [texto, setTexto] = React.useState<TareaCrear>({ tareaDescription: '', tareaTitle: '' });
    const setTitulo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTexto({ ...texto, tareaTitle: e.target.value });
    }
    const setDescripcion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTexto({ ...texto, tareaDescription: e.target.value });
    }
    const subir = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        agregarNuevaTarea(texto).then(() => setTexto({ tareaDescription: '', tareaTitle: '' }));
    }
    return (
        <form className="agregarFormulario" onSubmit={subir}>
            <div className="fila">
                <label htmlFor="nombre">Titulo</label>
                <input
                    type="text"
                    className="entrada"
                    id="nombre"
                    value={texto.tareaTitle}
                    onChange={setTitulo}
                />
            </div>
            <div className="fila">
                <label htmlFor="descr">Descripcion</label>
                <input
                    type="text"
                    className="entrada"
                    id="descr"
                    value={texto.tareaDescription}
                    onChange={setDescripcion}
                />
            </div>
            <button type="submit" className="boton">Agregar</button>
        </form>
    );
}