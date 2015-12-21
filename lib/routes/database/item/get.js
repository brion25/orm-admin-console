export default getItem;

function getItem(req,res){
  let modelName = req.params.modelName,
      elementId = req.params.id,
      modelSearch = (elementId) ? {id : elementId} : {};

  global.db.models[modelName].find(modelSearch,(err,data) => {
    if(err) res.json({success : false, err:err});
    else res.json({success : true, data : data});
  });
}
