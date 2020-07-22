// $(document).ready(function () {
//   $("#ok").css("color", "red");
// });

// Déclaration de la fonction calculMoyenne
// Cette fonction permet de calculer la moyenne de 4 notes
function calculMoyenne(math, chimie, info, phy) {
  var moyenne = (math + chimie + info + phy) / 4;
  alert(moyenne);
}

function facture(qte, prix) {
  const tva = 20;
  var montantHT = qte * prix;
  console.log("Montant HT ", montantHT);
  var montantTTC = montantHT * (1 + tva / 100);
  console.log("Montant TTC ", montantTTC);
  alert("Montant HT = " + montantHT);
  alert("Montant TTC = " + montantTTC);
}

function aler(x) {
  alert(x);
}

function login() {
  var email = document.getElementById("emailInput").value;
  console.log("Email value ", email);
  var password = document.getElementById("pwd").value;
  console.log("Password value ", password);
}

function signup() {
  var firstName = document.getElementById("firstName").value;
  if (!verifyLength(firstName, 3)) {
    document.getElementById("firstNameMsg").innerHTML =
      "First Name must have at least 3 characters";
  } else {
    document.getElementById("firstNameMsg").innerHTML = "";
  }
  var lastName = document.getElementById("lastName").value;
  if (!verifyLength(lastName, 3)) {
    document.getElementById("lastNameMsg").innerHTML =
      "Last Name must have at least 3 characters";
  } else {
    document.getElementById("lastNameMsg").innerHTML = "";
  }
  var email = document.getElementById("inputEmail").value;
  if (!validateEmail(email) || checkIfUserExists(email)) {
    document.getElementById("emailMsg").innerHTML =
      "PLEASE check Email Format or Email exixts";
  } else {
    document.getElementById("emailMsg").innerHTML = "";
  }

  var pwd = document.getElementById("inputPassword").value;

  if (!verifyPwdFormat(pwd)) {
    document.getElementById("pwdMsg").innerHTML = "Please check Password !!";
  } else {
    document.getElementById("pwdMsg").innerHTML = "";
  }
  var confirmPwd = document.getElementById("confirmPwd").value;
  if (!verifyPwd(pwd, confirmPwd)) {
    document.getElementById("confirmPwdMsg").innerHTML =
      "Confirm Pwd does not match to Pwd";
  } else {
    document.getElementById("confirmPwdMsg").innerHTML = "";
  }
  var inputAddress = document.getElementById("inputAddress").value;
  var state = document.getElementById("inputState");
  var selectedState = state.options[state.selectedIndex].value;

  var inputZip = document.getElementById("inputZip").value;

  var type = document.getElementById("userType");
  var userType = type.options[type.selectedIndex].value;

  var idLocal = JSON.parse(localStorage.getItem("idL") || "1");

  var user = {
    id: idLocal,
    fName: firstName,
    lName: lastName,
    email: email,
    pwd: pwd,
    confirmPwd: confirmPwd,
    address: inputAddress,
    state: selectedState,
    zip: inputZip,
    userType: userType,
  };

  if (
    verifyLength(firstName, 3) &&
    verifyLength(lastName, 3) &&
    verifyPwd(pwd, confirmPwd) &&
    verifyPwdFormat(pwd) &&
    validateEmail(email) &&
    !checkIfUserExists(email)
  ) {
    var T = JSON.parse(localStorage.getItem("users") || "[]");
    T.push(user);
    localStorage.setItem("users", JSON.stringify(T));
    localStorage.setItem("idL", idLocal + 1);
  }
}

function verifyPwd(a, b) {
  return a === b;
}

function verifyLength(a, n) {
  return a.length >= n;
}

function tabNeg() {
  var T = Array();
  var A = Array();
  var n = prompt("Donner la taille du tableau");
  while (n < 5 || n > 8) {
    n = prompt("N doit être entre 5 et 8 !!");
  }
  var i = 0;
  while (i < n) {
    var x = Number(prompt(`Donner la valeur de T[${i}]`));
    while (x >= 0 || typeof x !== "number" || isNaN(x)) {
      x = Number(prompt(`Donner une valeur négative de T[${i}]`));
    }
    T[i] = x;
    A[i] = 10 + 2 * i - T[i];
    i++;
  }
}

