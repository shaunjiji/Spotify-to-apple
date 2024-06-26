let express = require("express");
let request = require("request");
let queryString = require("querystring");
let cors = require("cors");
let app = express();
require("dotenv").config();

let redirect_uri_login = "http://localhost:8888/callback";
let client_id = process.env.CLIENTID;
let client_secret = process.env.CLIENTSECRET;

app.get("/login", function (req, res) {
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: "user-read-private user-read-email user-library-read",
        redirect_uri: redirect_uri_login,
      }),
  );
});

app.get("/callback", function (req, res) {
  let code = req.query.code || null;
  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: redirect_uri_login,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    json: true,
  };
  request.post(authOptions, function (error, response, body) {
    var access_token = body.access_token;
    let uri = process.env.FRONTEND_URI || "http://localhost:3000/playlist";

    res.redirect(uri + "?access_token=" + access_token);
  });
});
