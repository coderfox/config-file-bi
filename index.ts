"use strict";

import * as yaml from "js-yaml";
import * as fs from "fs-extra";

namespace Errors {
  export class KeyNotExistsError extends Error {
    constructor(key: string) {
      super(`config key "${key}" does not exist`);
      this.name = "KeyNotExistsError";
    }
  }
}
class Config {
  private filePath: string;
  public data = {};
  constructor(filePath: string) {
    this.filePath = filePath;
  }
  pull = async () => {
    try {
      await this.pullWhenExists();
    } catch (err) {
      if (err.code === "ENOENT") {
        await this.touch();
      } else {
        throw err;
      }
    }
  }
  pullWhenExists = async () => {
    this.data = yaml.safeLoad((await fs.readFile(this.filePath)).toString());
  }
  pullSync = () => {
    try {
      this.pullSyncWhenExists();
    } catch (err) {
      if (err.code === "ENOENT") {
        this.touchSync();
      } else {
        throw err;
      }
    }
  }
  pullSyncWhenExists = () => {
    this.data = yaml.safeLoad(fs.readFileSync(this.filePath).toString());
  }
  push = async () => {
    await fs.writeFile(this.filePath, yaml.safeDump(this.data));
  }
  pushSync = () => {
    fs.writeFileSync(this.filePath, yaml.safeDump(this.data));
  }
  touch = async () => {
    await this.push();
  }
  touchSync = () => {
    this.pushSync();
  }
  get = (name: string) => {
    if (this.data[name]) {
      return this.data[name];
    } else {
      throw new Errors.KeyNotExistsError(name);
    }
  }
  set = (name: string, data: any) => {
    this.data[name] = data;
  }
  setWhenExists = (name: string, data: any) => {
    if (name in this.data) {
      this.set(name, data);
    } else {
      throw new Errors.KeyNotExistsError(name);
    }
  }
};

namespace Config {
  export let KeyNotExistsError = Errors.KeyNotExistsError;
}

export = Config;