function verifyPwdFormat(x) {
  // Numbers counter
  var c = 0;
  // Loop counter
  var i = 0;
  while (c == 0 && i < x.length) {
    if (typeof Number(x[i]) == "number" && !isNaN(x[i])) {
      c++;
    }
    i++;
  }
  return c > 0 && x.length >= 8;
}

function validateEmail(x) {
  const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(String(x).toLowerCase());
}

function checkIfUserExists(email) {
  var T = JSON.parse(localStorage.getItem("users") || "[]");
  var i = 0;
  while (i < T.length && T[i].email != email) {
    i++;
  }
  // i = 2
  if (i == T.length) {
    return false;
  } else {
    return T[i].email == email;
  }
}

function searchUserByEmail(T, email) {
  for (var i = 0; i < T.length; i++) {
    if (T[i].email == email) {
      var user = T[i];
    }
  }
  return user;
}

function userLogin() {
  var email = document.getElementById("emailInput").value;
  var pwd = document.getElementById("pwd").value;
  var T = JSON.parse(localStorage.getItem("users"));
  var user = searchUserByEmail(T, email);
  if (user) {
    localStorage.setItem("userId", JSON.stringify(user.id));
    if (user.userType == "1") {
      location.replace("admin.html");
    } else {
      location.replace("bs.html");
    }
    return user.pwd == pwd;
  }
}

function renderUsers() {
  var T = JSON.parse(localStorage.getItem("users") || "[]");
  var userNbr = T.length;
  if (userNbr > 0) {
    var render = '<table class="table table-striped" id="userTable"> ';
    render +=
      "<thead><tr><th>Id</th><th> First Name</th><th>Last Name</th><th>Email</th><th>Address</th><th>State</th><th>Modifier</th><th>Edit</th></tr></thead>";
    render += "<tbody>";
    for (i = 0; i < userNbr; i++) {
      var user = T[i];
      render +=
        "<tr>" +
        "<td>" +
        user.id +
        "</td> <td>" +
        user.fName +
        "</td><td>" +
        user.lName +
        "</td><td>" +
        user.email +
        "</td><td>" +
        user.address +
        "</td><td>" +
        user.state +
        `</td>
              <td> <button class='btn btn-success' id="btnPresent${user.id}" onclick="present(${user.id}, 0)"> Modifier </button></td>
              <td> <button class='btn btn-danger' id="btnAbscent${user.id}" onclick="present(${user.id}, 1)"> Supprimer </button></td>
              </tr>`;
    }
    render += "</tbody></table>";
    var newTable = document.getElementById("divUserTable");
    newTable.innerHTML = render;
  } else {
    document.getElementById("divUserTable").innerHTML = "Aucun utilisateur";
  }
}

function addProduct() {
  var productCode = document.getElementById("productCode").value;
  if (checkCode(productCode)) {
    document.getElementById("productCodeMsg").innerHTML == "";
  } else {
    document.getElementById("productCodeMsg").innerHTML ==
      "Code must start by #";
  }
  var productName = document.getElementById("productName").value;
  if (verifyLength(productName, 5)) {
    document.getElementById("productNameMsg").innerHTML = "";
  } else {
    document.getElementById("productNameMsg").innerHTML =
      "Product Name must contain 5 characters";
  }
  var price = document.getElementById("price").value;
  if (checkPositif(price)) {
    document.getElementById("priceMsg").innerHTML = "";
  } else {
    document.getElementById("priceMsg").innerHTML =
      "Price must be greater than 0";
  }
  var stock = document.getElementById("stock").value;
  if (checkPositif(stock)) {
    document.getElementById("stockMsg").innerHTML = "";
  } else {
    document.getElementById("stockMsg").innerHTML =
      "Stock must be greater than 0";
  }
  var category = document.getElementById("category");
  var productCategory = category.options[category.selectedIndex].value;

  var idProductLocal = JSON.parse(localStorage.getItem("idP") || "1");

  var product = {
    id: idProductLocal,
    productCode: productCode,
    productName: productName,
    price: price,
    stock: stock,
    productCategory: productCategory,
  };

  if (
    checkPositif(stock) &&
    checkPositif(price) &&
    verifyLength(productName, 5) &&
    checkCode(productCode)
  ) {
    var products = JSON.parse(localStorage.getItem("products") || "[]");
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("idP", idProductLocal + 1);
  }
}

function checkPositif(a) {
  return a > 0;
}

