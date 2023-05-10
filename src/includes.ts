import index from "./routes/index" ; 

export const includes = (app : any ) => {
    
    app.use ( "/" , [ index ] ) ; 
    
}