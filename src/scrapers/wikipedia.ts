import axios from "axios" ; 
import fs from "fs" ; 
import he from "he" ; 

import { Document, Paragraph, Packer, TextRun  } from "docx";


// @desc   fetching contents of a page from wikipedia
export const scrapeWikipedia = async ( website : any , title : string ) : Promise<any> => {
    try {

        const url = `${website.url}?action=parse&format=json&page=${encodeURIComponent(title)}` ; 

        const response = await axios.get(url) ; 
        const content = response.data.parse.text["*"] ; 

        let cleanedContent = content.replace(/{{[\s\S]*?}}/g, '');
        
        cleanedContent = cleanedContent.replace(/<div class="hatnote"[^>]*>.*?<\/div>/g, ''); 
        cleanedContent = cleanedContent.replace(/<div class="hatnote[^"]*"[^>]*>.*?<\/div>/g, ''); 
        // Removing <i> tags
        cleanedContent = cleanedContent.replace(/<\/?i[^>]*>/g, ''); 
        // Removing html tags 
        cleanedContent = cleanedContent.replace(/<\/?[a-z][^>]*>/gi, ''); 
    
    
        const finalContent = he.decode(cleanedContent) ; 
        

        // Splitting and grouping content 
        const paragraphs = finalContent.split("\n") ; 
        const contentTitle = paragraphs.shift() || "" ; 
        
        const references : string[] = [] , 
            similarTopics : string[] = [] , 
            imageLinks: string[] = [] ; 



        // Splitting and grouping references, similar topics and files added to the content
        paragraphs.forEach ( (paragraph : any ) => {
            if ( paragraph.startsWith("References") ) {
                const refs = paragraph.split("\n").slice(1).filter((ref : any ) => ref.trim().length > 0 ) ;
                references.push(...refs) ; 
            } 
            else if ( paragraph.startsWith("See also" ) ) {
                const topics = paragraph.split('\n').slice(1).filter((topic : any ) => topic.trim().length > 0) ; 
                similarTopics.push(...topics);
            }
            else if ( paragraph.startsWith("File:") ) {
                const imgLink = paragraph.split(' ')[0];
                imageLinks.push(imgLink); 
            }
        })

        


        // Create a new word document
        // @desc    Adds a category, and then makes a spaces, and then add the other 
        const doc = new Document({
            sections : [
                {

                    children: [
                        new Paragraph({
                            children : [new TextRun(title) ] 
                        }) ,
                        space() , 
                        new Paragraph({
                          children: [new TextRun(contentTitle)],
                        }),
                        space() , 
                        new Paragraph({
                          children: [new TextRun(finalContent)],
                        }),
                        space() , 
                        new Paragraph({
                          children: [new TextRun('References:')],
                        }),
                        space() , 
                        ...references.map((ref) => new Paragraph({ children: [new TextRun(ref)] })),
                        new Paragraph({
                          children: [new TextRun('Similar Topics:')],
                        }),
                        space() , 
                        ...similarTopics.map((topic) => new Paragraph({ children: [new TextRun(topic)] })),
                        new Paragraph({
                          children: [new TextRun('Image Links:')],
                        }),
                        space() , 
                        ...imageLinks.map((link) => new Paragraph({ children: [new TextRun(link)] })),
                      ],
                }
            ]
        }) ; 


        // Saving content 
        const buffer = await Packer.toBuffer(doc) ; 
        const folderPath = `./tests/res/wikipedia` ; 
        const fileName = `./tests/res/wikipedia/${title}-${Date.now()}.docx` ; 

       
        if ( !fs.existsSync(folderPath) ) {
            fs.mkdirSync(folderPath) ; 
        }

        fs.writeFileSync(fileName , buffer ) ; 

        console.log ( `Done! Saved to ${fileName}`) ; 


    }
    catch ( err ) {
        console.log ( `Could not fetch title : ${title}` , err ) ; 
    }
}


let space = () : Paragraph => {
    return new Paragraph({
        children : [ new TextRun('')]
    })
}

