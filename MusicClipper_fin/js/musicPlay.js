var itemAppendLi = function(image, title, singer, url, sourceType) {
	var str = "";
	str+="<li>";
	str+="<a class='playlist-item' href='#!'>";
	str+="<div class='image'><img src='"+image+"'/></div>";
	str+="<div class='mylist-title'>"+title+"</div>";
	str+="<div class='mylist-singer'>"+singer+"</div>";
	str+="<div class='mylist-url'>"+url+"</div>";
	str+="<div class='mylist-sourceType'>"+sourceType+"</div>";
	str+="</a>"
	str+="</li>"
	return str;
}
var itemAppendDiv = function(image, title, singer, url, sourceType) {
	var str = "";
	str += "<div class='item'>";
	str += "<img class='item-image' src='" + image + "' alt='' />";
	str += "<div class='item-info'>";
	str += "<button type='button' class='play-button'>";
	str += "<span class='glyphicon glyphicon-play-circle'></span>";
	str += "</button>";
	str += "<div class='item-title'>" + title + "</div>";
	str += "<div class='item-singer'>" + singer + "</div>";
	str += "<div class='item-url'>" + url + "</div>";
	str += "<div class='item-sourceType'>" + sourceType + "</div>";
	str += "</div></div>";
	return str;
}

$(document).ready( function() { // recommend item load
	if(localStorage.getItem("userID")!=null&&localStorage.getItem("userID")!="null"&&localStorage.getItem("userID")!=""){
		console.log('logged in, user:'+localStorage.getItem("userID"));
		$('.menu-mylist').show();
		$('.menu-logout').show();
		$('.menu-userinfo').html("<a href='#'>Welcome! "+localStorage.getItem("userEmail")+" </a>").show();
		$('.menu-login').hide();
		$(".add-mylist-btn").css("display","block");
	}
	else{
		console.log('not logged in');
		$('.menu-mylist').hide();
		$('.menu-logout').hide();
		$('.menu-login').show();
		$('.menu-userinfo').html("").hide();
		$(".add-mylist-btn").css("display","none");
	}
	$.ajax({
		url: "Recommend",
		type: "get",
		dataType : 'JSON',
		success: function(data) {
			$.each(data, function(index,item){
				str = itemAppendDiv(item.image, item.title, item.singer, item.url, item.sourceType);
				$(".recommend-container .item-wrapper").append(str);
			});
			playBtn();
		}
	})
	
	//playBtn();
});
function playBtn(){
	$(".play-button").click( function(){
		console.log('clicked.');
		var p = $(this).parent();
		var image = p.parent().children(".item-image").attr("src");
		var title = p.children(".item-title").html();
		var singer = p.children(".item-singer").html();
		var url = p.children(".item-url").html();
		var sourceType = p.children(".item-sourceType").html();
		
		$("#player-thumnail").attr("src",image);
		$("#player-title").html(title);
		$("#player-singer").html(singer);
		$(".player-url").html(url);
		$(".player-sourceType").html(sourceType);
		$("#musicFrame").attr("src",url).load(function(){
			MCPlayer.playState = 'STOP';
			MCPlayer.sourceType = sourceType;
			MCPlayer.playMusic();
		});
		$('#playList').append(itemAppendLi(image, title, singer, url, sourceType));
		playFromList();
	});
}
function playFromList(){
	$(".playlist-item").click( function(){
		console.log('a clicked.');
		var a = $(this);
		var image = a.children(".image").children('img').attr("src");
		var title = a.children(".mylist-title").html();
		var singer = a.children(".mylist-singer").html();
		var url = a.children(".mylist-url").html();
		var sourceType = a.children(".mylist-sourceType").html();
		
		console.log(image+','+title+','+singer+','+url);
		$("#player-thumnail").attr("src",image);
		$("#player-title").html(title);
		$("#player-singer").html(singer);
		$(".player-url").html(url);
		$(".player-sourceType").html(sourceType);
		$("#musicFrame").attr("src",url).load(function(){
			MCPlayer.playState = 'STOP';
			MCPlayer.sourceType = sourceType;
			MCPlayer.playMusic();
		});
	});
}
