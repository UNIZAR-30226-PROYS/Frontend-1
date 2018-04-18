/* Reemplazar enlaces por carga asíncrona */

// TODO: decidir como van a ser las URLs
// TODO: no poder acceder a ficheros de contenido (sin marco)

var dominio = 'http://localhost/';

$(document).ready(function(){

    //No se deberia poder acceder a los ficheros sin marco
    if($("#contenido").length === 0){
        window.location = dominio;
    }

    $('body').on('click','a',function(e){
        e.preventDefault(); //Prevenir comportamiento por defecto

        try{
            var origen = window.location.href;
            var destino = $(this).attr('href');

            if(origen!==destino) { //todo: revisar esto para no insertar nuevas entradas en el historial si vas a la misma pagina
                // Cargar contenido
                $("#contenido").load(destino);

                // Cambiar URL y titulo
                setTimeout(function(){ //todo: mejorar esto para mostrar el titulo directamente y no depender de un timeout de 100ms
                    window.history.pushState({"html":destino,"titulo":$('#tituloNuevo').attr('value')}, "", destino);
                    document.title = $('#tituloNuevo').attr('value');
                },100);
            }
        }catch($ex){
            window.console && console.log($ex);
        }finally{
            return false;
        }
    })
});

window.onpopstate = function(e){
    if(e.state){
        $("#contenido").load(e.state.html);
        document.title = e.state.titulo;
    }
};