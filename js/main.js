const elProductList = selectElement(".product-list")
const elProductTemplate = selectElement(".product-template").content
const elProductName = selectElement("#product-title")
const elProductPrice = selectElement("#price")
const elProductManufacture = selectElement("#product-manufacturer")
const elBenefits = selectElement("#benefits")
const elAddProductForm = selectElement(".add-product-form")
const elManufacturesFilter = selectElement("#manufacturer")
const elProductSearch = selectElement("#search")
const elPriceFrom = selectElement("#from")
const elPriceTo = selectElement("#to")
const elSortBy = selectElement("#sortby")
const elFilterForm = selectElement("#search-form")
const editProductModal = selectElement("#edit-product-modal")
const elEditFormTitle = selectElement("#edit-product-title")
const elEditFormPrice = selectElement("#edit-price")
const elEditFormManufacture = selectElement("#edit-product-manufacturer")
const elEditFormBenefits = selectElement("#edit-benefits")
const elEditForm = selectElement("#edit-form")




const manufacturesRender = (manufacturesArr, optionList) => {
    manufacturesArr.forEach(element => {
        const option = createDOM("option", element.name)
        option.value = element.name
        option.textContent = element.name
        optionList.append(option)
    });
}
const addZero = date => date < 10 ? "0" + date : date

function renderProduct(productsArr) {
    elProductList.innerHTML = null;
    productsArr.forEach((product) => {
      const getDate = (date) => {
        const newDate = new Date(date);
        return `${newDate.getFullYear()}/${addZero(newDate.getMonth() + 1)}/${addZero(newDate.getDate())}`;
      };
  
      const { id, title, img, price, model, addedDate, benefits } = product;
      const newProductTemp = elProductTemplate.cloneNode(true);
      selectElement(".product-card", newProductTemp).setAttribute("data-id", id);
      selectElement(".card-img-top", newProductTemp).src = img;
      selectElement(".card-title", newProductTemp).textContent = title;
      selectElement(".mark", newProductTemp).textContent = price;
      selectElement(".price-sale", newProductTemp).textContent = (price / 100) * 40;
      selectElement(".model", newProductTemp).textContent = model;
      selectElement(".data", newProductTemp).textContent = getDate(addedDate);
      selectElement(".benefits", newProductTemp).textContent = benefits;
      elProductList.append(newProductTemp);
    });
  };

  renderProduct(products)   

  const onCardClick = (event) => {
    if (event.target.matches(".btn-delete")) {
      const currentCard = event.target.closest(".product-card").dataset.id
      const currentProduct = products.findIndex(
        (product) => product.id === +currentCard
      );
      products.splice(currentProduct, 1);
      renderProduct(products, elProductList);
    }else if(event.target.matches(".edit")){
        const currentCardId = event.target.closest("#one-product").dataset.id
        const currentProductIndex = products.findIndex(product => product.id === +currentCardId)

        elEditFormTitle.value = products[currentProductIndex].title
        elEditFormPrice.value = products[currentProductIndex].price
        elEditFormManufacture.value = products[currentProductIndex].model
        elEditFormBenefits.value = products[currentProductIndex].benefits 
    }

}
if (elProductList) {
    elProductList.addEventListener("click", onCardClick);
  }






  const elSearchInput = document.getElementById("search")

  elSearchInput.addEventListener("input", (e) =>{
    const searchingValue = new RegExp(e.target.value, "gi")
 
    const filterProducts = products.filter((product) =>
          product.title.match(searchingValue)
        );
      
        renderProduct(filterProducts);
      });

      elFilterForm.addEventListener('submit', (e) => {
            e.preventDefault()
          
            const filteredProducts = products.filter(product => {
              if(elPriceTo.value == ''){
                elPriceTo.value = Infinity
            } else{
              return product.price >= elPriceFrom.value}
            }).filter(product => {
              return product.price <= elPriceTo.value
            })
          
            renderProduct(filteredProducts)
        })

        
