$("#searchForm").keypress(function(event){
	if(event.which == 13 ) {
		searchProcess($("#searchBtn"));
	}
});
$("#searchBtn").click(function(e){
	searchProcess(this);
});
var searchProcess = function(caller){
	console.log('button clicked');
	var select = $(caller).attr("value")+"-container";
	page.css("display","none");
	$("#loading").show();
	//$("." + select).css("display","block");
	console.log(select);
	console.log('button clicked');
	var select = $(caller).attr("value")+"-container";
	page.css("display","none");
	//$("." + select).css("display","block");
	console.log(select);
	
	var mixResultArr;
	var soundResultArr;
	playBtn();
	searchOnMixCloud($("#searchForm").val(),function(result){
		searchOnSoundCloud($("#searchForm").val(),function(result2){
			console.log(result2);
			//result is a final array of search result objects
			soundResultArr  = result2;
			$.each(soundResultArr, function(index,item){
				str = itemAppendDiv(item.imgurl, item.title,  item.artist, item.url, item.sourcetype, item.musicId);
				$(".sound-wrapper .item-wrapper").append(str);
			});
			
			$("#loading").hide();
			$("." + select).css("display","block");
			playBtn();
			$("#searchBtn").blur();
		});
		//console.log(result);
		//result is a final array of search result objects
		mixResultArr = result;
		
		//get search result for soundCloudArr
		$.each(mixResultArr, function(index,item){
			str = itemAppendDiv(item.imgurl, item.title,  item.artist, item.url, item.sourcetype, item.musicId);
			$(".mix-wrapper .item-wrapper").append(str);
		});
		//playBtn();
		//$("." + select).css("display","block");
		//$("#searchBtn").blur();
	});
}

var searchOnMixCloud = function(searchValue,callback){
	var resultMixArr = [];
	getMixSearchObject(searchValue,function(tempResult){
		tempResult.forEach(function(result,i){
			$.ajax({
				url:'http://www.mixcloud.com/oembed/?url='+result.url+'&format=json',
				dataType:'jsonp',
				success: function(data){
					var embedHtml = data.embed;
					var embedStr = embedHtml.split('"');
					result.url = embedStr[5];
					resultMixArr.push(result);
					if(i==tempResult.length-1) callback(resultMixArr);
				}
			});
		});
		
	});
}

var getMixSearchObject = function(searchValue,callback){
	var resultMixArr = [];
	$.getJSON( "http://api.mixcloud.com/search/?q="+searchValue+"&type=cloudcast", function( data ){
		var searchResult = data.data;
		searchResult.forEach(function(result){
			var resultObj = {
				url: result.url,
				imgurl: result.pictures.large,
				title: result.name,
				artist: result.user.name,
				sourcetype: 0
			};
			//console.log(resultObj);
			resultMixArr.push(resultObj);
		});
		callback(resultMixArr);
	});
}

var searchOnSoundCloud = function(searchValue,callback){
	var resultSoundArr =[];

	$.getJSON( "http://api.soundcloud.com/tracks.json?q="+searchValue+"&client_id=0bcc7c4bcd2b5b55b23ab538c02f70c0&offset=20&limit=20", function( data ){
		$.each(data, function(i,val){
			if(val.stream_url) {
				var resultObj = {
					url: 'https://w.soundcloud.com/player/?url='+val.uri,
					imgurl: val.artwork_url,
					title: val.title,
					artist: val.user.username,
					sourcetype: 1
				};
			}
			resultSoundArr.push(resultObj);
			if(i==data.length-1) callback(resultSoundArr);
		});
	});
}