if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
  } else {
    ready()
  }
  
var totalAmount = "0,00"

function ready() {
  // Botão remover produto
  const removeCartProductButtons = document.getElementsByClassName("remove-product-button")
  for (var i = 0; i < removeCartProductButtons.length; i++) {
    removeCartProductButtons[i].addEventListener("click", removeProduct)
  }

  // Mudança valor dos inputs
  const quantityInputs = document.getElementsByClassName("product-qtd-input")
  for (var i = 0; i < quantityInputs.length; i++) {
    quantityInputs[i].addEventListener("change", checkIfInputIsNull)
  }

  // Botão add produto ao carrinho
  const addToCartButtons = document.getElementsByClassName("button-hover-background")
  for (var i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener("click", addProductToCart)
  }

 // Botão comprar
 const purchaseButton = document.getElementsByClassName("purchase-button")[0]
 purchaseButton.addEventListener("click", makePurchase)
}

function removeProduct(event) {
 event.target.parentElement.parentElement.remove()
 updateTotal()
}

function checkIfInputIsNull(event) {
 if (event.target.value === "0") {
   event.target.parentElement.parentElement.remove()
 }
 updateTotal()
}

function addProductToCart(event) {
 const button = event.target
 const productInfos = button.parentElement.parentElement
 const cardImg = productInfos.getElementsByClassName("card-img-top")[0]
 const cardText = productInfos.getElementsByClassName("card-text")[0]
 const cardTitle = productInfos.getElementsByClassName("card-title")[0]

 const productsCartNames = document.getElementsByClassName("cart-product-title")
 for (var i = 0; i < productsCartNames.length; i++) {
   if (productsCartNames[i].innerText === cardText) {
     productsCartNames[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++
     updateTotal()
     return
   }
 }

 let newCartProduct = document.createElement("tr")
 newCartProduct.classList.add("cart-product")

 newCartProduct.innerHTML =
   `
     <td class="product-identification">
       <img src="${cardImg}" alt="${cardText}" class="card-img-top">
       <strong class="cart-card-text">${cardText}</strong>
     </td>
     <td>
       <span class="cart-card-title">${cardText}</span>
     </td>
     <td>
       <input type="number" value="1" min="0" class="product-qtd-input">
       <button type="button" class="remove-product-button">Remover</button>
     </td>
   `
 
 const tableBody = document.querySelector(".cart-table")
 tableBody.append(newCartProduct)
 updateTotal()

 newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProduct)
 newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull)
}

function makePurchase() {
 if (totalAmount === "0,00") {
   alert("Seu carrinho está vazio!")
 } else {   
   alert(
     `
       Obrigado pela sua compra!
       Valor do pedido: R$${totalAmount}\n
       Volte sempre :)
     `
   )

   document.querySelector(".cart-table").innerHTML = ""
   updateTotal()
 }
}

// Atualizar o valor total do carrinho
function updateTotal() {
 const cartProducts = document.getElementsByClassName("cart-product")
 totalAmount = 0

 for (var i = 0; i < cartProducts.length; i++) {
   const cardTitle = cartProducts[i].getElementsByClassName("cart-card-title")[0].innerText.replace("R$", "").replace(",", ".")
   const productQuantity = cartProducts[i].getElementsByClassName("product-qtd-input")[0].value

   totalAmount += cardTitle * productQuantity
 }
 
 totalAmount = totalAmount.toFixed(2)
 totalAmount = totalAmount.replace(".", ",")
 document.querySelector(".cart-total-container span").innerText = "R$" + totalAmount
}