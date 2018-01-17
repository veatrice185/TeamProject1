<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>MusicClipper</title>
	<link href="./css/bootstrap.min.css" rel="stylesheet"/>
	<link href="./css/player.css" rel="stylesheet"/>
	<script src="./js/jquery-1.11.3.min.js"></script>
	<script src="./js/bootstrap.min.js"></script>
	<script src="./js/player.js"></script>
	<script src="//www.mixcloud.com/media/js/widgetApi.js" type="text/javascript"></script>
	<script src="./js//player/soundcloud.api.js"></script>
	<!--script src="./js/player/playerWrapper.js"></script-->
	
	<link href="./less/container.less" rel="stylesheet/less"/>
	<link href="./less/header.less" rel="stylesheet/less"/>
	<link href="./less/footer.less" rel="stylesheet/less"/>
	<link href="./less/header.less" rel="stylesheet/less"/>
	<link href="./less/item.less" rel="stylesheet/less"/>
	<link href="./less/search.less" rel="stylesheet/less"/>
	<link href="./less/sign.less" rel="stylesheet/less"/>
	<script src="./js/less.min.js"></script><!-- 무조건 less link 태그 아래에 있어야 함. -->
</head>
<body style="padding-top:50px;padding-bottom:70px">
  	<jsp:include page="nav.jsp" flush="false" />
  	<div class="main-container container">
  		<h3><p>Welcome to MusicClipper</p><small>Find, play, clip musics from various streaming services</small></h3>
  		<div class="user-wrapper"></div>
  	</div>
  	<div class="page-wrapper">
	  	<jsp:include page="search.jsp" flush="false" />
	  	<jsp:include page="recommend.jsp" flush="false" />
	  	<jsp:include page="mylist.jsp" flush="false" />
	  	<jsp:include page="login.jsp" flush="false" />
	  	<jsp:include page="join.jsp" flush="false" />
		<jsp:include page="player.jsp" flush="false" />
	</div>
	<script>
		var MCPlayer = new MC();
		$("#play").click(function(){
			if(MCPlayer.playState=='PLAYING'){
				MCPlayer.pauseMusic();
				MCPlayer.playState='PAUSE';
			}
			else{
				MCPlayer.playMusic();
				MCPlayer.playState='PLAYING'
			}
		});
	</script>
	<script src="./js/menu.js"></script>
	<script src="./js/nav.js"></script>
	<script src="./js/search.js"></script>
	<script src="./js/musicPlay.js"></script>
	<script src="./js/sign.js"></script>
	<script src="./js/mylist.js"></script>
</body>
</html>