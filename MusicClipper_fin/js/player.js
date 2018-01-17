/*
 * sourceType
 * 0: mix cloud
 * 1: sound cloud*/

/*
 * btn_play : '#play_toggle'
 * btn_next : '#play_next'
 * btn_prev : '#play_prev'
 * thumnail : '#'*/

function MC(){
	this.playState = 'STOP';//STOP, PLAYING, PAUSE
	this.sourceType = 0;
	var widget = null;
	var self = this;
	this.playMusic = function(){
		console.log('playMusic,'+this.playState);
		$("#playIcon").removeClass("glyphicon-play").removeClass("glyphicon-pause").addClass("glyphicon-refresh");
		if(this.playState=='STOP'){
			if(this.sourceType==0){//mix
				console.log('mixcloud');
				widget = Mixcloud.PlayerWidget(document.getElementById('musicFrame'));
				widget.ready.then(function() {
					console.log("mixcloud widget is ready");
					widget.events.play.on(playListener(self));
					function playListener(player){
						player.playState = 'PLAYING';
						$("#playIcon").removeClass("glyphicon-refresh").removeClass("glyphicon-play").addClass("glyphicon-pause");
						console.log('playListener,'+player.playState);
					}
					widget.play();
				});
			}
			else if(this.sourceType==1){
				console.log('soundcloud');
				widget = SC.Widget('musicFrame');
				widget.bind(SC.Widget.Events.PLAY,playListener(self));
				function playListener(player){
					player.playState = 'PLAYING';
					$("#playIcon").removeClass("glyphicon-refresh").removeClass("glyphicon-play").addClass("glyphicon-pause");
					console.log('playListener,'+player.playState);
				}
				console.log("soundcloud widget is ready");
				widget.play();
			}
		}
		else if(this.playState=='PLAYING'){
			console.log('ERR:music is already playing');
		}
		else if(this.playState=='PAUSE'){
			widget.play();
			$("#playIcon").removeClass("glyphicon-refresh").removeClass("glyphicon-play").addClass("glyphicon-pause");
			this.playState = 'PLAYING';
		}
	}
	
	this.pauseMusic = function(){
		console.log('pauseMusic');
		this.playState = 'PAUSE';
		$("#playIcon").removeClass("glyphicon-pause").removeClass("glyphicon-refresh").addClass("glyphicon-play");
		widget.pause();
	}
	this.setPlayState = function(state){
		this.playState = state;
	}
	this.setTitle = function(title){
		$("#player-title").html(title);
	}
	this.setSinger = function(singer){
		$("#player-singer").html(singer);
	}
	this.setThumnailURL = function(url){
		$("#player-thumnail").src(url);
	}
	this.setPlayertURL = function(url){
		$("#musicFrame").src(url);
	}
	this.setSourceType = function(type){
		this.sourceType = type;
	}
	this.playListener = function(){
		this.playState='PLAYING';
		$("#playIcon").removeClass("glyphicon-refresh").addClass("glyphicon-pause");
		console.log('playListener,'+this.playState);
	}
}



/*
var sourceType = 0;
var mixWidget;
var soundWidget;
var player;
var playing = false;
var go = function(){
	soundWidget = SC.Widget('musicFrame');
	soundWidget.bind(SC.Widget.Events.PLAY,playListener);
	console.log("soundcloud widget is ready");
	mixWidget = Mixcloud.PlayerWidget(document.getElementById('musicFrame'));
	mixWidget.ready.then(function() {
		console.log("mixcloud widget is ready");
		mixWidget.events.play.on(playListener);
	});
	//player = mixWidget;
	$("#play").click(function(){
		console.log("here!!"); 
		if(playing){
			pauseMusic();
		}
		else{
			playMusic();
		}
	});
}
var playMusic = function(){
	playing = true;
	$("#playIcon").removeClass("glyphicon-play").addClass("glyphicon-equalizer");
	if(sourceType===0){
		console.log("playMixcloud");
		mixWidget.play();
	}
	else if(sourceType===1){
		console.log("playSoundcloud");
		soundWidget.play();
	}
}
var pauseMusic = function(){
	playing = false;
	$("#playIcon").removeClass("glyphicon-pause").addClass("glyphicon-play");
	if(sourceType==0){
		console.log("pauseMixcloud");
		mixWidget.pause();
	}
	else if(sourceType){
		console.log("pauseSoundcloud");
		soundWidget.pause();
	}
}
var setTitle = function(title){
	$("#player-title").html(title);
}
var setSinger = function(singer){
	$("#player-singer").html(singer);
}
var setThumnailURL = function(url){
	$("#player-thumnail").src(url);
}
var sePlayertURL = function(url){
	console.log("setURL");
	$("#musicFrame").src(url);
}
var setSourceType = function(type){
	console.log("set sourceType to "+type+"(0:mixcloud, 1:soundcloud)");
	sourceType = type;
}
var playListener = function(){
	playing = true;
	$("#playIcon").removeClass("glyphicon-equalizer").addClass("glyphicon-pause");
}
var puaseListener = function(){
	
}*/