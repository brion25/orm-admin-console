export default deleteItem;

function deleteItem(req,res){
  let modelName = req.params.modelName,
      elementId = req.params.id;

  if(elementId){
    global.db.models[modelName].find({id : elementId}).remove((err) => {
      if(err) res.json({success:false, err : err});

      res.json({ success : true});
    });
  }else{
    res.json({success : false, err : "No Element ID found"});
  }
}
