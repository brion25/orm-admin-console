export default getModel;

function getModel(req,res){
  let modelName = req.params.name;

  if(modelName){
    res.json({
      success:true,
      info : {
        _name : modelName,
        schema : global.db.models._info[modelName]
      }
    });
  }else{
    let models = {};

    Object.keys(global.db.models._info).forEach((name)=>{
      models[name] = global.db.models._info[name];
    })
    res.json({
      success:true,
      models : models
    });
  }
}
