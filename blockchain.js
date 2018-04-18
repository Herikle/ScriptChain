const Transaction = require('./transaction')
const Block = require('./block')

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 5
        this.pendingTransactions = []
        this.miningReward = 15
    }

    createGenesisBlock(){
        return new Block(Date.now,[],"0")
    }

    getLatesBlock(){
        return this.chain[this.chain.length -1]
    }

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now, this.pendingTransactions,this.getLatesBlock().hash)
        block.mineBlock(this.difficulty)

        console.log('Block successfully minded:\n')
        this.chain.push(block)

        this.pendingTransactions = [
            new Transaction(null,miningRewardAddress,this.miningReward)
        ]

    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction)
    }

    getBalanceOfAdress(address){
        let balance = 0

        for(const block of this.chain){

            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount
                }
                if(trans.toAddress === address){
                    balance += trans.amount
                }
            }
        }

        return balance
    }

    isChainValid(){
        for(let i = 1;i< this.chain.length;i++){
            const currentBlock = this.chain[i]
            const previousHash = this.chain[i-1]

            if(currentBlock.hash !==currentBlock.calculateHash()){
                return false
            }

            if(currentBlock.previousHash !== previousHash.hash){
                return false
            }
        }

        return true
    }
}

module.exports = Blockchain