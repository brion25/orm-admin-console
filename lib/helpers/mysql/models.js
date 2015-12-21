export default class{
  constructor(db){
    this.db = db;
    this.tables = undefined;
  }

  transformModel(name){
    let self = this;

    return new Promise((resolve,reject) => {
      self.db.driver.execQuery(`DESCRIBE ${name};`,(err,rawData) => {
        if(err) throw new Error(err);
        let model = {
          name : name,
          schema : {}
        };

        rawData.forEach((data) => {
          if(data.Field === 'id') return;
          switch(data.Type){
            case 'varchar(255)':
              model.schema[data.Field] = 'text';
              break;
            case 'float':
              model.schema[data.Field] = 'number';
              break;
          }
        });

        resolve(model);
      });
    })
  }

  get(){
    let self = this;
    return new Promise((resolve,reject) => {
      self.db.driver.execQuery("SHOW TABLES;",(err,rawModels) => {
        if(err) reject(err);

        let models = [];

        rawModels.forEach((table) => {
          models.push(self.transformModel(table.Tables_in_test));
        });

        Promise.all(models).then((modelsFormatted) => {
          resolve(modelsFormatted);
        });
      })
    });
  }
}
