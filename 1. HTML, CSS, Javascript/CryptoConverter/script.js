const inpVal = document.getElementById("inputCrypto");
const outVal = document.getElementById("outputCrypto");
const inpAmount = document.getElementById("inputAmount");
const outAmount = document.getElementById("outputAmount");

const calcButton = document.getElementById("calcButton");


calcButton.addEventListener("click",convertCrypto);

function convertCrypto(){
    let inpCrypto = inpVal.value;
    let outCrypto = outVal.value;

    let inpAmt = inpAmount.value;
    if(inpCrypto=="")
        alert("Select input currency.");
    else if(outCrypto=="")
        alert("Select output currency.");
    else if(inpAmt=="")
        alert("Enter input amount.");
    else if(isNaN(inpAmt))
        alert("Enter valid input amount.");
    else{
        if(inpCrypto!="" && outCrypto !=""){
            const xhr = new XMLHttpRequest();
            let inpData;
            xhr.open("GET",`https://api.blockchain.com/v3/exchange/tickers/${inpCrypto}-USD`,false);
            xhr.onload = function(){
                if(this.readyState==4 && this.status==200)
                    inpData = JSON.parse(this.responseText);
            }
            xhr.send();

            let outData;
            xhr.open("GET",`https://api.blockchain.com/v3/exchange/tickers/${outCrypto}-USD`,false);
            xhr.onload = function(){
                if(this.readyState==4 && this.status==200)
                    outData = JSON.parse(this.responseText);
            }
            xhr.send();
            let c1ToUsd = inpData.last_trade_price;
            let c2ToUsd = outData.last_trade_price;

            document.getElementById("c1").innerText = document.getElementById(inpCrypto).innerText + `(${inpCrypto})`;
            document.getElementById("c2").innerText = document.getElementById(outCrypto).innerText + `(${outCrypto})`;
            document.getElementById("c1Usd").value = c1ToUsd;
            document.getElementById("c2Usd").value = c2ToUsd;

            document.getElementById("c1Inr").value = c1ToUsd * 73;
            document.getElementById("c2Inr").value = c2ToUsd * 73;
            let outAmt = (inpAmt * c1ToUsd ) / c2ToUsd;
            outAmount.value = outAmt;
        }
    }
}



    // xhr.open("GET", "https://pro-api.coinmarketcap.com/v1/tools/price-conversion");
    // xhr.open("GET","GET https://api.coinbase.com/v2/exchange-rates");
    // xhr.open("GET","https://blockchain.info/ticker");
    // xhr.open("GET","https://api.coinbase.com/v2/exchange-rates?currency=BCH");