function checkCode(a) {
  return a[0] == "#";
}

function renderProducts() {
  var T = JSON.parse(localStorage.getItem("products") || "[]");
  var productNbr = T.length;
  var key = 'products';
  if (productNbr > 0) {
    var render = '<table class="table table-striped" id="productTable"> ';
    render +=
      "<thead><tr><th>Id</th><th> Product Code</th><th>Product Name</th><th>Stock</th><th>Price</th><th>Category</th><th>Edit</th><th>Delete</th> <th>Display</th></tr></thead>";
    render += "<tbody>";
    for (i = 0; i < productNbr; i++) {
      var product = T[i];
      render +=
        "<tr>" +
        "<td>" +
        product.id +
        "</td> <td>" +
        product.productCode +
        "</td><td>" +
        product.productName +
        "</td><td>" +
        product.stock +
        "</td><td>" +
        product.price +
        "</td><td>" +
        product.productCategory +
        `</td>
              <td> <button class='btn btn-success' onclick='editProduct(${product.id})' > Edit </button></td>
              <td> <button class='btn btn-danger'  onclick='deleteObject(${product.id}, ${JSON.stringify(T)}, "${key}" , "produit")'> Delete </button></td>
              <td> <button class='btn btn-info'  onclick="displayProduct(${product.id})"> Display </button></td>
              </tr>`;
    }
    render += "</tbody></table>";
    var newTable = document.getElementById("divProductTable");
    newTable.innerHTML = render;
  } else {
    document.getElementById("divProductTable").innerHTML = "0 products";
  }
}

function editProduct(id) {
  renderEditForm(id);
}

function renderEditForm(id) {
  var searchedProduct = searchById(id);
  document.getElementById("editForm").innerHTML = `

  <div class="container">
            <div class="form-row">
                <div class="form-group col-md-12">
                    <label for="productName">Product Name</label>
                    <input type="text" class="form-control" id="productNameEdit" value= '${searchedProduct.productName}'>
                    <p id="productNameMsg" class="red"></p>

                </div>
                <div class="form-group col-md-12">
                    <label for="price">Price</label>
                    <input type="number" class="form-control" id="priceEdit" value='${searchedProduct.price}'>
                    <p id="priceMsg" class="red"></p>

                </div>
                <div class="form-group col-md-12">
                    <label for="stock">Stock</label>
                    <input type="number" class="form-control" id="stockEdit" value='${searchedProduct.stock}'>
                    <span id="stockMsg" class="red"></span>
                </div>
            </div>

            <div class="center">
                <button type="submit" class="btn btn-primary" onclick="validateEdit(${searchedProduct.id})">Edit product</button>

            </div>
    </div>
  `;
}

function searchById(id) {
  var T = JSON.parse(localStorage.getItem("products") || "[]");
  var result = T.filter((x) => {
    if (x.id == id) {
      return true;
    }
  });
  return result[0];
}

function validateEdit(id) {
  // search product by ID
  var newPrice = document.getElementById("priceEdit").value;
  var newName = document.getElementById("productNameEdit").value;
  var newStock = document.getElementById("stockEdit").value;
  edit(id, newPrice, newName, newStock);
}

function edit(id, newPrice, newName, newStock) {
  var oldProduct = searchById(id);

  var newProduct = {
    id: oldProduct.id,
    productCode: oldProduct.productCode,
    productName: newName,
    price: newPrice,
    stock: newStock,
    productCategory: oldProduct.productCategory,
  };

  // Reomve old product
  var products = JSON.parse(localStorage.getItem("products") || "[]");
  var index = searchIndex(id, products);

  // delete product
  products.splice(index, 1);
  // insert product
  products.splice(index, 0, newProduct);
  localStorage.setItem("products", JSON.stringify(products));
  location.reload();
}

function searchIndex(id, products) {
  var index;
  for (var i = 0; i < products.length; i++) {
    if (products[i].id == id) {
      index = i;
    }
  }
  return index;
}

function displayProduct(id) {
  var searchedProduct = searchById(id);
  localStorage.setItem("searchedProduct", JSON.stringify(searchedProduct));
  location.replace("product.html");
}

