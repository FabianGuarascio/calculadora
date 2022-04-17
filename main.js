class Calculator {
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement=previousOperandTextElement;
        this.currentOperandTextElement=currentOperandTextElement;
        this.clear()
        this.sound=true
    }
    clear(){
        this.previousOperand="";
        this.currentOperand="";
        this.operation="";
        this.postEqual=false
    }
    equalOperation(){
        this.postEqual=true;
    }
    soundOn(a){
        if (this.sound){
            a.play()
        }
    }
    appendNumber(number){
        if(this.postEqual){
            this.currentOperand=""
            this.postEqual=false
        }
        if((number === "." && this.currentOperand.includes("."))||this.currentOperand.length>=16 ) return;
        this.soundOn(keySound)
        this.currentOperand+= number;
    }
    delete(){
        this.currentOperand= this.currentOperand.toString().slice(0,-1);
    }
    chooseOperation(operation){
        if(this.currentOperand === "")return
        if(this.previousOperand !== ""){
            this.compute()
        }
        this.soundOn(keySound)
        this.operation=operation;
        this.previousOperand=this.currentOperand;
        this.currentOperand=""
    }
    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev)|| isNaN(current))return;
        
        switch(this.operation){
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '*':
                computation = prev * current;
                break;
            default:
                return;
        }
        this.previousOperand="";
        this.currentOperand=computation;
        this.operation= undefined;
    }
    getDisplayNumber(number){
        let stringNumber= number.toString();
        let integerDigits= parseFloat(stringNumber.split(".")[0]);
        let decimalDigits= stringNumber.split(".")[1];
        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay=""
        }else{
            integerDisplay=integerDigits.toLocaleString("en",{maximumFractionDigits:0})
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }

    
    updateDisplay(){
        this.currentOperandTextElement.innerText= this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.previousOperandTextElement.innerText= this.getDisplayNumber(this.previousOperand) +" " + this.operation;
        }else {
            this.previousOperandTextElement.innerText= "";
        }
    }
}

const d= document;
const $sound= d.getElementById('sound');
const numberButtons= d.querySelectorAll('[data-number]') 
const operationButtons= d.querySelectorAll('[data-operation]')
const equalsButton= d.querySelector('[data-equals]')
const deleteButton= d.querySelector('[data-delete]')
const previousOperandTextElement= d.querySelector('[data-previous-operand]')
const currentOperandTextElement= d.querySelector('[data-current-operand]')
const allClear= d.querySelector('[data-all-clear]')
const keys =['0','1','2','3','4','5','6','7','8','9','.']
const operationKeys=["*","+","-","/"]
let $i = d.querySelector("i")
let icon =d.querySelector(".fa-volume-up")
let $body= d.querySelector('body')


var keySound;

function preload(){
    keySound = loadSound("singleKey.wav")
}
// setup is necesary for the sound effect of p5.js library to work.Even if it is empty.
function setup(){
    
}
const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach(button=>{
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

deleteButton.addEventListener('click', ()=>{
    calculator.delete();
    calculator.updateDisplay();
})

allClear.addEventListener('click',()=>{
    calculator.clear();
    calculator.updateDisplay();
})

operationButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click',()=>{
    calculator.compute()
    calculator.equalOperation()
    calculator.updateDisplay()
})

keys.forEach(key=>{
    d.addEventListener('keydown',function(event){
        if(event.key=== key ){
            calculator.appendNumber(key)
            calculator.updateDisplay()
        }
        
    })
})

operationKeys.forEach(key=>{
    d.addEventListener('keydown',function(event){
        if(event.key=== key ){
            calculator.chooseOperation(key)
            calculator.updateDisplay()
        }
    })
})

d.addEventListener('keydown',function(event){
    if(event.key=== "="|| event.key === 'Enter'){
        calculator.compute()
        calculator.equalOperation()
        calculator.updateDisplay()
    }
    if(event.key==="Backspace"){
        calculator.delete()
        calculator.updateDisplay()
    }
    if(event.key ==="Escape"){
        calculator.clear()
        calculator.updateDisplay()
    }
})

$sound.addEventListener('click',()=>{
    if(icon.classList.contains("fa-volume-up")){
        icon.classList.replace("fa-volume-up","fa-volume-mute")
        }else{
            icon.classList.replace("fa-volume-mute","fa-volume-up")
        }
    calculator.sound= !(calculator.sound);
    console.log(calculator.sound);
})

function cambiarColor(){
    var i = 0;
    console.log(i)
    btnChangeColor.addEventListener('click', ()=>{
    
        if (i==0){
            $body.style.setProperty("--gradient","var(--rojin)")
            i++
            console.log(i + " rojin")
        } else if (i==1){
            $body.style.setProperty("--gradient","var(--verdin)")
            i++
            console.log(i + " verdin")
        }else if(i==2){
            $body.style.setProperty("--gradient","var(--amarillin)")
            i++
            console.log(i + " amarillin")
        } else{
            $body.style.setProperty("--gradient","var(--azulin)")
            i=0
            console.log(i + " azulin")
        }
        
    })
}
cambiarColor()



