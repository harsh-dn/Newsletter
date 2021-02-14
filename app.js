const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };
  var jsonData = JSON.stringify(data);
  var option = {
    url: " https://us1.api.mailchimp.com/3.0/lists/e452379b42",
    method: "POST",
    headers: {
      "Authorization": "Harsh f206ab7e8de66f2a660bc218dc8b15a0-us1"
    },
    body: jsonData
  };
  request(option, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });

});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(3000 || process.env.PORT , function() {
  console.log("server is running at port 3000");
});

//f206ab7e8de66f2a660bc218dc8b15a0-us1

//e452379b42