function addComment() {
  var body = document.getElementById("commentBody").value;
  var idC = JSON.parse(localStorage.getItem("idC") || "1");
  var idP = JSON.parse(localStorage.getItem("searchedProduct")).id;
  var comment = {
    id: idC,
    body: body,
    idP: idP,
    dateComment: new Date(Date.now()),
  };
  var comments = JSON.parse(localStorage.getItem("comments") || "[]");
  comments.push(comment);
  localStorage.setItem("comments", JSON.stringify(comments));
  localStorage.setItem("idC", idC + 1);
  displayComments(comments, idP);
  // location.reload();
}

function renderComments(T, idP) {
  var comments = T.filter((data) => {
    if (data.idP == idP) {
      return true;
    }
  });
  return comments;
}

function displayComments(T, idP) {
  var comments = renderComments(T, idP);
  var render = `
  <div class="row" >
        <div class="panel panel-default widget col-md-12">
            <div class="panel-body col-md-12">
                <ul class="list-group">`;
  for (var i = 0; i < comments.length; i++) {
    var c = comments[i];
    render +=
      `<li class="list-group-item" >
                        <div class="row">
                            <div class="col-xs-4 col-md-3">
                                <img src="http://placehold.it/80" class="rounded" alt="" /></div>
                            <div class="col-xs-8 col-md-9">
                                <div>
                                    <a>
                                        ` +
      c.body +
      `</a>
                                    <div class="mic-info">
                                        By: <a href="#">Bhaumik Patel</a> ` +
      c.dateComment.substring(0, 10) +
      `</div>
                                </div>
                            </div>
                        </div>
                    </li>`;
  }
  render += `</ul></div></div></div>`;
  document.getElementById("commentList").innerHTML = render;
}

function getDate(ch) {
  var x = "";
  for (var i = 0; i < 10; i++) {
    x = x + ch[i];
  }
  return x;
}

