'use strict';

(function (app) {
  app.portfolioItems = [];
  app.selectedItem = {};

  app.homepage = function () {
    copyrightInfo();
    wireContactForm();
  };

  app.workItem = function () {
    loadPageData();
    loadSpecificItems();
    updateItemPage();
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

  async function loadPageData() {
    const cacheData = sessionStorage.getItem('site-data');

    if (cacheData !== null) {
      app.portfolioItems = JSON.parse(cacheData);
    } else {
      const rawData = await fetch('sitedata.json');
      const data = await rawData.json();
      app.portfolioItems = data;
      sessionStorage.setItem('site-data', JSON.stringify(data));
    }
  }

  function loadSpecificItems() {
    const params = new URLSearchParams(window.location.search);
    let item = Number.parseInt(params.get('item'));

    if (item > app.portfolioItems.length || item < 1) {
      item = 1;
    }

    app.selectedItem = app.portfolioItems[item - 1];
    app.selectedItem.id = item;
  }

  function updateItemPage() {
    const header = document.getElementById('work-item-header');
    header.innerText = `${app.selectedItem.id}. ${app.selectedItem.title}`;

    const image = document.getElementById('work-item-image');
    image.src = app.selectedItem.largeImage;
    image.alt = app.selectedItem.largeImageAlt;

    const projectText = document.querySelector('#project-text p');
    projectText.innerText = app.selectedItem.projectText;

    const originalTechList = document.querySelector('#technologies-text ul');
    const technologySection = document.getElementById('technologies-text');
    const ul = document.createElement('ul');

    app.selectedItem.technologies.forEach((el) => {
      const li = document.createElement('li');
      li.innerText = el;
      ul.appendChild(li);
    });

    originalTechList.remove();
    technologySection.appendChild(ul);

    const challengesText = document.querySelector('#challenges-text p');
    challengesText.innerText = app.selectedItem.challengesText;
  }
})((window.app = window.app || {}));
