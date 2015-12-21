import {Router} from "express";

const router = Router();

router.post('/table/:name',(req,res)=>{
  let tableName = req.params.name,
      content = req.body;

  global.db.models[tableName] = req.db.define(tableName,content);

  req.db.sync((err) => {
    if(err) res.json({success:false, err : err});
    else res.json({success:true});
  });
});

router.route('/:tableName')
  .get((req,res) => {
    let tableName = req.params.tableName;

    global.db.models[tableName].find({},(err,data) => {
      if(err) res.json({success : false, err:err});
      else res.json({success : true, data : data});
    })
  })
  .post((req,res) => {
    let tableName = req.params.tableName;

    global.db.models[tableName].create(req.body,(err) => {
      if(err) res.json({success:false, err : err});
      else res.json({success : true});
    });
  });

export default router;
