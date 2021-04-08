window.onload = function(){
    //String base para el debugger
    var strDebug = '';
    var debug = document.getElementById('debug');
    // Tamaño del viewport
    var altoBrowser = window.innerHeight;
    strDebug += "Alto del browser: "+ altoBrowser + "px <br />";

    //Obtener video
    var videos = document.querySelectorAll("html body main div.album py-5 bg-light mar div.container video");
    var aVideos = []; //Esto guarda los datos del video
    //Detectar ubicación con respecto al body
    videos.forEach(
        function( v ){
            var vidAlto = v.offsetHeight;
            var vidMax = v.offsetTop;
            var vidMin = v.offsetTop - altoBrowser + vidAlto;
            strDebug += "Video encontrado - " + vidMax + " - "+ vidMin + "<br />";
            aVideos.push(
            {
                minimo: vidMin,
                maximo: vidMax,
                video: v
            });
        }
    );

    //Detecta scroll
    document.body.onscroll = function( ){
        var y = window.pageYOffset;
        debug.innerHTML = strDebug + "Posición actual " + y + "px <br />";
        //Ver si el video corresponde el scroll
        for(var i in aVideos){
            if(y > aVideos[i].minimo && y < aVideos[i].maximo){
                aVideos[i].video.play();
            } 
        }
    }

    debug.innerHTML = strDebug;
}