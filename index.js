import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://cart-5bf59-default-rtdb.firebaseio.com/"
}
const inputElement = document.getElementById("input-field")
const addButton = document.getElementById("add-button")

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database, "items")
const list = document.getElementById("shopping-list")

addButton.addEventListener("click", function() {
    let inputValue = inputElement.value
    push(itemsInDB, inputValue)
    console.log(inputValue, "added to database.")

    // addItem(inputValue)
    clearField()
})

onValue(itemsInDB, function(snapshot){
    if(snapshot.exists()){
        let shoppingItems = Object.entries(snapshot.val())
        clearList()
    
        for(let i = 0; i < shoppingItems.length; i++) {
            let currItem = shoppingItems[i]
    
    
            var currItemID = currItem[0]
            var currItemValue = currItem[1]
            
    
            addItem(currItem)
        }
    }

    else{
        list.innerHTML = "No items yet..."
    }
    // let shoppingItems = Object.entries(snapshot.val())
    // clearList()

    // for(let i = 0; i < shoppingItems.length; i++) {
    //     let currItem = shoppingItems[i]


    //     var currItemID = currItem[0]
    //     var currItemValue = currItem[1]
        

    //     addItem(currItem)
    // }
})

function clearList() {
    list.innerHTML = ""
}

function addItem(currItem) {
    let itemID = currItem[0]
    let itemText = currItem[1]

    let newItem = document.createElement("li")
    newItem.textContent = itemText

    newItem.addEventListener("dblclick", function(){
        let location = ref(database, `items/${itemID}`)
        remove(location)
        // remove(location).then(() => {
        //     // Remove the item from the DOM after it has been removed from the database
        //     newItem.remove();
        // }).catch((error) => {
        //     console.error("Error removing item from database:", error);
        // });

    })

    list.append(newItem)
}

function clearField() {
    inputElement.value = ""
}


