/* 抓按鈕*/
const number_button = document.querySelectorAll(".number_cal");

// 抓sign
const btn_sign_clr = document.getElementById("btn-clear");
const btn_sign_add = document.getElementById("btn-add");
const btn_sign_sub = document.getElementById("btn-subtract");
const btn_sign_mul = document.getElementById("btn-multiply");
const btn_sign_div = document.getElementById("btn-divide");
const btn_sign_equal = document.getElementById("btn-equal");

/* 讀取視窗*/
const cal_screent = document.getElementById("cal-res-screen");

// Regular expressions
const validExpressionRegex = /^(\d+([+\-*/]\d+)*)(\s*([+\-*/]\s*\d+))*$/;
let expression = ""
let res = 0;

function displaytext(text){ 
    cal_screent.innerText = text
}

function clicknumber(number){
    expression += number;
    displaytext(expression);
}

function clickop(op){ // 運算子
   expression += op;
   displaytext(expression);
}



function clickres(){
    if (validExpressionRegex.test(expression)) {
        try {
            res = eval(expression);
            displaytext(res);
        } catch (e) {
            displaytext("Error");
        }
    } else { 
        displaytext("Invalid Expression");
        setTimeout(() => {
            displaytext("0");
            expression = ""; 
        }, 1000); // 1000 = 1秒
        
    }
}

function clickclr(){
   expression = "";
   res = 0;
   displaytext("0");
}
function reset(){
    expression = "";
    res = 0;
}

// 監聽數字鍵
for(let i = 0 ; i<number_button.length ;i++){
    number_button[i].addEventListener("click",()=>{
    clicknumber(number_button[i].dataset.value);
});

}
// 監聽運算子按鈕
btn_sign_clr.addEventListener("click", clickclr);
btn_sign_add.addEventListener("click", () => clickop("+"));
btn_sign_sub.addEventListener("click", () => clickop("-"));
btn_sign_mul.addEventListener("click", () => clickop("*"));
btn_sign_div.addEventListener("click", () => clickop("/"));

// 監聽等號按鈕
btn_sign_equal.addEventListener("click", clickres);

document.querySelector(".backspace").addEventListener('click',function(){
    let toarr  = expression.split('');
    toarr.pop();
    expression = toarr.join('');
    if (expression)displaytext(expression);
    else displaytext("0");
},false)
