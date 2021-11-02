'use strict';

(function (app) {
  app.portfolioItems = [];
  app.selectedItem = {};

  app.homepage = async function () {
    copyrightInfo();
    await loadPageData();
    loadPortfolioPageData();
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

  function loadPortfolioPageData() {
    const originalItems = document.querySelectorAll('.highlight');
    const main = document.getElementById('portfolio-main');
    const newItems = [];

    for (let i = 0; i < app.portfolioItems.length; i++) {
      const el = app.portfolioItems[i];
      const highlight = document.createElement('div');
      highlight.classList.add('highlight');
      if (i % 2 > 0) {
        highlight.classList.add('invert');
      }

      const textDiv = document.createElement('div');
      const h2 = document.createElement('h2');
      const a = document.createElement('a');

      const titleWords = el.title.split(' ');
      let title = `<span class="kids">${i + 1}</span> `;

      // 3: 0,1,2; length = 3;
      for (let j = 0; j < titleWords.length - 1; j++) {
        title += titleWords[j];
        title += '<br />';
      }
      title += titleWords[titleWords.length - 1];

      h2.innerHTML = title;
      a.href = `workitem.html?item=${i + 1}`;
      a.innerText = 'see more';

      textDiv.appendChild(h2);
      textDiv.appendChild(a);

      highlight.appendChild(textDiv);

      const img = document.createElement('img');
      img.src = el.smallImage;
      img.alt = el.smallImageAlt;
      highlight.appendChild(img);

      newItems.push(highlight);
    }

    originalItems.forEach((el) => el.remove());
    newItems.forEach((el) => main.appendChild(el));
  }
})((window.app = window.app || {}));
