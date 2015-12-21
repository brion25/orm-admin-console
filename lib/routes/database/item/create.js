export default createItem;

function createItem(req,res){
  let modelName = req.params.modelName;

  global.db.models[modelName].create(req.body,(err) => {
    if(err) res.json({success:false, err : err});
    else res.json({success : true});
  });
}
