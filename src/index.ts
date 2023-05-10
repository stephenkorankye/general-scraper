import express from "express" ; 
import bodyParser from "body-parser" ; 
import path from "path" ; 

import { includes } from "./includes";
import { initializeScraper } from "./cmd";

require("dotenv").config() ; 

const app = express() ; 

const PORT = process.env.PORT || 5000 ; 


app.use(express.static(path.join(__dirname + "/public"))) 

app.use(bodyParser.urlencoded({ extended : true })) ; 
app.use(bodyParser.json()) ; 



includes(app) ; 


// @desc    Check if user wants to use the cmd option or not 

const args = process.argv.slice(2) ; 

if ( args[0] === "--cmd" || args[0] === "cmd" ) {
    console.log ( "--------------------------   USING COMMAND LINE   --------------------------")
    initializeScraper() ; 
}
else {
    console.log ( "--------------------------   Using ROUTES AND ENDPOINTS  --------------------------" ) ; 
}



app.listen(PORT)










