const SHA256 = require('crypto-js/sha256');
const cryp = require('crypto');

class Block{
    constructor(index,timestamp,data,previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + this.nonce + JSON.stringify(this.data)).toString();
    }

    mineBlock(difficulty){
        let dif = this.generateDif(difficulty);
        while(this.hash.substring(0, difficulty*2) !== dif){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: "+this.hash);
    }

    generateDif(difficulty){
        let chars = cryp.randomBytes(difficulty).toString('hex');
        return chars;
    }
}



class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }

    createGenesisBlock(){
        return new Block(0,Date.now,"Genesis block","0");
    }

    getLatesBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatesBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1;i< this.chain.length;i++){
            const currentBlock = this.chain[i];
            const previousHash = this.chain[i-1];

            if(currentBlock.hash !==currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousHash.hash){
                return false;
            }
        }

        return true;
    }
}



let herikleCoin = new Blockchain();
console.log("------ START MINING ------");
for(let i = 1;i<=10;i++){
    console.log('Mining block '+i+'...');
    herikleCoin.addBlock(new Block(i,Date.now,{amount:i}));
}


console.log(JSON.stringify(herikleCoin,null,4));

