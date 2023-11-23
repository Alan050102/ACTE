//https://www.youtube.com/watch?v=1W9FGHio7yQ
const sha256 = require('crypto-js/sha256');// El algoritmo que se usará para cifrar nuestros datos

class Blockchain{
    constructor(){
        this.difficulty = 2;
        this.chain = [this.createGenesisBlock()];
    }
    //Crea el primer bloque de la cadena
    createGenesisBlock(){ 
        return new Block('','Primer bloque, favor de ignorar',new Date(),this.difficulty);
    }
    //Función para añadir bloques
    addNewBlock(transactions){ 
        const block = new Block(this.chain[this.chain.length-1].hash,transactions, new Date(),this.difficulty) //Añadir bloque
        this.chain.push(block)
    }
    //Valida que el blockchain está bien 
    validateChain(){
        for(let block of this.chain){
            const data = block.nonce + block.previousBlock + block.transactions + block.timeStamp
            const hash = sha256(data).toString();
        if(block.hash != hash){
            console.log("ERROR: El bloque ha sido modificado");
            return false;
        }
    }
    }
    //Esto se tiene que mostrar en el sitio web, imprime el último bloque
    printLastBlock(){
        return {
            hash: this.chain[this.chain.length-1].hash,
            transaction: this.chain[this.chain.length-1].transactions
        };
    }

}

class Block{
    constructor(previousBlock,transactions,timeStamp,difficulty){
        this.previousBlock = previousBlock; //hash del bloque anterior
        this.transactions = transactions; //datos del bloque
        this.timeStamp = timeStamp;  //firma, momento en que se añadió el bloque
        this.difficulty = difficulty; //Qué tan dificil es hacer el bloque (las blockchain serias son díficiles) (n. de ceros con los que empieza)
        this.hash = ''; //hash de este bloque
        this.nonce = this.createHash() //Número que se usa para crear hash seguro

    }

    createHash(){
        let nonce = 0;
        const targetZeros = '0'.repeat(this.difficulty) //Devuelve ceros dependiendo la dificultad
        while(true){
            const data = nonce + this.previousBlock + this.transactions + this.timeStamp
            const hash = sha256(data).toString();
            if(hash.startsWith(targetZeros)){ //Iterar hasta que el hash empiece con los ceros requeridos
                this.hash = hash;
                break;
            }
            nonce++;
        }
        return nonce;
    }
}

//const block =  new Block('block anterior','transacciones',new Date(),3); //Bloque de ejemplo
const blockchain = new Blockchain()
//-------------DE AQUI ABAJO TODOS SON EJEMPLOS, SE PUEDEN BORRAR---------------//
//console.log(blockchain);
blockchain.addNewBlock('Hola, yo soy un bloque'); //Añadir bloques
blockchain.addNewBlock('Hola, yo soy otro bloque'); //Añadir bloques
blockchain.addNewBlock('Hola soy el 3er bloque');
const cadena = "pepe consiguió laptop";
blockchain.addNewBlock(cadena);
//console.log(blockchain);

//ver bloques:
blockchain.validateChain();
blockchain.addNewBlock("XD");

console.log(blockchain)

//1. Archivo para guardar los bloques (roberto, andrea)
//2. Añadir bloques desde html // visualizar bloque en html (whizo,tommy)
//3. Letrero (joss)
//4. Intermediario entre equipo (isaac)
