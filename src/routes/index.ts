import express , { Request , Response} from "express" ; 
import { indexRoute } from "../controllers";
const router = express.Router() ; 


router.get ( "/" , indexRoute ) ; 

export default router ; 