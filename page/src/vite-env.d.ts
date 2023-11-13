/// <reference types="vite/client" />

interface UsarioLogin {
    name:string,
    password:string
}
interface UsuarioRsultLogin{
    token:string,
    permiso:boolean,
    message:string
}
interface TareaCrear{
    tareaTitle:"string",
    tareaDescription:string
}
interface TareaEditar extends TareaCrear{
    estado:boolean
}
interface Tarea extends TareaEditar{
    id_tarea:string,
    creada:Date,
}
interface Respuesta {
    statusCode:number,
    statusMessage:string,
    results:object
}