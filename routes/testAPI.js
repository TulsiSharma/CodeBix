var express = require("express");
var router = express.Router();
var axios = require("axios");
router.post("/",function(req, res, next) {
    var data="";
    axios.post("https://api.jdoodle.com/v1/execute",{
        clientId:req.body.clientId,
        clientSecret:req.body.clientSecret,
        script:req.body.script,
        stdin:req.body.stdin,
        language:req.body.language,
        versionIndex:req.body.versionIndex
    })
    .then(function (response) {
        console.log(response.data);
        data=response.data;
        res.send(data);

      })
      .catch(function (error) {
        console.log(error);
      });
    
    
});

module.exports = router;