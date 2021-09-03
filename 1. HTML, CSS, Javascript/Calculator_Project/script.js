const data = document.getElementById("output");

/**
 * Clear the display
 */
function clearDisplay(){
    data.value="";
}

/**
 * Removes the last character form the value in the display
 */
function backspace(){
    if(data.value != "")
    data.value=data.value.substr(0,(data.value.length - 1));
}

/**
 * Displays the mathematical square root of the value in the display
 */
function sqRoot(){
    data.value = Math.sqrt(data.value);
}

/**
 * Displays the mathematical square of the value in the display
 */
function square(){
    data.value = data.value ** 2;
}

/**
 * Takes a string as input and appends it to the end of the text in the display 
 * @param {String} inp 
 */
function display(inp){
    let lastChar = data.value.charAt(data.value.length-1);
    if(inp=="+"||inp=="-"||inp=="*"||inp=="/"){
        if(lastchar=""||lastChar=="+"||lastChar=="-"||lastChar=="*"||lastChar=="/")
            data.value = data.value.substr(0,(data.value.length - 1)) + inp;
    else if(data.value.length<85)
        data.value+=inp;
    }
    else if(data.value.length<85)
        data.value+=inp;
}

/**
 * Displays the calculated answer on the display screen
 */
function displayAnswer(){
    let ans = eval(data.value);
    if(ans!=undefined)
        data.value = ans;
}

/**
 * Identify the keyboad key pressed based and calling pressButton() to execute onClick event
 * @param {event} e 
 */
document.onkeydown = function(e){
    e = e || window.event;
    switch(e.key){
        case "1":pressButton(e.key);
                break;
        case "2":pressButton(e.key);
                break;
        case "3":pressButton(e.key);
                break;
        case "4":pressButton(e.key);
                break;
        case "5":pressButton(e.key);
                break;
        case "5":pressButton(e.key);
                break;
        case "6":pressButton(e.key);
                break;
        case "7":pressButton(e.key);
                break;
        case "8":pressButton(e.key);
                break;
        case "9":pressButton(e.key);
                break;
        case "0":pressButton(e.key);
                break;
        case ".":pressButton(e.key);
                break;
        case "+":pressButton(e.key);
                break;
        case "-":pressButton(e.key);
                break;
        case "*":pressButton(e.key);
                break;
        case "/":pressButton(e.key);
                break;
        case "Enter":pressButton(e.key);
                    break;
        case "Backspace":pressButton(e.key);
                break;
    }
}

/**
 * Triggers onClick of a button by passing the keyboard key code
 * @param {String} key 
 */
function pressButton(key){
    let buttonId = "button"+key;
    let button = document.getElementById(buttonId);
    button.click();
}