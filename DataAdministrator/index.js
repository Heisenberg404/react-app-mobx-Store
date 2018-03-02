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
    )

}

function sendData() {
    var name = document.getElementById("name").value;
    var desc = document.getElementById("desc").value;
    var price = document.getElementById("price").value;
    var image = document.getElementById("route").value;
    try {
        saveDish(name, desc, price, image);
    }catch (error) {
        console.log("no se agrego el platillo!");
    }
}

//eliminar platillos
var deleteDish = function (id) {
    database.ref('food/'+ id).remove()
        .then(function () {
            console.log("deleted!");
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
