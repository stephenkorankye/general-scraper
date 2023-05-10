import axios from "axios" ; 
import cheerio from "cheerio" ; 

// @desc    Scraping for Github repos of a user 
export const scrapeGithub = async ( website : any ,  username : string ) => {
    try {
        
        console.info( "Fetching...")
        

        const { data : repos } = await axios.get(`${website.url}/${username}/repos`) ;

        if ( !repos || repos.length == 0 ) {
            console.log ( "No Repos Found " ) ; 
            return ; 
        }


        const repoInfo = await Promise.all(
            repos.map ( async ( repo : any  ) => {

                const { data : languages } = await axios.get ( repo.languages_url ) ; 
                const { data : license } = await axios.get ( repo.license?.url || "" ) ; 
                
                
                return {
                    name : repo.name , 
                    languages : Object.keys ( languages ) , 
                    topLanguage : repo.language , 
                    license : license?.name || "N/A" , 
                    forks : repo.forks 
                }



            })
        ); 

        console.log ( "Repos : " , repoInfo ) ; 


    }
    catch ( err ) {
        console.log ( "Error Scraping Github Repos" , err )
    }
}