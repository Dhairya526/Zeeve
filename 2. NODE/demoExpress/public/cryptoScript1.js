function fetchData(){
    const cryptos=["BTC","ETH","DOGE","BCH"];
    const xhr = new XMLHttpRequest();

    for(let c of cryptos){

        xhr.open("GET",`https://api.blockchain.com/v3/exchange/tickers/${c}-USD`,false);

        xhr.onload = ()=>{
            if(this.readyState==4 && this.status==200)
                sessionStorage.setItem(c,this.responseText);
        }
        xhr.send();
    }
}

const inputAmount = document.getElementById("inputAmount");
const outputAmount = document.getElementById("outputAmount");
const inputCrypto = document.getElementById("inputCrypto");
const outputCrypto = document.getElementById("outputCrypto");

inputAmount.addEventListener("input",convertCrypto);

function convertCrypto(){
    let inpAmt = inputAmount.value;
    let inpCrypto = inputCrypto.value;
    let outCrypto = outputCrypto.value;

    if(inpCrypto=="")
        alert("Select input currency.");
    else if(outCrypto=="")
        alert("Select output currency.");
    // else if(inpAmt=="")
    //     alert("Enter input amount.");
    else if(isNaN(inpAmt))
        alert("Enter valid input amount.");
    else{
        if(inpCrypto!="" && outCrypto !=""){
            let c1ToUsd = JSON.parse(sessionStorage.getItem(inpCrypto)).last_trade_price;
            let c2ToUsd = JSON.parse(sessionStorage.getItem(outCrypto)).last_trade_price;

            document.getElementById("c1").innerText = document.getElementById(inpCrypto).innerText + `(${inpCrypto})`;
            document.getElementById("c2").innerText = document.getElementById(outCrypto).innerText + `(${outCrypto})`;

            document.getElementById("c1Usd").value = c1ToUsd;
            document.getElementById("c2Usd").value = c2ToUsd;

            document.getElementById("c1Inr").value = c1ToUsd * 73;
            document.getElementById("c2Inr").value = c2ToUsd * 73;
            let outAmt = (inpAmt * c1ToUsd ) / c2ToUsd;
            outputAmount.value = outAmt;
        }
    }
}