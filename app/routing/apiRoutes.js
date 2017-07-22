//A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// LOAD DATA
// We are linking our routes to a series of "data" sources.
var friends = require("../data/friends.js");
var path = require("path");
var totalDifference = 0;
// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
//A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
  app.post("/api/friends", function(req, res) { 
   
		var greatMatch = {
			name: "",
			image: "",
			matchDifference: 1000
		};
		var userData 	= req.body;
		var userName 	= userData.name;
		var userImage 	= userData.image;
		var userScores 	= userData.scores;

		var totalDifference = 0;

		//loop through the friends data array of objects to get each friends scores
		for(var i = 0; i < friends.length; i++){
			console.log(friends[i].name);
			totalDifference = 0;

			//loop through that friends score and the users score and calculate the 
			// absolute difference between the two and push that to the total difference variable set above
			for(var j = 0; j < friends[i].scores[j]; j++){
				// We calculate the difference between the scores and sum them into the totalDifference
				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
				// If the sum of differences is less then the differences of the current "best match"
				if (totalDifference <= greatMatch.matchDifference){

					// Reset the bestMatch to be the new friend. 
					greatMatch.name = friends[i].name;
					greatMatch.image = friends[i].image;
					greatMatch.matchDifference = totalDifference;
				}
			}
		}

		friends.push(userData);
 
		res.json(greatMatch);
	

});
}

 