import {Router} from "express";

const router = Router();

router.post('/table',(req,res)=>{
  console.log(req.db);
  res.json({success:true});
})

export default router;
