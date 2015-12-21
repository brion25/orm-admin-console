import {defineModels} from "./../../../helpers/index.js";
export default updateModel;

function updateModel(req,res){
  let modelName = req.params.name,
      collectionDefinition = req.body,
      elements = undefined;

  if(modelName){
    global.db.models[modelName].find({},(err,data) => {
      if(err) res.json({success : false, err:err});
      elements = data;
      req.db.drop(()=>{
        delete global.db.models[modelName];
        defineModels().then(() => {
          global.db.models[modelName] = req.db.define(modelName,collectionDefinition);
          req.db.sync((err) => {
            if(err) res.json({success:false, err : err});
            console.log(reinsertElements);
            reinsertElements(modelName,elements).then(()=>{
              res.json({success:true});
            });
          });
        });
      });

    });
  }else{
    res.json({success:false, err : "Model Name is needed!"});
  }
}

function reinsertElements(model, elements){
  let promises = [];

  elements.forEach((element)=>{
    let promise = new Promise((resolve,reject)=>{
      global.db.models[model].create(element,(err) => {
        if(err) res.json({success:false, err : err});
        resolve();
      });
    });

    promises.push(promise);
  });

  return Promise.all(promises);
}
