import { UseContexto } from "../Contexto";

export function Header(){
    const {permiso, name, logout} = UseContexto();
    return(
        <header>
            <h1>Mis tareas</h1>
            {permiso?(
                <div className="area_botones">
                    <span className="nombre">{name}</span>
                    <span className="logut" onClick={logout}>Logout</span>
                </div>
            ):null}
        </header>
    );
}