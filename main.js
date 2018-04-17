const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index,timestamp,data,previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data).toString());
    }
}



class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0,"01/01/2018","Genesis block","0");
    }

    getLatesBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatesBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}



let herikleCoin = new Blockchain();
herikleCoin.addBlock(new Block(1,"17/04/2018",{amount:4}));
herikleCoin.addBlock(new Block(2,"15/04/2018",{amount:10}));
herikleCoin.addBlock(new Block(3,"11/04/2018",{amount:17}));

console.log(JSON.stringify(herikleCoin,null,4));