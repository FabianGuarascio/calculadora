class Calculator {
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement=previousOperandTextElement;
        this.currentOperandTextElement=currentOperandTextElement;
        this.clear()
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

    appendNumber(number){
        if(this.postEqual){
            this.currentOperand=""
            this.postEqual=false
        }
        if(number === "." && this.currentOperand.includes(".")) return;
        keySound.play()
        
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
        keySound.play()

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
    updateDisplay(){
        this.currentOperandTextElement.innerText= this.currentOperand;
        if(this.operation != null){
            
            this.previousOperandTextElement.innerText= this.previousOperand +" " + this.operation;
        }else {
            this.previousOperandTextElement.innerText= "";
            
        }
    }
}

const d= document;
const numberButtons= d.querySelectorAll('[data-number]') 
const operationButtons= d.querySelectorAll('[data-operation]')
const equalsButton= d.querySelector('[data-equals]')
const deleteButton= d.querySelector('[data-delete]')
const previousOperandTextElement= d.querySelector('[data-previous-operand]')
const currentOperandTextElement= d.querySelector('[data-current-operand]')
const allClear= d.querySelector('[data-all-clear]')
const keys =['0','1','2','3','4','5','6','7','8','9','.']
const operationKeys=["*","+","-","/"]

var keySound;


function preload(){
    keySound = loadSound("singleKey.wav")
}

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