console.log("SANITY CHECK WERQING");

var beerType = "English Pale Ale";

$.ajax({
	type: "GET",
	url: '/members/beer/',
	dataType: 'json',
	data: {
		memberBeer: beerType
	},
	success: function (res) {
		console.log("Found members who like this beer!", res);
	},
	error: function(err) {
		console.log("There was an error", err)
	}
});

var memState = "Minnesota";

$.ajax({
	type: 'GET',
	url: '/members/state/',
	dataType: 'json',
	data: {
		memberState: memState 
	},
	success: function(res) {
		console.log("Found members from this state!", res);
	},
	error: function(err) {
		console.log("There was an error", err)
	}
});