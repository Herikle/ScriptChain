const SHA256 = require('crypto-js/sha256')
const cryp = require('crypto')

class Block{
    constructor(timestamp,transactions,previousHash = ''){
        this.timestamp = timestamp
        this.transactions = transactions
        this.previousHash = previousHash
        this.hash = this.calculateHash()
        this.nonce = 0
    }

    calculateHash(){
        return SHA256(this.previousHash + this.timestamp + this.nonce + JSON.stringify(this.data)).toString()
    }

    mineBlock(difficulty){
        let dif = this.generateDif(difficulty)
        while(this.hash.substring(0, difficulty) !== dif){
            this.nonce++
            this.hash = this.calculateHash()
        }
        console.log("Block mined: "+this.hash)
    }

    generateDif(difficulty){
        let chars = cryp.randomBytes(difficulty).toString('hex')
        let initial = chars.substring(0,difficulty);
        return initial
    }
}

module.exports = Block