import express from "express";
import orm from "orm"
import bodyparser from "body-parser";
import ReadConfig from "./read-config.js";
import {Database} from "./routes/index.js";
import Connectors from "./connectors/main.js";

const app = express();
const args = new ReadConfig();
const url = args.getUrl();
const config = args.getConfig();

global.db = {
  models : {
    _info : {}
  }
}

app.use(bodyparser.json());

app.use(orm.express(url,{
  define : (dbOrm, db) => {
    db = dbOrm;
    let connector = new Connectors(config,dbOrm);
    connector.loadModels();
  }
}));

app.use('/db',Database);


app.listen(3000,function(){
  console.log('running...')
});
