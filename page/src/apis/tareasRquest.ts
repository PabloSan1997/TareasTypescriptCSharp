

export async function readTareas(token:string):Promise<UsuarioTareas>{
    const url = import.meta.env.VITE_URL_API;
    const ft = await fetch(`${url}/Tareas`,{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${token}`
        }
    });
    const data = await ft.json() as Respuesta;
    const respuesta = data.results as UsuarioTareas;
    return respuesta;
}


export async function agregarTarea(token:string, nuevaTarea:TareaCrear){
    const url = import.meta.env.VITE_URL_API;
    const ft = await fetch(`${url}/Tareas`, {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify(nuevaTarea)
    });
    if(ft.ok) return await ft.json();
}

export async function eliminarTarea(token:string, id_tarea:string){
    const url = import.meta.env.VITE_URL_API;
    const ft = await fetch(`${url}/Tareas/${id_tarea}`, {
        method:'DELETE',
        headers:{
            'Authorization':`Bearer ${token}`
        }
    });
    if(!ft.ok) throw await ft.json();
}


export async function  cambiarEstadoTarea(token:string, tarea:Tarea) {
    const url = import.meta.env.VITE_URL_API;
    const {id_tarea, tareaDescription, tareaTitle, estado} = tarea;
    const tareaEstado = {
        tareaTitle,
        tareaDescription,
        estado:!estado
    }
    const ft = await fetch(`${url}/Tareas/${id_tarea}`, {
        method:'PUT',
        headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify(tareaEstado)
    });
    const data = await ft.json() as Respuesta;
    return data.results as Tarea;
}