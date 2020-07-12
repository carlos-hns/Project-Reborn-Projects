const readline = require('readline');

// Reader/Questions functions

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function makeAQuestion(question) {
    return new Promise(resolve => reader.question(question, answ => resolve(answ)));
}


async function getQuestionResponse(question){
    return await makeAQuestion(question);
}


// Stock Functions

const stock = [];

function registerProduct(productToRegister) {

    let isUpdatedQuantity = false;

    stock.forEach((productInStock) => {
        if (productInStock['name'] == productToRegister['name']){
            productInStock['quantity'] += productToRegister['quantity'];
            isUpdatedQuantity = true;
        }
    });

    if (!isUpdatedQuantity) stock.push(productToRegister);
}

function deleteProduct(id) {

    if (id == 0) return;

    stock.forEach((productInStock) => {
        if (productInStock['id'] == id){
            stock.splice(stock.indexOf(productInStock), 1);
        }
    });
}

function updateProduct(id) {

}

function showProducts() {
    console.log("-=-=-=-=-=- Listando Itens -=-=-=-=-=-");
    stock.forEach(element => {
        console.log("------------");
        console.log(`Product Id: ${element['id']}`);
        console.log(`Product Name: ${element['name']}`);
        console.log(`Product Quantity: ${element['quantity']}`);
        console.log(`Product Description: ${element['description']}`);
        console.log("------------");
    });
}


async function main() {

    while(true){
        console.log("-=-=-=-=-=- MENU -=-=-=-=-=-");
        console.log("1 - Register a Product");
        console.log("2 - Remove a Product");
        console.log("3 - Edit a Product");
        console.log("4 - Show all Products");
        let optionSelected = await getQuestionResponse('>>> ');

        switch(parseInt(optionSelected)){
            case 1:
                let name = await getQuestionResponse('Product name: ');
                let quantity = parseInt(await getQuestionResponse('Quantity: '));
                let description = await getQuestionResponse('Small Description: ');
                
                registerProduct({
                    id: stock.length + 1,
                    name,
                    quantity,
                    description
                });
                break;
            case 2:
                showProducts();
                console.log("If you press 0, you will cancel the delete action!");
                let idToBeExcluded = parseInt(await getQuestionResponse('Product Id: '));
                deleteProduct(idToBeExcluded);
                break;
            case 3:

            default:
                break;
        }
    }
}

main();