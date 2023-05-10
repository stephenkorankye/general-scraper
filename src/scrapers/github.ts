import axios from "axios" ; 
import cheerio from "cheerio" ; 

// @desc    Scraping for Github repos of a user 
export const scrapeGithub = ( details : Object ,  username : String ) => {
    try {
        
        console.log ( details , username ) ; 



    }
    catch ( err ) {
        console.log ( "Error Scraping Github Repos" , err )
    }
}