const out1 = document.getElementById("out1");

function clearDisplay(){
    out1.innerText="";
}

function display(inp){
    if(out1.innerText.length<20)
    out1.innerText+=inp;
}

function displayAnswer(){
    let ans = eval(out1.innerText);
    out1.innerText = ans;
}