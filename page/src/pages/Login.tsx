import { UseContexto, initialUsuario } from "../Contexto";
import { Navigate } from 'react-router-dom';
import React from "react";
import '../estilos/login.css';

export function Login() {
    const { permiso, setLogin } = UseContexto();
    const [texto, setTexto] = React.useState(initialUsuario);

    if (permiso) return <Navigate to="/tareas" />

    const setNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTexto({ ...texto, name: e.target.value });
    }

    const setContrasena = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTexto({ ...texto, password: e.target.value });
    }

    const enviar = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLogin(texto);
    }

    return (
        <form className="formulario-login" onSubmit={enviar}>
            <h2 className="titulo">Inicie Seción</h2>
            <label htmlFor="entrada1">Nombre</label>
            <input
                type="text"
                className="entrada"
                id="entrada1"
                value={texto.name}
                onChange={setNombre}
                placeholder="Escribir"
            />
            <label htmlFor="entrada1">Contraseña</label>
            <input
                type="password"
                className="entrada"
                id="entrada2"
                value={texto.password}
                onChange={setContrasena}
                placeholder="Escribir"
            />
            <button className="boton" type="submit">Entrar</button>
        </form>
    );
}