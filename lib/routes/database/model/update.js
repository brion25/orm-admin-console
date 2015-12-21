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
        redefineModel(modelName, elements,collectionDefinition,req.db).then(() => {
          reinsertElements(modelName,elements).then(()=>{
            res.json({success:true});
          });
        },(err) => {
          res.json({success:false, err:err});
        });
      });

    });
  }else{
    res.json({success:false, err : "Model Name is needed!"});
  }
}

function redefineModel(model,elements,collectionDefinition,db){
  let newCollectionDefinition = {};

  Object.keys(collectionDefinition).forEach((key)=>{
    let attr = collectionDefinition[key];
    if((typeof attr) === "object"){
      newCollectionDefinition[attr.to.name] = attr.to.type;
      elements.forEach((element) => {
        element[attr.to.name] = element[attr.from.name];
        element[attr.from.name] = undefined;
      });
    }else{
      newCollectionDefinition[key] = collectionDefinition[key];
    }
  });

  global.db.models[model] = db.define(model,newCollectionDefinition);

  return new Promise((resolve,reject) => {
    db.sync((err) => {
      if(err) reject(err);
      else resolve();
    });
  });
}

function reinsertElements(model, elements){
  let promises = [];

  elements.forEach((element)=>{
    let promise = new Promise((resolve,reject)=>{
      let newElement = {};
      Object.keys(element).forEach((attr) => {
        if(element[attr]){
          newElement[attr] = element[attr];
        }
      });
      global.db.models[model].create(newElement,(err) => {
        if(err) console.log(err);
        resolve();
      });
    });

    promises.push(promise);
  });

  return Promise.all(promises);
}
