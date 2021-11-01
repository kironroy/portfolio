'use strict';

(function (app) {
  app.homepage = function () {
    copyrightInfo();
  };

  function copyrightInfo() {
    let dt = new Date();

    document.getElementById(
      'copyright-info'
    ).innerHTML = `\u00a9 ${dt.getFullYear()} by Ally Reynolds.`;
  }
})((window.app = window.app || {}));
