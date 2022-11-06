let elProducts = document.querySelector(".products");
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
                <button id=${e.id} class="product-btn">🗑️</button>
    `
    elProducts.appendChild(div)
    });
}

elProducts.addEventListener('click', el => {
    productsArray = productsArray.filter(e => e.id != el.target.id)
    elProducts.innerHTML = null;
    productRender(productsArray)
})
