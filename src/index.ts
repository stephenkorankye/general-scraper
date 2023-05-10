import express from "express" ; 
import bodyParser from "body-parser" ; 
import path from "path" ; 
import { includes } from "./includes";

require("dotenv").config() ; 

const app = express() ; 

const PORT = process.env.PORT || 5000 ; 


app.use(express.static(path.join(__dirname + "/public"))) 

app.use(bodyParser.urlencoded({ extended : true })) ; 
app.use(bodyParser.json()) ; 



includes(app) ; 


app.listen(PORT , () => console.log (`Running on PORT ${PORT}`))





