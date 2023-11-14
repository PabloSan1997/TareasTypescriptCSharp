

export async function usuarioLogin(usuario:UsarioLogin):Promise<UsuarioRsultLogin>{
    const url = import.meta.env.VITE_URL_API;
    const ft = await fetch(`${url}/Usuario/login`, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(usuario)
    });
    const datos = await ft.json() as Respuesta;
    if(datos.statusCode>299) throw datos.results;
    return datos.results as UsuarioRsultLogin
}