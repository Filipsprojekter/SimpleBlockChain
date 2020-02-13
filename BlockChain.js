const sha256 = require('sha256')

class Block {
    constructor(index, timestamp, data, prevHash){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.newHash = sha256(
            this.index + this.timestamp + this.data + this.prevHash
        );
    }
}

const createGenesisBlock = () => new Block(0,Date.now(),'Genesis Block','0');
const nextBlock = (lastBlock, data) => new Block(lastBlock.index+1, Date.now(), data,lastBlock.newHash);

function createBlockChain(amount){
    // Declares an array with the first block as index 0 being the genesis block
    const chain = [createGenesisBlock()]
    // sets the variable previousBlock equal to the genesis block. 
    let previousBlock = chain[0]

    // for-loop to create the amount of blocks defined when calling the function
    for(let i = 1; i < amount; i += 1){
        const nextBlockToAdd = nextBlock(previousBlock,`block number ${i}`);
        chain.push(nextBlockToAdd);
        previousBlock = nextBlockToAdd;
    }
    console.log(chain)
}
  

createBlockChain(10)