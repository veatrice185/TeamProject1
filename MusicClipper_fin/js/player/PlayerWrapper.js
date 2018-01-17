/*
 * sourType
 * 0: mix cloud
 * 1: sound cloud*/
function PlayerWrapper(){
	this.self = this;
	this.sourceType = "0";
	this.player;
	this.mixWidget = Mixcloud.PlayerWidget(document.getElementById('musicFrame'));
	mixWidget.ready.then(function() {
		console.log("mixcloud widget is ready");
	});
	this.playMusic(sType,url){
		$("#playIcon").class("glyphicon glyphicon-pause").
		$("#musicFrame").src("#");
		if(sType=="0"){
			
			mixWidget.play();
		}
		else if(sType=="1"){
			soundWidget.play();
		}
	}

	this.pauseMusic(){
		if(sourceType=="0")
			mixWidget.pause();
		else if(sourceType=="1")
			soundWidget.puase();
	}
}
