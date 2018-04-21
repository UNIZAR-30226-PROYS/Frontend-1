/* Invocada al buscar */
function buscar(camposUrl){
    try {
        var origen = window.location.href;
        var destino = 'resultados.html?'+camposUrl;

        // Cargar contenido
        $("#contenido").load(destino);

        // Cambiar URL y titulo
        setTimeout(function () { //todo: mejorar esto para mostrar el titulo directamente y no depender de un timeout de 100ms
            window.history.pushState({
                "html": destino,
                "titulo": $('#tituloNuevo').attr('value')
            }, "", destino);
            document.title = $('#tituloNuevo').attr('value');
        }, 100);
    } catch ($ex) {
        window.console && console.log($ex);
    } finally {
        return false;
    }
}

$(document).ready(function(){
    $('#formBuscar').submit(function(e){
        e.preventDefault();
        var campos = $('#formBuscar').serialize();
        buscar(campos);
    });
});