import { postData } from './src/constants.js';  
import { createCard } from './src/components/card.js';

function loadHTML(elementId, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error loading HTML:', error));
}

function loadFolder(folder) {
    // logs all HTML files in the folder
    fetch(folder)
        .then(response => response.text())
        .then(data => {
            // get the file names
            let fileNames = data.match(/href="[^"]+"/g);
            fileNames = fileNames.map(fileName => fileName.slice(6, -1));

            // load the HTML files
            fileNames.forEach(fileName => {
                if (fileName.endsWith('.html')) {
                    loadHTML(fileName.slice(0, -5), folder + '/' + fileName);
                }
            });
        })
        .catch(error => console.error('Error loading folder:', error));
}

function renderCards() {
    const container = document.getElementById('blog');

    Object.entries(postData).forEach(post => {
        const card = createCard(post[1]);
        container.innerHTML += card;
    });


}


document.addEventListener('DOMContentLoaded', () => {
    loadHTML('header', 'src/header.html');
    loadHTML('people', 'src/people.html');
    loadHTML('footer', 'src/footer.html');
    renderCards();
    //loadHTML('module1', 'src/posts/module1.html');
    //loadFolder('src/posts');
});