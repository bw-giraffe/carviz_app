$(document).ready(function(){
	console.log("SANITY CHECK WORKING");


var beerType = "English Pale Ale";

$('#beer_select').on('change', function(e) {
	var beer = $(this).val();
	$('#chart').html("");
	$('#current').text(beer + " ranking by state");
  	console.log("selected ", beer);
  	beerReq(beer);
});

$('#state_select').on('change', function(e) {
	var state = $(this).val();
	$('#chart').html("");
	$('#current').text(state + " beer favorites");
	stateReq(state);
});


function beerReq(memBeer) {
	console.log("membeer", memBeer);
	$.ajax({
		type: "GET",
		url: '/members/beer/',
		dataType: 'json',
		data: {
			memberBeer: memBeer
		},
		success: function (res) {
			console.log("Found members who like this beer!", res);
			console.log(res.matchingMembers);
			var synthesizedData = {};
			res.matchingMembers.forEach(function(elem) {
				if(synthesizedData[elem.state] != undefined) {
					synthesizedData[elem.state]+=1;
				} else {
					synthesizedData[elem.state] = 1;
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
			drawPie(array);
		},
		error: function(err) {
			console.log("There was an error", err)
		}
	});
}

function stateReq(memState) {

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
			drawPie(array);


		},
		error: function(err) {
			console.log("There was an error", err)
		}
	});
}

function drawPie(data) {
	var w = 1000;
	var h = 1000;
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

	    var getAngle = function (d) {
    	return (180 / Math.PI * (d.startAngle + d.endAngle) / 2 - 90);
	};
	// add the text
	arcs.append("svg:text").attr("transform", function(d){
				d.innerRadius = 0;
				d.outerRadius = r;
	    return "translate(" + arc.centroid(d) + ")" +
                    "rotate(" + getAngle(d) + ")"; }) 
    .attr("dy", 5) 
    .style("text-anchor", "start")
    .text(function(d) { return d.data.label; });




}

});
