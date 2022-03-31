// updateCartTotal();
// var cart = document.getElementById("cart");
var clear = document.getElementById("clear").addEventListener("click", clear)

var add = document.getElementsByClassName("add");
for (let index = 0; index < add.length; index++) {
    add[index].addEventListener("click",
        function () { addToCart(this); }
    )

}

var sibs = [];
var getPrice;
var getProductname;
var cart = [];
var stringCart;

function addToCart(elem) {

    parentDiv = elem.parentElement;
    getProductname = parentDiv.querySelector('.productname').innerText;
    getPrice = parentDiv.querySelector('#price_value').innerText;
    //create product object
    var product = {
        product: getProductname,
        price: getPrice
    }
    //convert product data to JSON for storage
    var stringProduct = JSON.stringify(product)

    /*send product data to session storage */
    if (!sessionStorage.getItem('cart')) {
        // append product Json object to cart array
        cart.push(stringProduct);
        // cart to JSON
        stringCart = JSON.stringify(cart);
        //append product JSON object to cart array
        sessionStorage.setItem('cart', stringCart)
        addedToCart(getProductname);
        updateCartTotal();
    }
    else {
        //get existing cart data
        // from storage and convert back into array
        console.log(sessionStorage.getItem(('cart')))
        cart = JSON.parse(sessionStorage.getItem('cart'))
        // append new product Json object
        cart.push(stringProduct);
        // cart back to JSON
        stringCart = JSON.stringify(cart);
        // overwrite cart data in sessionStorage
        sessionStorage.setItem('cart', stringCart)
        addedToCart(getProductname);
        updateCartTotal();
    }


    //user feedback on successful add
    function addedToCart(pname) {
        var message = pname + " " + "was added to cart"
        // var alert = document.getElementById('alert');
        alert.innerHTML = message
        window. alert(message);
        // if (!alert.classList.contains(message)) {
        //     alert.classList.add("message")
        // }

    }
}

// Update Cart Total
function updateCartTotal() {
    //initialize 
    var total = 0;
    var price = 0;
    var items = 0;
    var productname = "";
    var carttable = "";
    if (sessionStorage.getItem('cart')) {
        //get cart data & parse to array
        var cart = JSON.parse(sessionStorage.getItem('cart'));
        //get no of items in cart 
        items = cart.length;
        //loop over cart array
        for (var i = 0; i < items; i++) {
            //convert each JSON product in array back into object
            var x = JSON.parse(cart[i]);
            console.log(x);
            //get property value of price
            price = parseFloat(x.price);
            productname = x.product;
            //add price to total
            carttable += "<tr><td>" + productname
                + "</td><td>$" + price.toFixed(2) + "</td></tr>";
            total += price;
        }

    }
    //update total on website HTML
    document.getElementById("total").innerHTML =
        total.toFixed(2);
    //insert saved products to cart table
    document.getElementById("carttable").innerHTML =
        carttable;
    //update items in cart on website HTML
    document.getElementById("itemsquantity").innerHTML =
        items;
}

updateCartTotal();

// }
function clear() {
    if (sessionStorage.getItem('cart')) {
        sessionStorage.removeItem('cart');
        updateCartTotal();

        var alerts = document.getElementById("alert");
        alerts.innerhtml = "";
        // if (alerts.classlist.contains("message")) {
        //     sessionStorage.remove("message")
        // }
    }

}

