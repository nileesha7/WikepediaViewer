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
		       		console.log(text);
		       		var markup = '<h3>'+title+'</h3><p>'+text+'</p>';
		       		$('#search-results').append(markup);
		       }
		       /*
		        var markup = data.parse.text["*"];
		        //console.log(markup);
           		var blurb = $('<div></div>').html(markup);
            	$('#article').html($(blurb).find('p'));
				*/
		    },
		    error: function(errorMessage){

		    }
		});
		
		/*
		var playListURL = 'http://en.wikipedia.org/w/api.php?format=json&action=query&titles=India&prop=revisions&rvprop=content&callback=?';
		$.getJSON(playListURL ,function(data) {
			var hash = data
	        var page_value = ""
	        $.each(data["query"]["pages"],function(k,v){
	            alert(k)
	            $.each(v,function(key,val){
	              alert(key)
	            });
        	});
		});
		*/
	});
});