const Transaction = require('./transaction')
const Blockchain = require('./blockchain')
const cryp = require('crypto')

class FakeTransactions{
    constructor(blockchain){
        this.addressess = []
        this.blockchain = blockchain
        for(let i = 0;i<10;i++){
            this.insertAddress()
        }
    }

    
    createFakeTransMining(minings){
        console.log("Start transactions...")
        let transCount = this.getRandomInt(10)+1
        for(let i=0;i<transCount;i++){
            if(this.getRandomInt(100)===1){
                this.insertAddress()
            }
            let from = this.getRandomInt(this.addressess.length)
            let fromAddress = this.addressess[from]
            let to
            do{
                to = this.getRandomInt(this.addressess.length)
            }while(from===to)
            let toAddress = this.addressess[to]
            this.blockchain.createTransaction(new Transaction(fromAddress,toAddress,this.getRandomInt(100)))
        }
        console.log("\nStart mining...")
        let miner = this.addressess[this.getRandomInt(this.addressess.length)]
        console.log('Miner Address: ', miner)
        this.blockchain.minePendingTransactions(miner)
        if(minings>1){
            this.createFakeTransMining(minings-1)
        }
    }


    insertAddress(){
        let address = this.generateRandomAddress()
        if(!this.addressExist(address)){
            this.addressess.push(address)
        }
    }

    addressExist(adr){
        for(const address in this.addressess){
            if(address===adr){
                return true
            }
        }
        return false
    }

    generateRandomAddress(){
        let address = cryp.randomBytes(2).toString('hex')
        return address
    }

    getRandomInt(max){
        return Math.floor(Math.random() * Math.floor(max))
    }
}






module.exports =  FakeTransactions