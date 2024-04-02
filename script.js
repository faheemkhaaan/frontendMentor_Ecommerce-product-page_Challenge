const productImage = document.querySelectorAll(".product");
const productThumbnail = document.querySelectorAll(".product-thumbnail");
const chooseAmount = document.querySelector(".choose-amount");
const amount = document.querySelector(".amount");
const lightBox = document.querySelector("#lightBox");
const hideLightBox = document.getElementById("cross");
const productInSlider = document.querySelector('.product-in-slider');
const wrapper = document.querySelector(".wrapper");
const cartBasket = document.querySelector(".cart-basket");
const cartLogo = document.querySelector(".cart-logo");
const filledCart = document.querySelector(".filledCart");
const basket = document.querySelector(".basket");
const addToCart = document.querySelector(".add-to-cart");

cartBasket.style.display = "none";
cartLogo.addEventListener("click", () => {
    cartBasket.style.display = (cartBasket.style.display == "none") ? "block" : "none";
})
productThumbnail.forEach(thumbnail => {
    thumbnail.addEventListener("click", () => {
        imageSelected(thumbnail)
    })
});
function imageSelected(thumbnail) {
    productImage[0].src = thumbnail.getAttribute("data-changeSrc")
    console.log(thumbnail.getAttribute("data-changeSrc"))
}
chooseAmount.addEventListener("click", amountChoosen)
let x = 0;
function amountChoosen(e) {
    let target = e.target;
    // console.log(target.getAttribute("data-sign"))
    if (target.getAttribute("data-sign") === "minus") {
        if (x > 0) {
            x--;
            amount.textContent = x;
            console.log(x)
        }
    }
    if (target.getAttribute("data-sign") === "plus") {
        x++;
        amount.textContent = x;
        console.log(x)
    }
}
productImage[0].addEventListener("click", () => {
    lightBox.style.display = "block";
    wrapper.style.display = 'block'

});
hideLightBox.addEventListener("click", () => {
    lightBox.style.display = "none";
    wrapper.style.display = 'none'
})
let slide = 0;
lightBox.addEventListener("click", (e) => {
    let target = e.target;
    // console.log(target.className)
    // console.log(target)
    if (target.className == "product-thumbnail-slider") {
        productInSlider.src = target.getAttribute("data-changesrc")
        console.log(productInSlider);
    }
    if (target.className.includes("next")) {
        slide = (1 + slide) % 4;
        console.log(slide)
        productInSlider.src = productThumbnail[slide].getAttribute('data-changeSrc')

    }
    if (target.className.includes("previous")) {
        slide = (slide > 0) ? --slide : 3;
        productInSlider.src = productThumbnail[slide].getAttribute('data-changeSrc');
        console.log(slide);
    }
})

function createCartItem() {
    let cartItem = document.createElement("div");
    let para = document.createElement("p");
    let deleteBTn = document.createElement('img');
    let cartImg = document.createElement("img");

    cartItem.className = "filledcart"

    cartImg.src = "images/image-product-1-thumbnail.jpg"
    cartImg.className = "forcartImg"

    deleteBTn.src = "images/icon-delete.svg";
    deleteBTn.setAttribute("style", "margin: 5px;")
    deleteBTn.addEventListener("click", removeCartItem)

    function removeCartItem(){
        cartItem.remove()
        console.log(basket.childNodes)
        // itemAddedToCart(basket)
    }
    
    para.innerHTML = ` Fall Limited Edition Sneakers <br>
    $<span>125.00</span> &Cross; <span class="cartItem-amount">3</span>
    $<span>375.00</span>`;
    // cartItem.textContent = "This is a cart item";
    
    cartItem.appendChild(cartImg)
    cartItem.appendChild(para);
    cartItem.appendChild(deleteBTn)
    
    return {cartItem, removeCartItem}
}

const emtpyCartText = document.querySelector(".empty-cart-text");

addToCart.addEventListener("click", itemAddedToCart)

function itemAddedToCart(){
    // let {removeCartItem} = createCartItem();
    // let temBasket = removeCartItem()
    // console.log(temBasket)
    if(basket.childNodes[4]){
        emtpyCartText.style.display = "none"
        let {cartItem} = createCartItem();
        let checkoutButton = document.createElement("button");
        checkoutButton.className = 'checkout-btn'
        checkoutButton.textContent = "Checkout";
        basket.appendChild(cartItem)
        cartItem.appendChild(checkoutButton);
        const cartItemAmount = document.querySelectorAll(".cartItem-amount")
        cartItemAmount[0].textContent = 0;
        console.log("In if statememt")
        console.log(basket.nodeType)
    }else{
        console.log("In  else statement")
        emtpyCartText.style.display = "block"
    }
}