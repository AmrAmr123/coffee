let bar = document.querySelector(".bar");
let icons = document.querySelector(".sm-icons");
let closeMenu = document.querySelector(".close");
let closeCart = document.querySelector(".close-cart");
let cart = document.querySelector(".cart");
let show = document.querySelector(".show");
let year = document.querySelector(".year");
let items = document.querySelector(".items");
let carts = document.querySelector(".carts");
let blogs = document.querySelector(".blogs");
let cover = document.querySelector(".cover");
let landing = document.querySelector(".landing");
let cartsProduct = document.querySelector(".carts-product");
let cartsReview = document.querySelector(".carts-review");
let links = document.querySelectorAll(".header ul li a");
let date = new Date();
let month = date.getMonth();
let years = date.getFullYear();
let months = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May",
  "Jun.",
  "Jul.",
  "Aug.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dec.",
];
year.innerHTML = years;
bar.onclick = () => {
  icons.classList.add("right");
};
closeMenu.onclick = () => {
  icons.classList.remove("right");
};
cart.onclick = () => {
  show.classList.add("right");
  icons.classList.remove("right");
};
closeCart.onclick = () => {
  show.classList.remove("right");
};

links.forEach((link) => {
  link.onclick = () => {
    links.forEach((link) => {
      link.classList.remove("active");
    });
    link.classList.add("active");
  };
});
fetch("https://api.sampleapis.com/coffee/hot")
  .then((res) => res.json())
  .then((json) => getData(json));

function getData(data) {
  cover.attributes[1].textContent = data[19].image;
  for (let i = 0; i < 12; i++) {
    carts.innerHTML += `<div class="cart p-4 mt-5 rounded text-center">
    <img id="${data[i].id}"
    class="rounded-pill small pb-3"
    src="${data[i].image}"
  alt=""
/>
<h3>${data[i].title}</h3>
<div class="d-flex justify-content-center">
  <h3 class="me-2 mb-4">15.75$</h3>
  <del class="dark">20$</del>
</div>
<div class="d-flex justify-content-center">
<div class="white main-btn rounded-pill justify-content-center">
get your coffee
</div>
</div>
</div>`;
  }
  for (let i = 12; i < 15; i++) {
    cartsProduct.innerHTML += `
    <div
    class="cart-product p-5 m-3 rounded text-center"
  >
    <div class="pIcons d-flex justify-content-center mb-3">
    <span class="buy" id="${data[i].id}">
    <i
    class="white pIcon rounded cursor-pointer fa-solid buy fa-cart-shopping me-3"
    ></i>
    </span> 
  <span class="heart"><i
  class="white pIcon rounded cursor-pointer fa-solid fa-heart "
>
</i></span>
      </div>
    <div>
      <img class="tall pb-3" src="${data[i].image}" id="${data[i].id}" alt="" />
      <h3>${data[i].title}</h3>
      <div class="d-flex mb-2 justify-content-center">
        <i class="fa-solid fa-star me-1"></i>
        <i class="fa-solid fa-star me-1"></i>
        <i class="fa-solid fa-star me-1"></i>
        <i class="fa-regular fa-star me-1"></i>
        <i class="fa-regular fa-star me-1"></i>
      </div>
      <div class="d-flex justify-content-center">
        <h3 class="me-2">15.75$</h3>
        <del class="dark">20$</del>
      </div>
    </div>
  </div>`;
  }
  for (let i = 0; i < 3; i++) {
    blogs.innerHTML += `
    <div class="blog-cart rounded">
    <div><img style="height:300px;width:100%" src="${data[i].image}" alt="" /></div>
    <div>
    <div class="p-3">
    <h5 class="y-hover">${data[i].title}</h5>
      <p class="yellow">by admin / ${months[month]} ${years}</p>
      <p class="dark">
     ${data[i].description}
      </p>
      <div class="d-flex">
        <div class="white main-btn rounded-pill justify-content-center">
        get your coffee
        </div>
        </div>
        </div>
        </div>
        </div>
        `;
  }
  buy(data);

  let hearts = document.querySelectorAll(".heart");
  hearts.forEach((heart) => {
    heart.onclick = () => {
      heart.children[0].style.cssText =
        "color:var(--main-color);background-color:var(--hover-color)";
    };
  });
}
let arr = [];
getFromLocal();
function buy(data) {
  let buy = document.querySelectorAll(".buy");
  buy.forEach((buy) => {
    buy.onclick = () => {
      item = {
        id: buy.id,
        title: data[buy.id - 1].title,
        src: data[buy.id - 1].image,
        date: Date.now(),
      };
      arr.push(item);
      addToCart(arr);
      AddToLocal(arr);
    };
  });
}
function addToCart(arr) {
  items.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    items.innerHTML += `<div date="${arr[i].date}" id="${arr[i].id}" class="chosen mb-2 rounded">
    <img
    id="${arr[i].id}"
      class="small"
      src="${arr[i].src}"
      alt=""
      date="${arr[i].date}"
    />
    <div class="type">
      <span>${arr[i].title}</span>
      <p>12 $</p>
    </div>
    <div class="del">x</div>
  </div>`;
  }
  remove();
}
function remove() {
  let del = document.querySelectorAll(".del");
  del.forEach((del) => {
    del.onclick = () => {
      del.parentElement.remove();
      removeFromLocal(del.parentElement.attributes[0].value);
      // removeFromLocal(del.parentElement.attributes[0]);
    };
  });
}
function AddToLocal(arr) {
  localStorage.setItem("items", JSON.stringify(arr));
}
// localStorage.clear();
function getFromLocal() {
  if (localStorage.getItem("items")) {
    arr = JSON.parse(localStorage.getItem("items"));
    addToCart(arr);
  }
}
function removeFromLocal(date) {
  // arr = arr.filter((ele) => ele.id != id);
  arr = arr.filter((ele) => ele.date != date);
  AddToLocal(arr);
}
let sections = document.querySelectorAll("section");
onscroll = () => {
  let scrollPosition = document.documentElement.scrollTop;
  links.forEach((link) => {
    link.classList.remove("active");
  });
  sections.forEach((section) => {
    if (
      scrollPosition >= section.offsetTop - 200 &&
      scrollPosition <= section.offsetTop + section.offsetHeight - 200
    ) {
      active(section.id);
    }
  });
};
function active(id) {
  if (id != "") {
    document.querySelector(`.icons a[href="#${id}"]`).classList.add("active");
  }
}
