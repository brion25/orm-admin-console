export default updateItem;

function updateItem(req,res){
  let modelName = req.params.modelName,
      elementId = req.params.id,
      newContent = req.body;

  global.db.models[modelName].get(elementId, (err,element) => {
    if(err) res.json({success:false, err : err});
    Object.keys(newContent).forEach((key) => {
      element[key] = newContent[key];
    });
    element.save((err) => {
      if(err) res.json({success:false, err : err});
      res.json({success : true});
    });
  })
}
