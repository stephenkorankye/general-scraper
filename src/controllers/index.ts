import { Request , Response } from "express";


export const indexRoute = ( req : Request , res : Response ) => {
    try {
        res.status ( 200 ).json({ message : "Instructions on how to use here"})
    }
    catch ( err ) {
        console.log ( "There was an error : " , err ) ; 
        res.status ( 500 ).json({ message : err })
    }
}