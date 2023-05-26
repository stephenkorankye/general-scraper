import { Request , Response } from "express";
import { scrapeGithubRepos } from "../../scrapers/github";
import { websites } from '../../config/websites';


export const githubRepos = async ( req : Request , res : Response ) : Promise<Response> => {
    try {

        let { username } = req.params ; 
        username = username.trim() ; 

        if ( !username ) {
            console.log ( "Invalid username" ) ; 
            return res.status ( 404 ).json({ message : "Invalid Username" }) ; 
        }

        let data = await scrapeGithubRepos(websites[1] , username ) ; 

        return res.status ( 200 ).json({ data })





    }
    catch ( err ) {
        console.log ( "Error Fetching Data : " , err ) ;  
        return res.status ( 500 ).json({ err : JSON.stringify(err) }) ; 
    }
}
