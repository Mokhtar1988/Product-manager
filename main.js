let product = document.getElementById("product");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let total = document.getElementById("total");
let count = document.getElementById("count");
let cati = document.getElementById("cati");
let submit = document.getElementById("submit");
let mode = "Create";
let tmp;

// get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +tax.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}
// creat product
let dataPro;
if (localStorage.products != null) {
  dataPro = JSON.parse(localStorage.products);
} else {
  dataPro = [];
}
//create function
submit.onclick = function () {
  let newPro = {
    product: product.value.toLowerCase(),
    price: price.value,
    tax: tax.value,
    total: total.innerHTML,
    count: count.value,
    cati: cati.value.toLowerCase(),
  };
  if (product.value != "" && price.value != "") {
    if (mode === "Create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      mode = "Create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }

  localStorage.setItem("products", JSON.stringify(dataPro));

  showData();
};
// clear inputs
function clearData() {
  product.value = "";
  price.value = "";
  tax.value = "";
  total.innerHTML = "";
  count.value = "";
  cati.value = "";
}
//read
function showData() {
  let table;
  for (let i = 0; i < dataPro.length; i++) {
    table += `    <tr>
    <td>${i + 1}</td>
    <th>${dataPro[i].product}</th>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].tax}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].cati}</td>
    <td><button onclick="updateItem(${i})" id="update">Update</button></td>
    <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>
  </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  let btndelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btndelete.innerHTML = `<button onclick="deleteAll()" >Delete All(${dataPro.length})</button>`;
  } else {
    btndelete.innerHTML = "";
  }
  getTotal();
}

//count
//delete
function deleteItem(i) {
  dataPro.splice(i, 1);
  localStorage.products = JSON.stringify(dataPro);
  showData();
}

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}
//update
function updateItem(i) {
  product.value = dataPro[i].product;
  price.value = dataPro[i].price;
  tax.value = dataPro[i].tax;
  total.innerHTML = dataPro[i].total;
  cati.value = dataPro[i].cati;
  count.style.display = "none";
  submit.innerHTML = "Update";
  mode = "Update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//clean data

let search = document.getElementById("search");
let searchMode = "product";
function getSearchMode(id) {
  if (id === "searchpro") {
    searchMode = "product";
    search.placeholder = "Search By Product";
  } else {
    searchMode = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  showData();
}
function searchData(value) {
  let table = "";
  if (searchMode === "product") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].product.includes(value.toLowerCase())) {
        table += `    <tr>
      <td>${i}</td>
      <th>${dataPro[i].product}</th>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].tax}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].cati}</td>
      <td><button onclick="updateItem(${i})" id="update">Update</button></td>
      <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>
    </tr>`;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].cati.includes(value.toLowerCase())) {
        table += `    <tr>
    <td>${i}</td>
    <th>${dataPro[i].product}</th>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].tax}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].cati}</td>
    <td><button onclick="updateItem(${i})" id="update">Update</button></td>
    <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>
  </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
