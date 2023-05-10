import readline from 'readline';
import axios from 'axios';
import cheerio from 'cheerio';
import { websites } from '../config/websites';


// @desc    Accept inputs from the user - cmd 
export const initializeScraper = async () => {
    try {

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal : true 
          });
          
          console.log('*******  Welcome to the Scrapper!  *******');

          const promptMessage = `Select website to scrape (Enter a Number)\n` + 
                `${websites.map((website, index) => `${index + 1}. ${website.name}`).join('\n')}`
          

          rl.question( promptMessage + '\n' , 
            async (answer) => {
                // Exit if user's input is not a number 
                if ( !parseInt( answer ) ) {
                    console.log ( "This is not a number : " , answer ) ; 
                    rl.close() ; 
                } 
                else {
                    // If user input is a number  

                    rl.close() ; 
                }
            }
          );

    }
    catch ( err : any ) {
        console.log ( "There is an error : " , err ) ; 
        
    }
}