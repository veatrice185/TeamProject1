function show(){
	//alert("success");
}
function hideAllDivs(){
	$("#join").hide();
	$("#join").hide();
}

$(".mylist-btn").click( function() {
	$(".mylist").toggleClass("active");
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
})