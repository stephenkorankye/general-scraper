import { Router } from "express";
import { githubRepos } from "../../controllers/api/github";

const router : Router = Router() ; 

// @route   /api/github 
router.get ("/repos/:username" , githubRepos) ; 

export default router ; 
