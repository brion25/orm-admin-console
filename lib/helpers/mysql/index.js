import Models from "./models.js";

export default class{
  constructor(db){
    this.db = db;
    this.models = new Models(db);
  }

  getModels(){
    return this.models.get();
  }
}
