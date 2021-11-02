'use strict';

(function (app) {
  app.homepage = function () {
    copyrightInfo();
    wireContactForm();
  };

  function copyrightInfo() {
    const dt = new Date();

    document.getElementById(
      'copyright-info'
    ).innerHTML = `\u00a9 ${dt.getFullYear()} by Ally Reynolds.`;
  }

  function wireContactForm() {
    const contactForm = document.getElementById('contact-form');
    contactForm.onsubmit = contactFormSubmit;
  }

  function contactFormSubmit(e) {
    e.preventDefault();

    const contactForm = document.getElementById('contact-form');
    const name = contactForm.querySelector('#name');
    const email = contactForm.querySelector('#email');
    const message = contactForm.querySelector('#message');

    const mailTo = `mailto:${email.value}?subject=Contact From ${name.value}&body=${message.value}`;
    window.open(mailTo);
  }
})((window.app = window.app || {}));
