import {defineModels} from "./../../../helpers/index.js";

export default deleteModel;

function deleteModel(req,res){
  let modelName = req.params.name;

  if(modelName){
    req.db.drop(()=>{
      delete global.db.models[modelName];
      defineModels().then(() => {
        res.json({ success:true});
      });
    });
  }else{
    req.db.drop()(()=> {
      req.db.sync((err) => {
        if(err) res.json({success:false, err : err});
        else res.json({success:true});
      });
    });
  }
}
