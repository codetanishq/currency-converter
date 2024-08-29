const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.json";

const NEW_BASE_URL="https://2024-03-06.currency-api.pages.dev/v1/currencies";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn =document.querySelector("form button");
const fromCurrency =document.querySelector(".from select");
const toCurrency =document.querySelector(".to select");
const msg =document.querySelector(".msg");
const btni = document.querySelector("#swapp");



for (let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected="selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected="selected";
        }
    select.append(newOption)
    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target)

    })
}
const updateExchangeRate=async () =>{
    let amount =document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal === "" || amtVal <1){
        amtVal=1;
        amount.value="1";
    }
    const fromurl= fromCurrency.value.toLowerCase()
    const URL =`${NEW_BASE_URL}/${fromurl}.json`;
    let response =await fetch(URL);
    let data =await response.json();
    let rate =data[fromurl][toCurrency.value.toLowerCase()];
    let finalAmount =amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`
}

const updateFlag =(element) =>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newsrc= `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src=newsrc;
};

const excahngepos = ()=>{
    let pos = fromCurrency.value;
    fromCurrency.value= toCurrency.value;
    toCurrency.value=pos;

    updateFlag(fromCurrency);
    updateFlag(toCurrency);
    updateExchangeRate();

}


btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
    
});
btni.addEventListener("click",(evt)=>{
    evt.preventDefault();

    excahngepos();
   
    
});
window.addEventListener("load",()=>{
    updateExchangeRate();
});