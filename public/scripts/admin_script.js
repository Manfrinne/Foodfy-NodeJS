// SELECT MENU - GLOBAL PAGES
// Verificar window tree HTML/JavaScript
const currentPage = window.location.pathname
const menuItens = document.querySelectorAll("header .menu-links a")

for (item of menuItens) {
  // O método '.includes' vai me retornar um bolean value.
  if (currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active")
  }
}

// function in the recipes/create-edit page
const PhotosUpload = {
  input: "",
  preview: document.querySelector('#photos-preview'),
  photosUpload: document.querySelector('#photos-upload'),
  uploadLimit: 6,
  files: [],

  handleFileInput(event) {
    const {files: fileList} = event.target
    PhotosUpload.input = event.target

    if(PhotosUpload.hasLimit(event)) return

    Array.from(fileList).forEach(file => {

      PhotosUpload.files.push(file)

      const reader = new FileReader() //image format BLOB

      reader.onload = () => {
        const image = new Image() //<img>src="some/image"</img>
        image.src = String(reader.result) //resultado do 'readAsDataURL'

        const div = PhotosUpload.getContainer(image)
        PhotosUpload.preview.appendChild(div)

      }

      reader.readAsDataURL(file)

    })

    PhotosUpload.input.files = PhotosUpload.getAllFiles()

    if (currentPage.includes("chefs")) {
      if (PhotosUpload.input.files) {
        PhotosUpload.photosUpload.style.display='none'
      }
    }
  },

  hasLimit(event) {
    let {uploadLimit, input, preview} = PhotosUpload
    const {files: fileList} = input

    if (currentPage.includes("chefs")) {
      uploadLimit = 1
    }

    if (fileList.length > uploadLimit) {
      alert(`Error! Envie no máximo ${uploadLimit} imagens`)
      event.preventDefault()

      return true
    }

    const photosDiv = []
    preview.childNodes.forEach(item => {
      if (item.classList && item.classList.value == "photo") {
        photosDiv.push(item)
      }
    })

    const totalPhotos = fileList.length + photosDiv.length
    if (totalPhotos > uploadLimit) {
      alert("Limite de fotos excedido!")
      event.preventDefault()

      return true
    }

    return false
  },

  getAllFiles() {
    const dataTransfer =  new ClipboardEvent("").clipboardData || new DataTransfer() // ClipboardEvent() => p/ Firefox

    PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

    return dataTransfer.files
  },

  getContainer(image) {
    const div = document.createElement('div')
    div.classList.add('photo')

    div.onclick = PhotosUpload.removePhoto

    div.appendChild(image)

    div.appendChild(PhotosUpload.getRemoveButton())

    return div
  },

  getRemoveButton() {
    const button = document.createElement('i')
    button.classList.add('material-icons')
    button.innerHTML = "close"

    return button
  },

  removePhoto(event) {
    // event.tarteg => <i> e parentNode <div class="photo">
    const photoDiv = event.target.parentNode
    const photosArray = Array.from(PhotosUpload.preview.children)
    const index = photosArray.indexOf(photoDiv)

    PhotosUpload.files.splice(index, 1)
    PhotosUpload.input.files = PhotosUpload.getAllFiles()

    photoDiv.remove()

    if (currentPage.includes("chefs")) {
      if (PhotosUpload.input.files) {
        PhotosUpload.photosUpload.style.display='block'
      }
    }
  },

  removeOldPhoto(event) {
    const photoDiv = event.target.parentNode

    if (photoDiv.id) {
      const removedFiles = document.querySelector('input[name="removed_files"]')
      if (removedFiles) {
        removedFiles.value += `${photoDiv.id},` // 1,2,3,...
      }
    }

    photoDiv.remove()
  }
}

// function for change images recipes/show page
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

// RECIPE FORM - CREATE AND EDIT PAGES
// Função para adicionar elemento na lista de ingredientes
function addIngredient() {
  const ingredients = document.querySelector("#ingredients");
  const fieldContainer = document.querySelectorAll(".ingredient");

  // Realiza um clone do último ingrediente adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "") return false

  // Deixa o valor do input vazio
  newField.children[0].value = ""
  ingredients.appendChild(newField)
}
if (document.querySelector(".add-ingredient") != null) document.querySelector(".add-ingredient").addEventListener("click", addIngredient)

// Função para adicionar elemento na lista de passos
function addSteps() {
  const ingredients = document.querySelector("#preparation")
  const fieldContainer = document.querySelectorAll(".preparation")

  // Realiza um clone do último ingrediente adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "") return false

  // Deixa o valor do input vazio
  newField.children[0].value = ""
  ingredients.appendChild(newField)
}

if (document.querySelector(".add-steps") != null) document.querySelector(".add-steps").addEventListener("click", addSteps)

// VALIDAR EMAIL
const Validate = {
  apply(input, func) {
    //Limpar a div de tentativas erradas de email
    Validate.clearErrors(input)

    //Antes de qualquer coisa, ele verifica
    //se há um error por causa da isEmail(value)
    let results = Validate[func] (input.value)
    input.value = results.value

    if(results.error) Validate.displayError(input, results.error)

  },

  displayError(input, error) {
    const div = document.createElement('div')
    div.classList.add('error')
    div.innerHTML = error
    input.parentNode.appendChild(div)
    input.focus()
  },

  clearErrors(input) {
    const errorDiv = input.parentNode.querySelector(".error")
    if (errorDiv) errorDiv.remove()
  },

  isEmail(value) {
    let error = null
    // Dúvidas com REGEX? Verifique a documentação no início do código
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if(!value.match(mailFormat)) error = "Email inválido!"

    return {error, value}
  }
}

