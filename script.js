$(document).ready(function(){
	$("#search").click("Submit", function(e) {
		e.preventDefault();
		var searchVal = $("#articleName").val();
		console.log(searchVal);
	});
});