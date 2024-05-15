let express = require("express");
let request = require("request");
let queryString = require("querystring");
let cors = require("cors");
let app = express();
require("dotenv").config();

let redirect_uri_login = "http://localhost:8888/callback";
let client_id = process.env.CLIENTID;
let client_secret = process.env.CLIENTSECRET;
