import axios from "axios" ; 
import cheerio from "cheerio" ; 

// @desc    Scraping for Github repos of a user 
export const scrapeGithubRepos = async ( website : any ,  username : string ) : Promise<any> => {
    try {
        
        console.info( "Fetching...")
        

        const { data : repos } = await axios.get(`${website.url}/${username}/repos`) ;

        if ( !repos || repos.length == 0 ) {
            console.log ( "No Repos Found " ) ; 
            return [] ; 
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

        return repoInfo ; 


    }
    catch ( err ) {
        console.log ( "Error Scraping Github Repos" , err )
        return [] ; 
    }
}


// @desc    Fetching Github profile of a user ; 
export const scrapeGithubUser = async ( website : any ,  username : string ) : Promise<any> => {
    try {
        
        console.info( "Fetching User...")
        

        const { data } = await axios.get(`${website.url}/${username}`) ;

        if ( !data ) {
            console.log ( "No Repos Found " ) ; 
            return {} ; 
        }

        return {
            name :  data.name , 
            company : data.company , 
            email : data.email , 
            website : data.blog , 
            location : data.location , 
            bio : data.bio , 
            public_repos : data.public_repos , 
            public_gists : data.public_gists , 
            followers : data.followers , 
            following : data.following , 
            joined : data.created_at 
        }


        


    }
    catch ( err ) {
        console.log ( "Error Scraping Github Repos" , err )
        return {} ; 
    }
}




