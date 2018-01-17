$(".mylist a").click( function(){
	var self = $(this);
	var title = self.children(".mylist-title").html();
	var singer = self.children(".mylist-singer").html();
	var url = self.children(".image").html();
	var image = self.children(".image").html();
	var sourceType = self.children(".sourceType").html();
	var musicId = self.children(".musicId").html();
	var str = itemAppend(image, title, singer, url, sourceType, musicIds);
	
	console.log(str);
});

$(".add-mylist-btn").click( function() {
	var title = $(".player-title").html();
	var singer = $(".player-singer").html();
	var image = $(".player-thumnail").attr("src");
	var url = $(".player-url").html();
	var sourceType = $(".player-sourceType").html();
	var musicId = $(".player-musicId").html();
	var userId = localStorage.getItem("userID");
	console.log("add in");
	console.log(sourceType);
	
	var sendData = {"title": title, "singer":singer, "image":image, "url":url, "sourceType":sourceType, "musicId":musicId, "userId": userId};
	$.ajax({
		url: "Mylist",
		data: sendData,
		success: function() {
			console.log("success add mylist");
			var str = "";
			str = itemAppendDiv(image, title, singer, url, sourceType);
			$(".mylist-container .item-wrapper").append(str);
			playBtn();
		}
	})
});