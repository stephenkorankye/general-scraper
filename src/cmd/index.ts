import readline from 'readline';
import axios from 'axios';
import cheerio from 'cheerio';
import { websites } from '../config/websites';
import { scrapeGithub } from '../scrapers/github';


// @desc    Accept inputs from the user --cmd 
export const initializeScraper = async () => {
    try {

        let data ; 

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


                // Github
                if ( answer === 2 ) {
                    rl.question("Enter Github Username" , async ( username ) => {
                        
                       data = await scrapeGithub(websites[answer - 1] , username) ; 

                    })


                } 



            }
          );

    }
    catch ( err : any ) {
        console.log ( "There is an error : " , err ) ; 
        
    }
}