function renderUserProducts() {
  var products = JSON.parse(localStorage.getItem("products") || "[]");
  var productsLength = products.length;
  var render = "";
  for (var i = 0; i < productsLength; i++) {
    var p = products[i];
    render +=
      `
              <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                <img src='images/shop.png' height='250px' >
                    <div class="card-body">
                    <p class="card-text">` +
      p.productName +
      `</p><p class="card-text">Price: ` +
      p.price +
      `<p class="card-text" id="disponibility"> Stock : ` +
      p.stock +
      `</p><div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <button type="button" class="btn btn-success" onclick="displayProduct(${p.id})">View</button>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop" onclick="passCommand(${p.id})" >
                          Reserve
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
  }

  document.getElementById("productsUserList").innerHTML = render;
}

function passCommand(id) {
  var pr = searchById(id);
  localStorage.setItem("searchedProduct", JSON.stringify(pr));
}

function validateCommand() {
  var qty = document.getElementById("qty").value;
  var pr = JSON.parse(localStorage.getItem("searchedProduct"));
  var idCmd = JSON.parse(localStorage.getItem("idCmd") || "1");
  var userId = JSON.parse(localStorage.getItem("userId"));
  if (checkPositif(qty) && Number(qty) <= pr.stock) {
    edit(pr.id, pr.price, pr.productName, pr.stock - Number(qty));
    var command = {
      id: idCmd,
      idP: pr.id,
      qty: qty,
      idU: userId,
      commandPrice: pr.price,
      commandDate: new Date(Date.now())
    };
    var commandList = JSON.parse(localStorage.getItem("commandList") || "[]");
    commandList.push(command);
    localStorage.setItem("commandList", JSON.stringify(commandList));
    localStorage.setItem("idCmd", idCmd + 1);
  } else {
    alert("Qty is greater than Stock !!");
  }
}

function myCommands(idU) {
  var allCommands = JSON.parse(localStorage.getItem("commandList") || "[]");
  var myCommands = Array();
  for (var i = 0; i < allCommands.length; i++) {
    if (allCommands[i].idU == idU) {
      myCommands.push(allCommands[i]);
    }
  }
  return myCommands;
}

function goToCommands() {
  location.replace("userCommands.html");
}

function renderCommands(T, divId) {
  
  var commandNbr = T.length;
  if (commandNbr > 0) {
    var render = '<table class="table table-striped" id="commandTable"> ';
    render +=
      "<thead><tr><th>Command qty</th><th>Unit Price</th><th>Date </th><th>Price HT</th><th>Price TTC</th><th>Delete</th></tr></thead>";
    render += "<tbody>";
    var key = 'commandList';
    for (i = 0; i < commandNbr; i++) {
      var command = T[i];
      render +=
        "<tr>" +
        "<td>" +
        command.qty +
        "</td> <td>" +
        command.commandPrice +
        "</td><td>" +
        command.commandDate.substring(0,10) +
        "</td><td>" +
        priceHT(command.qty,command.commandPrice) +
        "</td><td>" +
        priceTTC(command.qty, command.commandPrice, 19) +
        `</td>
                <td> <button class='btn btn-danger'  onclick='deleteObject(${command.id}, ${JSON.stringify(T)}, "${key}" , "commande")'> Delete </button></td>
                </tr>`;
    }
    render += "</tbody></table>";
    var newTable = document.getElementById(divId);
    newTable.innerHTML = render;
  } else {
    document.getElementById(divId).innerHTML = "0 commands";
  }
}


function priceHT(qty, price) {
  return qty * price;
}

function priceTTC(qty, price, TVA) {
  return qty * price + (qty * price * TVA)/100;
}

function deleteObject(id, T, key, msg) {
  alert("Vous êtes sur de supprimer le(a) "+ msg + " ?");
  var index = searchIndex(id, T);
  T.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(T));
  location.reload();
}

function searchCommand() {
  var searchCommandByDate = document.getElementById('searchCommandByDate').value;
  var searchCommandByEmail = document.getElementById('searchCommandByEmail').value;

  var allCommands = JSON.parse(localStorage.getItem('commandList') || '[]');
  var allUsers = JSON.parse(localStorage.getItem('users') || '[]');
  var user = searchUserByEmail(allUsers, searchCommandByEmail)
  var searchedCommands = allCommands.filter(data => 
    {
      if (data.idU == user.id && data.commandDate.substring(0,10) == searchCommandByDate) {
        return true;
      }
    });
    renderSearchedCommands(searchedCommands);
}

function renderSearchedCommands(T) {
  var commandNbr = T.length;
  if (commandNbr > 0) {
    var render = '<table class="table table-striped" id="commandTable"> ';
    render +=
      "<thead><tr><th>Command qty</th><th>Unit Price</th><th>Date </th><th>Price HT</th><th>Price TTC</th><th>Delete</th><th>Generate</th></tr></thead>";
    render += "<tbody>";
    var key = 'commandList';
    for (i = 0; i < commandNbr; i++) {
      var command = T[i];
      render +=
        "<tr>" +
        "<td>" +
        command.qty +
        "</td> <td>" +
        command.commandPrice +
        "</td><td>" +
        command.commandDate.substring(0,10) +
        "</td><td>" +
        priceHT(command.qty,command.commandPrice) +
        "</td><td>" +
        priceTTC(command.qty, command.commandPrice, 19) +
        `</td>
                <td> <button class='btn btn-danger'  onclick='deleteObject(${command.id}, ${JSON.stringify(T)}, "${key}" , "commande")'> Delete </button></td>
                <td> <button class='btn btn-success'  onclick='generate(${command.id})'> Generate </button></td>

                </tr>`;
    }
    render += "</tbody></table>";
    var newTable = document.getElementById('divSearchedTable');
    newTable.innerHTML = render;
  } else {
    document.getElementById('divSearchedTable').innerHTML = "0 commands";
  }
}

function searchCommandById(id) {
  var T = JSON.parse(localStorage.getItem('commandList'));
  var searchedCommand = T.filter( data => {
    if (data.id == id) {
      return true;
    }
  });
  return searchedCommand[0] ;
}
function generate(id) {
  // search command
  var searchCmd = searchCommandById(id);
  // set in LS after navigation
  localStorage.setItem('searchedCmd',  JSON.stringify(searchCmd));
  
  location.replace('invoice.html');
  // get attributes
}

function calculateInvoice() {
  
  var cmd = JSON.parse(localStorage.getItem('searchedCmd'));
  document.getElementById(`cmdDate${cmd.id}`).innerHTML = cmd.commandDate;
  document.getElementById('cmdQty').innerHTML = cmd.qty;
  document.getElementById('cmdUnitPriceHT').innerHTML = cmd.commandPrice;
  document.getElementById('cmdUnitPriceTTC').innerHTML = Number(cmd.commandPrice) * 1.19;
  document.getElementById('totalTTC').innerHTML = Number(cmd.commandPrice) * 1.19 * Number(cmd.qty);
}

