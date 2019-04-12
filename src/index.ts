require("spinal-env-drive-core");
import { SpinalAdminInit } from "./SpinalAdminInit";

// @ts-ignore
const angular = require("angular");

const interval = setInterval(() => {
  const injector = angular
    .element("body > div")
    .injector();
  if (injector) {
    const authService = injector.get("authService");
    const ngSpinalCore = injector.get("ngSpinalCore");
    const SpinalAdmin = new SpinalAdminInit(ngSpinalCore, authService);
    SpinalAdmin.init()
      .then(
      () => {
        clearInterval(interval);
      },
      (e) => {
        clearInterval(interval);
      }
    ).catch(e => {
      clearInterval(interval);
    } );
  }
}, 2000);
