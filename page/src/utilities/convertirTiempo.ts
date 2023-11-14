

export function convertirTiempo(tiempo:Date):{fecha:string, hora:string}{
    const texto = tiempo.toString();
    const ver = Date.parse(texto);
    const data = new Date(ver);
    const fecha = data.toLocaleDateString();
    const hora = data.toLocaleTimeString();
    return {hora, fecha};
}