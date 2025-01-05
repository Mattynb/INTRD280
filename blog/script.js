function loadHTML(elementId, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error loading HTML:', error));
}


document.addEventListener('DOMContentLoaded', () => {
    loadHTML('footer', '../src/footer.html');
});