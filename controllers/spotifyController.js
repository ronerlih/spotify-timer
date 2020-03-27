import authSpotify from "../scripts/authSpotify"
// Defining methods for the workerController
module.exports = {

    auth: function (req, res, next){
      console.log("auth spotify");
      authSpotify()
      .then(data => {
        console.log(data);
        res.status(200).send(data.data)
      })
      .catch(e => {
        console.log((e));
        // res.send(e)
    });
  }
};
  