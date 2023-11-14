import { UseContexto } from "../Contexto";
import '../estilos/header.css';

export function Header() {
    const { permiso, name, logout, tareas } = UseContexto();
    const hechas = tareas.filter(p => p.estado);
    const total = tareas.length;
    const totalHechas = hechas.length;
    return (
        <header>
            <h1>Mis tareas</h1>
            {permiso ? (
                <>
                    <p className="conteo-tareas">
                        Tareas hechas: <span className="tareas">{totalHechas}/{total}</span>
                    </p>
                    <div className="area_botones">
                        <span className="nombre">{name}</span>
                        <span className="logut" onClick={logout}>Logout</span>
                    </div>
                </>
            ) : null}
        </header>
    );
}