console.log("SANITY CHECK WERQING");

var beerType = "English Pale Ale";

$.ajax({
	type: "GET",
	url: '/members/beer'
	dataType: 'json',
	data: {
		beer: beerType
	},
	success: function (res) {
		console.log("Found members who like this beer!", res);
	}
});

var state = "Minnesota"

$.ajax({
	type: 'GET',
	url: '/members/state',
	dataType: 'json',
	data: {
		memberState: state 
	},
	success: function(res) {
		console.log("Found members from this state!", res);
	}
});