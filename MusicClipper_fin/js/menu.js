var serach = $(".search-container"),
	recommend = $(".recommend-container"),
	mylist = $(".mylist-container"),
	login = $(".login-container"),
	join = $(".join-container"),
	page = $(".jsp-page");

$(".menu-mylist, .menu-recommend, .menu-login, .menu-join").click( function() {
	$("#searchForm").val("");
	var select = $(this).attr("value")+"-container";
	page.css("display","none");
	$("." + select).css("display","block");
	console.log(select);
})

$(".menu-logout").click( function() {
	console.log('logout');
	localStorage.setItem("userID",null);
	localStorage.setItem("userEmail",null);
	$('.menu-mylist').hide();
	$('.menu-logout').hide();
	$('.menu-login').show();
	$('.menu-userinfo').html("").hide();
	$(".add-mylist-btn").css("display","none");
	$(".mylist-container").css("display","none");
	$(".recommend-container").css("display","block");
})
