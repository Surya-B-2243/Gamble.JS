const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;
let count =0;
let tots =0;
const SYMBOLS_COUNTS = {
    A:3,
    B:4,
    C:7,
    D:10}
const SYMBOLS_VALUES= {
    A:5,
    B:4,
    C:3,
    D:2}

const spin =()=>{
    const allSymbols=[];
    for (const[symbol,count] of Object.entries(SYMBOLS_COUNTS)){ //Objet.entries thingy is VERY IMPORTANT.and DONOT forget the 'OF' used in forloop.
        for (let i=0;i<count;i++){
            allSymbols.push(symbol);
        }
    }
    const reels = [];
    for (let i =0;i<COLS;i++){
        reels.push([]);
        const reelSymbols=[...allSymbols]
        for(let j=0;j<ROWS;j++){
            const randomIndex = Math.floor(Math.random()*(reelSymbols.length))
            const randomSymbol = reelSymbols[randomIndex]
            reels[i].push(randomSymbol);
            reelSymbols.splice(randomIndex,1); //splice is fking AWESOME BTW
        }
    }return(reels)
}

const transpose=(reels)=>{
    let transposedReel=[];
    for (let i=0;i<ROWS;i++){
        transposedReel.push([]);
        for(let j=0;j<COLS;j++){
            transposedReel[i].push(reels[j][i]);
        }
    }return(transposedReel)
}

const depo =()=>{
    while(true){
        const dAmount=prompt("Enter deposit amount : ");
        const depositAmount = parseFloat(dAmount);
        if (isNaN(depositAmount) || depositAmount<=0){
            console.log("Not valid amount(u broke ?)")
        }else{
            return(depositAmount);
        }
    };
}
const lines=()=>{
    while(true){
        const betLines= prompt("Enter number of lines to bet on (1-10): ");
        const loones = parseFloat(betLines);
        if (isNaN(loones)||loones<=0||loones>10){
            console.log("dumass")
        }else{
            return(loones);
        }
    };
}
const bet=(dep,lines)=>{;
    while(true){
        const possibleAmount = Math.trunc(dep/lines);
        const bot = prompt("Enter amount to bet (1 to " +possibleAmount+"): ");
        const bet = parseFloat(bot);
        if (isNaN(bet)||bet<=0||bot>(possibleAmount)){
            console.log("dumass")
        }else{
            const bett =[bet,(dep-(bet*lines))]
            return(bett);
        }
    }
}

const check = (theReel) =>{
    let cunt =0
    let lucky=[]
    theReel.forEach(element => {
        const set = new Set(element)
        if (set.size==1){
            count=count+1;
            cunt= cunt+1;
            let val = Array.from(set)[0]
            lucky.push(val)
        }
    });return(lucky)
    }


    //Code starts here:::::::::::::::::::::::::::::::::::::::::::::::::::::::::>


let balance = depo()
console.log(balance)
const game = (balance)=>{
    let linni = lines()
    console.log(linni)
    let bob = bet(balance,linni)
    console.log(`You bet ${bob[0]}$ on each line.\nYour balance is ${bob[1]}$\n.`)
    while(linni-->0){
        let reel = spin()
        tots=0
        // console.log(reel)
        let theReel = transpose(reel)
        console.log(theReel)
        let chek = check(theReel)
        if (chek.length!=0){
            console.log(`Winning values are :${chek}`)
            for (i=0;i<chek.length;i++){
                let sum=0;
                for(const [symbol,value] of Object.entries(SYMBOLS_VALUES)){
                    if(chek[i]==symbol){
                        sum=sum+(bob[0]*value);
                        tots=tots+sum;
                    }
                }
                console.log(`You have won ${sum}$ on this line.`)
            }
        }
        else{
            console.log("LOST\n")
        }
    }
    console.log(`You won a total of ${count} times :)`)
    console.log(`Your total winnings are ${tots}`)
    balance = bob[1]+tots;
    console.log(`You have ${balance}$ left`)
}
while(1==1){
console.log("Would You like to continue ?: Y/N")
const decision= prompt()
if(decision=='y' && balance>0){
    game(balance)
}
else{
    break;
}
}






