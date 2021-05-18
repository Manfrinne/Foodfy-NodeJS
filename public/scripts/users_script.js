
// Start ONCLICK IN CARD - Change for users/recipe
const cards = document.querySelectorAll(".card")
const currentPage = window.location.pathname

for (let card of cards) {
    card.addEventListener("click", function() {

        const urlID = card.getAttribute("number")

        if (currentPage.includes('recipes')) {
          window.location.href = `recipes/${urlID}`
        } else {
          window.location.href = `users/recipes/${urlID}`
        }
    });
};

// End ONCLICK IN CARD - Change for users/recipe
// Function for change images in Gallery users/recipe
const ImageGallery = {
  highlight: document.querySelector(".gallery .highlight > img"),
  previews: document.querySelectorAll(".gallery-preview img"),
  setImage(event) {
    const {target} = event

    ImageGallery.previews.forEach(preview => preview.classList.remove("active"))
    target.classList.add("active")

    ImageGallery.highlight.src = target.src
    LightBox.image.src = target.src
  }
}

// SHOW AND HIDEN BUTTONS ON RECIPES SHOW PAGES
const showHidesIngredients = document.querySelectorAll('.ingredientsList')

for (let showHidesIngredient of showHidesIngredients) {
  const buttonrecipe = showHidesIngredient.querySelector('h4')
  buttonrecipe.addEventListener('click', function (){
    if (buttonrecipe.innerHTML == "Esconder") {
        showHidesIngredient.querySelector('.uniq_topics_contents').classList.add('hidden');
        buttonrecipe.innerHTML = "Mostrar"
    } else {
        showHidesIngredient.querySelector('.uniq_topics_contents').classList.remove('hidden');
        buttonrecipe.innerHTML = "Esconder"
    }
  })
}

const showHidesPreparations = document.querySelectorAll('.preparationList')

for (let showHidesPreparation of showHidesPreparations) {
  const buttonPreparation = showHidesPreparation.querySelector('h4')
  buttonPreparation.addEventListener('click', function (){
    if (buttonPreparation.innerHTML == "Esconder") {
        showHidesPreparation.querySelector('.uniq_topics_contents').classList.add('hidden');
        buttonPreparation.innerHTML = "Mostrar"
    } else {
        showHidesPreparation.querySelector('.uniq_topics_contents').classList.remove('hidden');
        buttonPreparation.innerHTML = "Esconder"
    }
  })
}

const showHidesInformations = document.querySelectorAll('.informationList')

for (let showHidesInformation of showHidesInformations) {
  const buttonInformation = showHidesInformation.querySelector('h4')
  buttonInformation.addEventListener('click', function (){
    if (buttonInformation.innerHTML == "Esconder") {
        showHidesInformation.querySelector('.uniq_topics_contents').classList.add('hidden');
        buttonInformation.innerHTML = "Mostrar"
    } else {
        showHidesInformation.querySelector('.uniq_topics_contents').classList.remove('hidden');
        buttonInformation.innerHTML = "Esconder"
    }
  })
}
