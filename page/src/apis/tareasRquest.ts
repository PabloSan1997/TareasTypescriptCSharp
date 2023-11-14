

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