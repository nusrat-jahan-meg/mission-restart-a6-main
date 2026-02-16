const loadAllProducts =()=> {
fetch("https://fakestoreapi.com/products")
.then((res)=> res.json())
.then((data)=> displayAllProduct(data))

  
};

// 2

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
      <div class=""><i class="fa-regular fa-star  text-yellow-400"></i>${product.rating.rate} (${product.rating.count})</div>
    </div>
    <h2 class="font-xl font-bold text-gray-600 truncate" title="${product.title}">${product.title}</h2>
    <span class="font-xl font-bold">$${product.price}</span>
    <div class="card-actions justify-between mt-2">
      <button class="btn btn-soft btn-primary">Details</button>
      <button class="btn btn-soft btn-primary">   <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>Add</button>
    </div>
  </div>
</div>

`
     productsCard.appendChild(div)
    }

    document.querySelectorAll(".product-btn").forEach(btn => {
        btn.addEventListener("click" , () => {
            // const id = e.target.dataset.id;
            console.log("hello",product.id);
        }) 
    })
}




loadAllProducts();