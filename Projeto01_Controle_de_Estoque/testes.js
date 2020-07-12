const readline = require('readline');


const reader = readline.createInterface({
    input : process.stdin,
    output : process.stdout 
 });

function makeAQuestion(question) {
    return new Promise(resolve => reader.question(question, answ => resolve(answ)));
}


async function getQuestionResponse(question){
    return await makeAQuestion(question);
}

async function main() {
    let stock = [];

    console.log(await getQuestionResponse("Produto: "));
    console.log(await getQuestionResponse("Quantidade: "));
    console.log("teste");
}

main();
