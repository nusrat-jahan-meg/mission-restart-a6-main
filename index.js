const manageSpinner =(status)  => {
  if (status==true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("product-container").classList.add("hidden");

  } else{
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("product-container").classList.remove("hidden")

  }
}




  
  const removeActive =() => {
    const button = document.querySelectorAll("#category-container .btn");
    button.forEach(btn => {
     btn.classList.remove("btn-active");
      btn.classList.remove("btn-primary");
    btn.classList.add("btn-outline");
    })
}

const loadCategory  =()=> {
    fetch("https://fakestoreapi.com/products/categories")
    .then((res)=> res.json())
    .then((data)=>

      displayCategory(data) 
  
     )
}

 const displayCategory = (categorys)=>{
 const categoryBtn =document.getElementById("category-container")
 categoryBtn.innerHTML = "";
 const allBtn = document.createElement("button");
 allBtn.innerText = "All";
 allBtn.className = "btn btn-primary btn-active";
 allBtn.onclick = function() {
 removeActive ();
this.classList.add("btn-active");
this.classList.add("btn-primary");
loadAllProducts();
 }
 categoryBtn.appendChild(allBtn)
for(let category of categorys){
    const btn =document.createElement("button");
    btn.innerText =category;
    btn.className= "btn btn-outline btn-primary uppercase ";
    btn.onclick =function ()   {
        removeActive();
         this.classList.add("btn-active");
      this.classList.add("btn-primary");
      loadCategoryProducts(category)
    }
    categoryBtn.appendChild(btn);
}


 }


  
  
  
  
  
  
  
  
  
  const loadAllProducts =()=> {
  manageSpinner(true);
fetch("https://fakestoreapi.com/products")
.then((res)=> res.json())
.then((data)=>{
  displayAllProduct(data);
    manageSpinner(false);
}
  )

  
};

// 3 product details 
const loadProductDetails = async(id) => {
const url =`https://fakestoreapi.com/products/${id}`
const res = await fetch(url);
const details = await res.json();
displayProductDetails(details)

}


// 4 display details
const displayProductDetails =(product)=> {
console.log(product)
const detailsProduct = document.getElementById("details-product");
detailsProduct.innerHTML = `  <div class="modal-box">
    <h3 class="text-lg font-bold">${product.title}</h3>
     <span class="font-xl font-bold">$${product.price}</span>
      <div class=""><i class="fa-regular fa-star  text-yellow-400"></i>${product.rating.rate} (${product.rating.count})</div>
    <p class="py-4">${product.description}</p>
    <div class="modal-action">
    
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-outline btn-primary">Bye Now</button>
      </form>
    </div>
  </div>`
 document.getElementById("details_modal").showModal();
}

// 5 treanding product 


// 6 


// 2

const loadCategoryProducts =(category)=> {
  manageSpinner(true);
  fetch(`https://fakestoreapi.com/products/category/${category}`)
  .then((res)=> res.json())
  .then((data) => {
  displayAllProduct(data);
  manageSpinner(false);
  }
    )
}


const   displayAllProduct =(products) => {

    console.log(products);
    const  productsCard = document.getElementById("product-container")
    productsCard.innerHTML ="";
    for(let product of products) {
        console.log(product);
        const div=document.createElement("div")



       div.innerHTML=`
  <div class="card bg-base-100 mx-auto w-full shadow-sm flex flex-col">
  <figure class="w-full">
    <img src="${product.image}" alt="${product.title}" class="h-48 w-full object-contain"/>
  </figure>
  <div class="card-body flex flex-col justify-between min-h-[180px]">
    <div class="flex justify-between">
      <div class="badge badge-soft badge-info">${product.category}</div>
      <div class="flex">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
    </svg>${product.rating.rate} (${product.rating.count})</div>
    </div>
    <h2 class="font-xl font-bold text-gray-600 truncate" title="${product.title}">${product.title}</h2>
    <span class="font-xl font-bold">$${product.price}</span>
    <div class="card-actions justify-between mt-2">
      <button onclick = "loadProductDetails(${product.id})" class="btn btn-soft btn-primary">Details</button>
      <button class="btn btn-soft btn-primary">   <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>Add</button>
    </div>
  </div>
</div>

`
     productsCard.appendChild(div)
    }

}


// trending product
const loadTopRatedProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  // rating অনুযায়ী sort (high → low)
  const sortedProducts = products.sort(
    (a, b) => b.rating.rate - a.rating.rate
  );

  const topThree = sortedProducts.slice(0, 3);

  displayTopProducts(topThree);
};

const displayTopProducts = (products) => {
  const container = document.getElementById("top-rated-container");
  container.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement("div");

    div.innerHTML = `
      <div class="card bg-base-100 shadow-md">
        <figure>
          <img src="${product.image}" class="h-40 w-full object-contain"/>
        </figure>
        <div class="card-body">
          <h2 class="card-title text-sm">${product.title}</h2>
          <p class="font-bold">$${product.price}</p>
          <p class="text-yellow-500">⭐ ${product.rating.rate}</p>
          <div class="card-actions justify-between mt-2">
      <button onclick = "loadProductDetails(${product.id})" class="btn btn-soft btn-primary">Details</button>
      <button class="btn btn-soft btn-primary">   <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>Add</button>
    </div>
        </div>
      </div>
    `;

    container.appendChild(div);
  });
};

loadTopRatedProducts();


loadCategory();
loadAllProducts();
loadMenCollection();

