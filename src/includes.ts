import index from "./routes/index" ; 
import github from "./routes/api/github" ; 

export const includes = (app : any ) => {
    
    app.use ( "/" , [ index ] ) ; 
    app.use("/api/github" , github ) ; 
    
}