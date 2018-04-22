/* Ideas obtenidas de https://codepen.io/markhillard/pen/Hjcwu?editors=1010	*/
/* Last Modified : 22/04/2018 Jorge	*/

jQuery(document).ready(function() {
	var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
		    var index = 0;
            playing = false;
			repeat_option = false;
            mediaPath = 'music/';
            extension = '';
						
            /* tracks = [{
                "track": 1,	"name": "All This Is - Joe L.'s Studio",	"duration": "2:46",	 "file": "JLS_ATI"	}
			];	*/
			
				
			/*	Modificar variables array   */
			/* $(tracks).each(function(key, value) {
				   if (value.track == "1") {
					value.name = "casa";
				}
			});
			tracks[0].name= "nuevo nombre"; */
			
	
			var tracks = [];
			var file = "music/nombre_canciones.txt";
			var tracks_aux = [];
			$.ajaxSetup({async: false});
			$.get(file,function(txt){		/* Llamada AJAX Asíncrona */
				var lines = txt.split("\n");
				for (var i = 0, len = lines.length; i < len; i++) {
					 var componentes = lines[i].split(",");
					 tracks_aux.push({ track: (i+1), name: componentes[0], duration: componentes[1] });
					 
				}
				tracks = tracks_aux;	//getFile(tracks_aux);
			});
			$.ajaxSetup({async: true});
			
			function getFile(f){	tracks = f;	};

			// alert(tracks[0].track + tracks[0].name + tracks[0].duration);	alert(tracks[1].track + tracks[1].name + tracks[1].duration);

			/* FALTA CAMBIAR */
            buildPlaylist = $(tracks).each(function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li><div class="plItem"><span class="plNum">' + trackNumber + '.</span><span class="plTitle">' + trackName + '</span><span class="plLength">' + trackDuration + '</span></div></li>');
            }),
			 
            trackCount = tracks.length,
            npTitle = $('#npTitle'),
           
		   audio = $('#audio1').on('play', function () {
                playing = true;
            }).on('pause', function () {
                playing = false;
            }).on('ended', function () {
				if (repeat_option == true ){
					loadTrack(index);
					audio.play();
				}
				else{
					if ((index + 1) < trackCount) {
						index++;
						loadTrack(index);
						audio.play();
					} else {
						audio.pause();
						index = 0;
						loadTrack(index);
					}
				}
            }).get(0),	
			
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
			
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
			
			btnRandom = $('#btnRandom').on('click', function () {
				loadTrack(Math.floor(Math.random() * (tracks.length ) )  );
				if (playing) {
					audio.play();
				}
            }),
			
			btnRepeat = $('#btnRepeat').on('click', function () {
				if (repeat_option == true){
					repeat_option = false;
				}
				else{
					repeat_option = true;
				}
            }),
			
			/* FALTA CAMBIAR */
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
			
			/* FALTA CAMBIAR */
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].name;
            },
			
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
			
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';		
        loadTrack(index);
	}
	else {
		alert("Su navegador no es capaz de reproducir canciones");
	}
});
