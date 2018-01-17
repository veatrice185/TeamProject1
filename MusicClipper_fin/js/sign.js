$(".login-container .login-btn").click( function() {
	var email = $(".login-container .login-box .email").val();
	var password = $(".login-container .login-box .password").val();
	var sendData = {"email":email, "password":password};
	if(!IsEmail(email)){
		aleft("Wrong Email Validate");
	}else {
		$.ajax({
			url: "login",
			data: sendData,
			type:"get",
			dataType:"JSON",
			success: function(data){
				var len = Object.keys(data).length;
				localStorage.setItem("userID", data[len-1].userId);
				localStorage.setItem("userEmail", data[len-1].email);
				$(".login-container .login-box .email").val("");
				$(".login-container .login-box .password").val("");
				
				/*
				 * 
				 * make My list item here!! they are contained in data[0]~data[data.length-2]*/
				$(".mylist-container .item-wrapper").html("");
				console.log(data);
				for(var i=0;i<len-1;i++){
					var now = data[i];
					var str = itemAppendDiv(now.image, now.title, now.singer, now.url, now.sourceType);
					$(".mylist-container .item-wrapper").append(str);	
				}
				playBtn();
				page = $(".jsp-page");
				page.css("display","none");
				$(".recommend-container").css("display","block");
				$('.menu-mylist').show();
				$('.menu-logout').show();
				$('.menu-userinfo').html("<a href='#'>Welcome! "+localStorage.getItem("userEmail")+" </a>").show();
				$('.menu-login').hide();
				$(".add-mylist-btn").css("display","block");
			}
		});
	}
});

$(".join-container .join-btn").click( function() {
	var email = $(".join-container .login-box .email").val();
	var password1 = $(".join-container .login-box .password1").val();
	var password2 = $(".join-container .login-box .password2").val();
	var sendData = {"email":email, "password":password1};
	
	if(!IsEmail(email)){
		aleft("Wrong Email Validate");
	}else if(password1 != password2){
		alert("Wrong Password");
	}
	else {
		$.ajax({
			url: "join",
			data: sendData,
			success: function(){
				page = $(".jsp-page");
				page.css("display","none");
				$(".login-container").css("display","block");
			}
		});
	}
});


function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}