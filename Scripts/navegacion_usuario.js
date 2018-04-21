/* Navegacion interna en el perfil de un usuario */
$(document).ready(function(){
    $('#profileNav').on('click','a',function(e){
        e.preventDefault();

        try{
            var destino = $(this).attr('href');

            switch(destino){
                case 'actividad':
                    $("#contenido-perfil").load('includes/usuario_actividad.html');
                    break;
                case 'listas':
                    $("#contenido-perfil").load('listas.html');
                    break;
                case 'canciones':
                    $("#contenido-perfil").load('includes/usuario_canciones.html');
                    break;
                case 'siguiendo':
                    $("#contenido-perfil").load('includes/usuario_siguiendo.html');
                    break;
                case 'seguidores':
                    $("#contenido-perfil").load('includes/usuario_seguidores.html');
                    break;
            }
        }catch($ex){
            window.console && console.log($ex);
        }finally{
            return false;
        }
    })
});