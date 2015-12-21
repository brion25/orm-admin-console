export default createModel;

function createModel(req,res){
  let modelName = req.params.name,
      content = req.body;

  global.db.models._info[modelName] = content;
  global.db.models[modelName] = req.db.define(modelName,content);

  req.db.sync((err) => {
    if(err) res.json({success:false, err : err});
    else res.json({success:true});
  });
}
