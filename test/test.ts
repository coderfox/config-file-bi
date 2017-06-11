"use strict";

import Config = require("../");
import * as chai from "chai";
const expect = chai.expect;
import * as fs from "fs-extra";
import * as yaml from "js-yaml";

const path = "./config.yaml";
describe("config", () => {
  let config = new Config(path);
  describe("errors", () => {
    describe("KeyNotExistsError", () => {
      const key = "foobar";
      let err = new Config.KeyNotExistsError(key);
      expect(err.message).eql(`config key "${key}" does not exist`);
      expect(err.name).eql("KeyNotExistsError");
    })
  });
  describe("get and set", () => {
    describe("#set", () => {
      it("set config", () => {
        const data = "lorem ipsum";
        config.set("foo", data);
        expect(config.get("foo")).eql(data);
      });
    });
    describe("#setWhenExists", () => {
      expect(() => config.setWhenExists("invalid", "foobar")).to.throw(Config.KeyNotExistsError);
    });
    describe("#get", () => {
      it("throws when key not exists", () => {
        expect(() => config.get("invalid")).to.throw(Config.KeyNotExistsError);
      });
      it("returns data", () => {
        const data = "lorem ipsum";
        config.set("foo", data);
        expect(config.get("foo")).eql(data);
      });
    });
  });
  describe("pull", () => {
    beforeEach(async () => {
      config = new Config(path);
      try {
        await fs.unlink(path);
      } catch (err) {
        if (err.code !== "ENOENT") {
          throw err;
        }
      }
    });
    describe("#pullWhenExists", () => {
      it("throws when file not exists", async () => {
        expect(() => config.pullWhenExists()).to.throw;
      });
      it("loads config from file", async () => {
        await fs.writeFile(path, yaml.safeDump(
          { foo: "bar" }
        ));
        await config.pullWhenExists();
        expect(config.get("foo")).to.eql("bar");
      });
    });
    describe("#pull", () => {
      it("creates file when file not exists", async () => {
        await config.pull();
        expect(await fs.exists(path)).to.be.true;
        expect((await fs.readFile(path)).toString()).to.eql(
          yaml.safeDump({})
        );
      });
    });
    describe("#pullSyncWhenExists", () => {
      it("throws when file not exists", () => {
        expect(() => config.pullSyncWhenExists()).to.throw;
      });
      it("loads config from file", async () => {
        await fs.writeFile(path, yaml.safeDump(
          { foo: "bar" }
        ));
        await config.pullSyncWhenExists();
        expect(config.get("foo")).to.eql("bar");
      });
    });
    describe("#pullSync", () => {
      it("creates file when file not exists", async () => {
        config.pullSync();
        expect(await fs.exists(path)).to.be.true;
        expect((await fs.readFile(path)).toString()).to.eql(
          yaml.safeDump({})
        );
      });
    });
  });
});