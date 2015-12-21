import {resolve} from "path";
import {argv} from "yargs";

export default class {
  constructor(){
    if(!argv.path) throw new Error("Path is required!");
    this.path = resolve(argv.path);
    this.config = require(this.path);
    this.verifyConfig();
  }

  verifyConfig(config){
    if(!this.config.hasOwnProperty('type')) throw "Database Type is missing";
    if(!this.config.hasOwnProperty('username')) throw "Database Type is missing";
    if(!this.config.hasOwnProperty('password')) throw "Database Type is missing";
    if(!this.config.hasOwnProperty('host')) throw "Database Type is missing";
    if(!this.config.hasOwnProperty('database')) throw "Database Type is missing";

    this.url = `${this.config.type}://${this.config.username}:${this.config.password}@${this.config.host}/${this.config.database}`;
  }

  getUrl(){
    return this.url;
  }

  getConfig(){
    return this.config;
  }
}
