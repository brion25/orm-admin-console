import mysql from "./mysql/index.js";

export default class{
  constructor(config,db){
    this.db = db;
    this.connector = null;
    switch(config.type){
      case "mysql":
        this.connector = new mysql(db);
    }
  }

  loadModels(){
    let self = this;
    this.connector.getModels().then((models)=>{
      models.forEach((model) => {
        global.db.models[model.name] = self.db.define(model.name,model.schema);
      });
      console.log("Models succesfully Loaded!");
    });
  }
}
