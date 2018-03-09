// Initialize Firebase
var config = {
    apiKey: "AIzaSyD2TjjAKc2NgOwVyz2tw5tDb5ZtkQ5Qxak",
    authDomain: "fastfoodapp-61e9d.firebaseapp.com",
    databaseURL: "https://fastfoodapp-61e9d.firebaseio.com",
    projectId: "fastfoodapp-61e9d",
    storageBucket: "fastfoodapp-61e9d.appspot.com",
    messagingSenderId: "272764634227"
};
firebase.initializeApp(config);


//leer valores
var getDishes = function () {
    var query = database.ref('food/');
    query.on('value', function (snapshot) {
        var ul = document.getElementById("listDishes");
        snapshot.forEach(function (childSnapshot) {
            console.log(childSnapshot.key);
            console.log(childSnapshot.val());

            var childkey = childSnapshot.key;
            var childData = childSnapshot.val();

            var li = document.createElement("li");
            var div = document.createElement("div");
            var img = document.createElement("img");
            var br = document.createElement("br");
            var button = document.createElement("button");

            button.setAttribute("id", childkey);
            button.setAttribute("class", "btn btn-danger")
            button.setAttribute("onclick", "deleteDish(this.id)");
            button.appendChild(document.createTextNode("Delete dish!"));

            img.src = childData.routeImage;
            img.height = 50;
            img.alt = "Dish image";

            div.appendChild(img);
            div.style.float = "right";
            li.setAttribute("class", "list-group-item")
            li.appendChild(div);
            li.appendChild(document.createTextNode("name: " + childData.name));
            li.appendChild(document.createElement("br"));
            li.appendChild(document.createTextNode("desc: " + childData.desc));
            li.appendChild(document.createElement("br"));
            li.appendChild(document.createTextNode("price: " + childData.price));
            li.appendChild(document.createElement("br"));
            li.appendChild(button);
            ul.appendChild(li);
        })
    })

}

//funcionalidad para guardar la data en firebase (database)
var database = firebase.database();

var saveDish = function (pName, pDesc, pPrice, pImage) {

    database.ref('food/').push(
        {
            name: pName,
            desc: pDesc,
            price: pPrice,
            quantity: 0,
            routeImage: pImage
        }
    ).then( function () {
        alert("added");
        window.location = "addDishes.html";
    }).catch(function (error) {
        console.log("ERROR :: " + error);
    })

}

function sendData(event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var desc = document.getElementById("desc").value;
    var price = document.getElementById("price").value;
    var image = document.getElementById("route").value;
    saveDish(name, desc, price, image);
    return false;
}

//eliminar platillos
var deleteDish = function (id) {
    database.ref('food/'+ id).remove()
        .then(function () {
            console.log("deleted!");
            window.location = "dishesList.html";
        }).catch(function (error) {
            console.log("not deleted!! :: " + error);
    });
}

//funcionalidad para guardar las imagenes en el storage de firebase
var storage = firebase.storage();
var storageRef = storage.ref();

function visualizeImage() {
    var preview = document.querySelector('img');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if(file) {
        reader.readAsDataURL(file);
        var uploadImage = storageRef.child('dishes/' + file.name).put(file);

        uploadImage.on('state_changed', function (snapshot) {
            //cambio en la carga del archivo
        }, function (error) {
                console.log("error loading image :: " + error)
        }, function () {
                console.log(uploadImage.snapshot.downloadURL);
                document.getElementById("route").value = uploadImage.snapshot.downloadURL;
        })
    }else{
        preview.src = "";
    }
}

function visualizeImageDrinks() {
    var preview = document.querySelector('img');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if(file) {
        reader.readAsDataURL(file);
        var uploadImage = storageRef.child('drinks/' + file.name).put(file);

        uploadImage.on('state_changed', function (snapshot) {
            //cambio en la carga del archivo
        }, function (error) {
            console.log("error loading image :: " + error)
        }, function () {
            console.log(uploadImage.snapshot.downloadURL);
            document.getElementById("route").value = uploadImage.snapshot.downloadURL;
        })
    }else{
        preview.src = "";
    }
}
//login
var signIn = function() {

    var email = document.getElementById("mail").value;
    var password = document.getElementById("pass").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function () {
            console.log("Ingreso correcto!");
            window.location = "addDishes.html";
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("ERROR :: " + errorCode + " " + errorMessage);
        });
}

//observer de sesion
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        console.log("user sign in");
    } else {
        // No user is signed in.
        if(window.location.pathname !== '/index.html') {
            window.location = "index.html";
        }
    }
});

//cerrar la sesion
var signOut = function () {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("sesion cerrada!");
    }).catch(function(error) {
        // An error happened.
        console.log(error);
    });
}

function sendDataDrinks(event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var desc = document.getElementById("desc").value;
    var price = document.getElementById("price").value;
    var image = document.getElementById("route").value;
    saveDrink(name, desc, price, image);
    return false;
}

var saveDrink = function (pName, pDesc, pPrice, pImage) {

    database.ref('drinks/').push(
        {
            name: pName,
            desc: pDesc,
            price: pPrice,
            quantity: 0,
            routeImage: pImage
        }
    ).then( function () {
        alert("added");
        window.location = "addDrinks.html";
    }).catch(function (error) {
        console.log("ERROR :: " + error);
    })

}

//leer valores
var getDrinks = function () {
    var query = database.ref('drinks/');
    query.on('value', function (snapshot) {
        var ul = document.getElementById("listDrinks");
        snapshot.forEach(function (childSnapshot) {
            console.log(childSnapshot.key);
            console.log(childSnapshot.val());

            var childkey = childSnapshot.key;
            var childData = childSnapshot.val();

            var li = document.createElement("li");
            var div = document.createElement("div");
            var img = document.createElement("img");
            var br = document.createElement("br");
            var button = document.createElement("button");

            button.setAttribute("id", childkey);
            button.setAttribute("class", "btn btn-danger")
            button.setAttribute("onclick", "deleteDrink(this.id)");
            button.appendChild(document.createTextNode("Delete dish!"));

            img.src = childData.routeImage;
            img.height = 50;
            img.alt = "Drink image";

            div.appendChild(img);
            div.style.float = "right";
            li.setAttribute("class", "list-group-item")
            li.appendChild(div);
            li.appendChild(document.createTextNode("name: " + childData.name));
            li.appendChild(document.createElement("br"));
            li.appendChild(document.createTextNode("desc: " + childData.desc));
            li.appendChild(document.createElement("br"));
            li.appendChild(document.createTextNode("price: " + childData.price));
            li.appendChild(document.createElement("br"));
            li.appendChild(button);
            ul.appendChild(li);
        })
    })

}

//eliminar bebidas
var deleteDrink = function (id) {
    database.ref('drinks/'+ id).remove()
        .then(function () {
            console.log("deleted!");
            window.location = "drinksList.html";
        }).catch(function (error) {
        console.log("not deleted!! :: " + error);
    });
}