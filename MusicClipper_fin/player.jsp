<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<footer class="navbar navbar-fixed-bottom navbar-inverse">
	<div class="container-fluid">
		<ul class="nav navbar-nav">
			<li><a id="play" href="#">
				<span id="playIcon" class="glyphicon glyphicon-play"></span></a></li>
		</ul>
		<div class="info-wrapper">
			<img class="player-thumnail" id="player-thumnail" alt="" />
			<div class="info">
				<div class="player-title" id="player-title"></div>
				<div class="player-singer" id="player-singer"></div>
				<div class="player-url"></div>
				<div class="player-sourceType"></div>
				<div class="player-musicId"></div>
			</div>
		</div>
		<button class="add-mylist-btn" data-toggle="tooltip" data-placement="top" title="Add My List">
			<span class="glyphicon glyphicon-plus"></span>
		</button>
		<button class="mylist-btn" data-toggle="tooltip" data-placement="top" title="Show Play List">
			<span class="glyphicon glyphicon-align-justify" ></span>
		</button>
		<ul class="mylist" id="playList">
		</ul>
		<!-- ul class="right nav navbar-nav">
			<li><a href="#"><span class="glyphicon glyphicon-heart-empty"> MyList</span></a></li>
			<li><a href="#"><span class="glyphicon glyphicon-list"></span></a></li>
		</ul>
		<ul class="nav navbar-nav">
			<li><img class="player-thumnail" id="player-thumnail"/></li>
			<li><div class="player-title" id="player-title"></div>
				<div class="player-singer" id="player-singer"></div>
			</li>
		</ul-->
		<iframe id='musicFrame' src="https://www.mixcloud.com/widget/iframe/?embed_type=widget_standard&amp;embed_uuid=4112b7cf-5f34-4c99-88d9-37274947234a&amp;feed=https%3A%2F%2Fwww.mixcloud.com%2FLeFtOoO%2Fshow624-new-bilal-jets-seven-davis-jr-henrik-schwarz-kyodai-vince-staples-oddisee%2F&amp;hide_cover=1&amp;hide_tracklist=1&amp;replace=0" frameborder="0">
		</iframe>
		<!--iframe id="musicFrame" width="100%" height="465" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=http://api.soundcloud.com/users/1539950/favorites">
      </iframe-->
	</div>
</footer>