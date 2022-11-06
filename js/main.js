let elProducts = document.querySelector(".products");
let elModalDesc = document.querySelector(".modal-p");
let modalBtns = document.querySelector(".modal-footer")
let productsArray = [];
(async () => {
    try { 
        let response = await fetch(
        `https://fakestoreapi.com/products`
        );
        let data = await response.json();
        productsArray = data
        productRender(productsArray);
    } catch (error) {
    console.error(error);
    }
})();
 
function productRender(data) {
    data.forEach(e => {
    let div = document.createElement("div")
    div.classList.add("product");
    div.innerHTML = `
    <img style="margin-bottom: 10px" width="233" height="123" src=${e.image} alt="picture">
                <p class="product-desc">Price: ${e.price}</p>
                <p class="product-desc">Count: ${e.rating.count}</p>
                <p class="product-desc">Desc: ${e.description}</p>
                <p class="product-desc">Name: ${e.title}</p>
                <button id=${e.id} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="product-btn">🗑️</button>
    `
    elProducts.appendChild(div)
    });
}

let deleteProductId

elProducts.addEventListener('click', el => {
    let id = el.target?.id
    deleteProductId = id;
    let prod = productsArray.find(pr => pr.id == id)
    elModalDesc.textContent = `Do you want to delete " ${prod?.title} " ?`

})

modalBtns.addEventListener("click", e=> {
    if(e.target.id == "delete-btn"){
        productsArray = productsArray.filter(e => e.id != deleteProductId)
        elProducts.innerHTML = null;
        productRender(productsArray)
    }
    if(e.target.id == "close-btn"){
       deleteProductId = null
    }
    
})
