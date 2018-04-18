const Transaction = require('./transaction')
const Blockchain = require('./blockchain')
const FakeTransactions = require('./faketransactions')


let herikleCoin = new Blockchain()

let fake = new FakeTransactions(herikleCoin)

fake.createFakeTransMining(20) //Fake miners count

console.log(JSON.stringify(herikleCoin,null,4));

