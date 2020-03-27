const router = require("express").Router();
const spotifyController = require("../../controllers/spotifyController");

// Matches with "/api/spotify/auth"
router.route("/auth")
.get(spotifyController.auth);


// TO-DO: logout route (delete cookie and session - req.session.destroy)
module.exports = router;
