const cards = document.getElementById('cards');
const pages = document.getElementById('pages');
const url = 'https://rickandmortyapi.com/api/character/';

const createNode = (element) => document.createElement(element);
const append = (parent, element) => parent.appendChild(element);

fetch(url)
    .then(response => response.json())
    .then(data => {
      pages.innerHTML = `total characters ${data.info.count} in ${data.info.pages} pages`;

      let characters = data.results;
      return characters.map((character, i) => {
        let article = createNode('article');
        article.setAttribute('class', 'card');
        if (i % 2 === 0) {
          article.setAttribute('class', 'card alt');
        }
        article.setAttribute('id', `${character.id}-${i}`);

        let cardContent = createNode('div');

        let meta = createNode('section');
        meta.setAttribute('class', 'meta');
        let metaPhoto = createNode('div');
        metaPhoto.setAttribute('class', 'photo');
        metaPhoto.setAttribute('style', `background-image: url(${character.image})`);
        append(meta, metaPhoto);

        let metaDetails = createNode('ul');
        metaDetails.setAttribute('class', 'details');
        let metaOrigin = createNode('li');
        metaOrigin.setAttribute('class', 'origin');
        let metaOriginLink = createNode('a');
        metaOriginLink.innerHTML = character.origin.name;
        metaOriginLink.href = character.origin.url;
        append(metaOrigin, metaOriginLink);

        append(metaDetails, metaOrigin);
        append(meta, metaDetails);

        let articleBody = createNode('section');
        articleBody.setAttribute('class', 'description');
        let bodyHeader = createNode('header');
        let bodyHeading = createNode('h1');
        bodyHeading.innerHTML = character.name;
        let bodySubHeading = createNode('h2');
        bodySubHeading.innerHTML = `${character.species} - ${character.gender}`;

        let footer = createNode('footer');
        footer.setAttribute('class', 'profile');
        let footerLink = createNode('a');
        footerLink.href = character.url;
        footerLink.innerHTML = 'Profile';
        append(footer, footerLink);
        append(articleBody, footer);

        append(bodyHeader, bodyHeading);
        append(bodyHeader, bodySubHeading);
        append(articleBody, bodyHeader);
        append(article, meta);
        append(article, articleBody);


        append(article, cardContent);
        append(cards, article);
      });
    })
    .catch(error => {
      let errorMessage = createNode('div');
      errorMessage.innerHTML = error;
      append(cards, errorMessage);
    });
