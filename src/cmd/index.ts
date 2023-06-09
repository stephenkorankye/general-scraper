import readline from 'readline';
import axios from 'axios';
import cheerio from 'cheerio';
import * as csv from "fast-csv" ; 
import * as  fs from "fs" ; 
import { websites } from '../config/websites';
import { scrapeGithubRepos, scrapeGithubUser } from '../scrapers/github';
import { scrapeWikipedia } from '../scrapers/wikipedia';


// @desc    Accept inputs from the user --cmd 
export const initializeScraper = async () => {
    try {

        let data : [] ; 

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal : true 
          });
          
          console.log('**************  Welcome to the Scrapper!  **************');

          const promptMessage = `Select website to scrape (Enter a Number)\n` + 
                `${websites.map((website, index) => `${index + 1}. ${website.name}`).join('   ')}`
          

          rl.question( promptMessage + '\n' , 
            async (answer : any ) => {
                // Exit if input is not a number 
                if ( !parseInt( answer )  ) {
                    console.log ( "This is not a number : " , answer ) ; 
                    rl.close() ; 
                    process.exit() ; 
                } 
                answer = parseInt( answer ) ;  
                
                // Exit if input is not in range for list of websites
                if ( answer < 1 || answer > websites.length ) {
                    console.log ("Invalid Option" ) ; 
                    process.exit() ; 
                }


                // Wikipedia ; 
                if ( answer === 1 ) {
                    rl.question("Enter Title to fetch (MUST BE VALID): " , async ( title ) => {
                        
                        scrapeWikipedia( websites[answer - 1] , title ) ; 
                        
                    })
                }


                // Github
                if ( answer === 2 ) {
                    rl.question("Enter Github Username: " , async ( username ) => {

                       data = await scrapeGithubRepos(websites[answer - 1] , username) ; 


                       const csvStream = csv.format({ headers : true }) ; 

                        csvStream.pipe(fs.createWriteStream(`tests/res/github_repos/user_repos_${username}.csv` , {
                            encoding : "utf8"
                        })).on("finish" , () => {
                            console.log ( "File Succesfully Created" ) ; 
                        })

                        data.forEach ( e => {
                            csvStream.write(e) ;
                        }) 

                        csvStream.end() ; 


                    })
                }
                else if ( answer === 3 ) {
                    rl.question("Enter Github Username : " , async ( username ) => {
                        data = await scrapeGithubUser( websites[answer - 1] , username ) ; 
                        

                        const csvStream = csv.format({ headers : true }) ; 

                        csvStream.pipe(fs.createWriteStream(`tests/res/github_user/user_profile_${username}.csv` , {
                            encoding : "utf8"
                        })).on("finish" , () => {
                            console.log ( "File Succesfully Created" ) ; 
                        })

                        csvStream.write(data) ; 

                        csvStream.end() ; 


                    })
                }



            }
          );

    }
    catch ( err : any ) {
        console.log ( "There is an error : " , err ) ; 
        
    }
}