var nombreP = document.getElementById('nombre');
var precioP = document.getElementById('precio');
var stockP = document.getElementById('stock');
var detalleP = document.getElementById('detalle');
var imagen = document.getElementById('imagen');
var formulario = document.querySelector('#formulario');

var productos = [];
var usuarios = [];
var products = document.getElementById('products')
var users = document.getElementById('usersIn')
var sales = document.getElementById('salesIn')
var sell = []
var compras

window.addEventListener('load', () => {

    productos = JSON.parse(localStorage.getItem('products'));
    usuarios = JSON.parse(localStorage.getItem('usuarios'));
    sell = JSON.parse(localStorage.getItem('sells'));

    //console.log(sell);

    if (productos.length == 0) {
        productos = [];
        //console.log("productos.length = 0");
        products.innerHTML = "No hay productos que mostrar";
        renderData();
    }
    if (usuarios == null) {
        usuarios = [];
        users.innerHTML = "No hay usuarios"
    }
    if (sell == null) {
        sell = [];
        users.innerHTML = "No hay ventas"
    }

    productos.forEach(info => {
        products.innerHTML += `
            <div class="image-block" id="card">
            <img src="${info.image}" alt="" />
            <div id="botton">
            <p>ID: ${info.id}</p>
            <h3>${info.name}</h3>
            <h3>$ ${info.price}</h3>
                <h3>Stock ${info.stock}</h3>
                <button id="${info.id}" onclick="removeProduct(${info.id})">Eliminar</button>
            </div>
            </div>`
    })

    usuarios.slice(1).forEach(user => {
        users.innerHTML += `
                <tr>
                <td>${user.name + " " + user.lastName}</td>
                <td>${user.tel}</td>
                <td>${user.email}</td>
                <td>${atob(user.password)}</td>
                <td class="delete"><a onclick='return removeUser("${user.email}")' class="button">borrar</a></td>
                </tr>`
    });


    sell.forEach(orders => {
        sales.innerHTML += `
        <tr>
        <td>${orders.user}</td>
        <td>${displaysells(orders.prodcutos)}</td>
        <td>${orders.total}</td>
        </tr>`
    })



})

/*window.addEventListener('load', ()=> {
    

})*/
const renderData = () => {
    products.innerHTML = "";
    JSON.parse(localStorage.getItem("products")).forEach(info => {
        products.innerHTML += `
    <div class="image-block" id="card">
    <img src="${info.image}" alt="" />
    <div id="botton">
    <p>ID: ${info.id}</p>
    <h3>${info.name}</h3>
    <h3>$ ${info.price}</h3>
        <h3>Stock ${info.stock}</h3>
        <button id="${info.id}" onclick="removeProduct(${info.id})">Eliminar</button>
    </div>
    </div>`})
}
const renderUsers = () => {
    users.innerHTML = "";
    JSON.parse(localStorage.getItem("usuarios")).slice(1).forEach(user => {
        users.innerHTML += `
        <tr>
        <td>${user.name + " " + user.lastName}</td>
        <td>${user.tel}</td>
        <td>${user.email}</td>
        <td>${atob(user.password)}</td>
        <td class="delete"><a onclick='return removeUser("${user.email}")' class="button">borrar</a></td>
        </tr>`
    });
}

function obtImg() {

    var file = document.querySelector('input[type=file]').files[0];
    var leer = new FileReader();
    leer.readAsDataURL(file);

    leer.addEventListener('load', () => { localStorage.setItem('imgTemp', leer.result) })
}

function GetId() {
    let uniq = (new Date()).getTime();
    return uniq
}

function agregarProducto() {

    var objeto = {
        id: GetId(),
        nombre: nombreP.value,
        precio: precioP.value,
        stock: stockP.value,
        detalle: detalleP.value,
        imagen: localStorage.getItem('imgTemp')

    }

    localStorage.removeItem('imgTemp');
    productos.push(objeto);

    localStorage.setItem('productos', JSON.stringify(productos))
    alert('Se registro ' + nombreP.value)


    nombreP.value = "";
    precioP.value = "";
    stockP.value = "";
    detalleP.value = "";
    imagen.value = "";
    location.reload()


}
function mostrarFormulario() {

    formulario.style.display = 'block'
    formulario.classList.add('z-index')

}
function mostrarFormularioUsuario(){
 location.replace('registro.html')

}
function quitarFormulario() {
    formulario.style.display = 'none';

}

//products
function removeProduct(ID) {
    let productsLS = JSON.parse(localStorage.getItem("products"));

    let found = productsLS.find(x => x.id == ID)

    const index = productsLS.indexOf(found);
    if (index > - 1) {
        productsLS.splice(index, 1);
    }

    localStorage.setItem("products", JSON.stringify(productsLS));

    renderData();
}

function removeUser(mail) {
    let usersLS = JSON.parse(localStorage.getItem("usuarios"));

    let found = usersLS.find(x => x.email == mail)

    const index = usersLS.indexOf(found);
    if (index > - 1) {
        usersLS.splice(index, 1);
    }

    localStorage.setItem("usuarios", JSON.stringify(usersLS));

    renderUsers();
}

//sells
function displaysells(orders) {
    let ids = orders.map(x => x.id)
    console.log(orders);

    let name = ''
    for (let i = 0; i < ids.length; i++) {
        compra = productos.filter(productos => productos.id === ids[i]);
        name += compra[0].name +" cantidad "+ orders[i].stock + "<br>";
    }
   
   return name
}
