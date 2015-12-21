export function defineModels(){
  let promises = [];

  Object.keys(global.db.models).forEach((modelName) => {
    if(!(/^_/.test(modelName))){
      let modelPromise = new Promise((resolve, reject) => {
        global.db.models[modelName].sync(()=>{
          resolve();
        });
      });
      promises.push(modelPromise);
    }
  });

  return Promise.all(promises);
}
