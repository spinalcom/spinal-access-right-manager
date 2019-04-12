import { SpinalAdminInit } from "./SpinalAdminInit";

// @ts-ignore
const angular = require("angular");


export default (() => {
  return new Promise((resolve, reject) => {
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
              resolve()
            },
            (e) => {
              clearInterval(interval);
              resolve()
            }
          ).catch(e => {
          reject()
          clearInterval(interval);
        });
      }
    }, 2000);

  })
})()