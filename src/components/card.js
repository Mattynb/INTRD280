export function createCard(props) {
    console.log(props);
    return `
        <div class="card">
            <img class="card_image" src="${props.card_image}" loading="lazy"></img>
            <div class="card_content">
                <h3 class="card_title">${props.card_title}</h3>
                <p class="card_description">${props.card_description}</p>
                <a class="card_button" href=${props.card_button}>Read More</a>
            </div>
        </div>
    `;
}

//style="width: 35%; margin-left: auto; margin-right: auto;