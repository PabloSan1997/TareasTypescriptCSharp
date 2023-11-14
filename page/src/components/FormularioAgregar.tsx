import React from "react";
import { UseContexto } from "../Contexto";


export function FormularioAgregar() {
    const { agregarNuevaTarea } = UseContexto();
    const [texto, setTexto] = React.useState<TareaCrear>({ tareaDescription: '', tareaTitle: '' });
    const setTitulo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTexto({ ...texto, tareaTitle: e.target.value });
    }
    const setDescripcion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTexto({ ...texto, tareaDescription: e.target.value });
    }
    const subir =(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        agregarNuevaTarea(texto).then(()=>setTexto({ tareaDescription: '', tareaTitle: '' }));
    }
    return (
        <form className="agregarFormulario" onSubmit={subir}>
            <label htmlFor="nombre">Titulo</label>
            <input
                type="text"
                className="entrada"
                id="nombre"
                value={texto.tareaTitle}
                onChange={setTitulo}
            />
            <label htmlFor="descr">Descripcion</label>
            <input
                type="text"
                className="entrada"
                id="descr"
                value={texto.tareaDescription}
                onChange={setDescripcion}
            />
            <button type="submit">Agregar</button>
        </form>
    );
}