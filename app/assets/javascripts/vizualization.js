console.log("SANITY CHECK WERQING");

var beerType = "English Pale Ale";

// $.ajax({
// 	type: "GET",
// 	url: '/members/beer/',
// 	dataType: 'json',
// 	data: {
// 		memberBeer: beerType
// 	},
// 	success: function (res) {
// 		console.log("Found members who like this beer!", res);
// 		draw(res);
// 	},
// 	error: function(err) {
// 		console.log("There was an error", err)
// 	}
// });
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
		console.log("matching membersz", res.matchingMembers);
		var synthesizedData = {};
		res.matchingMembers.forEach(function(elem) {
			if(synthesizedData[elem.beer] != undefined) {
				synthesizedData[elem.beer]+=1;
			} else {
				synthesizedData[elem.beer] = 1;
			}
		});
		console.log(synthesizedData);
		array = []
		for (var key in synthesizedData) {
			var template = {};
			template.label = key;
			template.value = synthesizedData[key];
			array.push(template);
		}
		console.log(array);
		draw(array);


	},
	error: function(err) {
		console.log("There was an error", err)
	}
});

function draw(data) {
	var w = 400;
	var h = 400;
	var r = h/2;
	var color = d3.scale.category20c();

	var data = data;
	// var data = [{label: "France", value: 20}, {label: "Ecuador", value: 30}, {label: "USA", value: 4}, {label: "Brazil", value: 6}];


	var vis = d3.select('#chart').append("svg:svg").data([data]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
	var pie = d3.layout.pie().value(function(d){return d.value;});

	// declare an arc generator function
	var arc = d3.svg.arc().outerRadius(r);

	// select paths, use arc generator to draw
	var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
	arcs.append("svg:path")
	    .attr("fill", function(d, i){
	        return color(i);
	    })
	    .attr("d", function (d) {
	        // log the result of the arc generator to show how cool it is :)
	        console.log(arc(d));
	        return arc(d);
	    });

	// add the text
	arcs.append("svg:text").attr("transform", function(d){
				d.innerRadius = 0;
				d.outerRadius = r;
	    return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
	    return data[i].label;}
			);
}



