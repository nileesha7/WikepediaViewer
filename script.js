$(document).ready(function(){
	$("#search").click("Submit", function(e) {
		e.preventDefault();

		//Clear previous results when button is clicked
		$('#search-results').empty();

		var searchVal = $("#articleName").val();
		//deal with the white spaces inbetween search terms
		if (searchVal.split(" ").length > 1){
			searchValArr = searchVal.split(' ');
			searchVal = '';
			for (var i in searchValArr){
				console.log(searchValArr[i]);
				searchVal += searchValArr[i] +'%20';
			}
		} 

		var url = 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch='+searchVal+'&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&callback=?';

		$.ajax( {
		    url: url,
		    dataType: 'json',
		    type: 'POST',
	
		    success: function(data) {
		       console.log(data.query.pages);
		       for (var idx in data.query.pages){
		       		var text = data.query.pages[idx].extract;
		       		var title = data.query.pages[idx].title;
		       		var wikiUrl = "https://en.wikipedia.org/wiki/"+title.split(" ").join("_");
		       		wikiUrl = '<a href ="' +wikiUrl+'" target="_blank">';
		       		console.log(wikiUrl);
		       		var markup = '<div class = "article-space">'+ wikiUrl+'<h3><b>'+title+'</b></h3><h5>'+text+'</h5></div>';
		       		$('#search-results').append(markup);
		       }
		    },
		    error: function(errorMessage){
		    		var markup = '<h3>ERROR!!! RESULTS NOT FOUND</h3>';
		    		$('#search-results').append(markup);
		    }
		});
	
	});
});