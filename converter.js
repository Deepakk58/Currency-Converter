const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdown = document.querySelectorAll(".dropdown select")

const button = document.querySelector("button")
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")

for(let select of dropdown){
    for (currcode in countryList) {
        let newOption = document.createElement("option");
        if (select.name === "from" && currcode === "USD") {
            newOption.selected = "selected"
        } else if (select.name === "to" && currcode === "INR") {
            newOption.selected = "selected"
        }

        newOption.innerText = currcode
        newOption.value = currcode
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    })
}

const updateflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let link = `https://flagsapi.com/${countrycode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = link;
}

button.addEventListener("click", async (evt) => {
    evt.preventDefault()
    let amount = document.querySelector(".amount input")
    let value = amount.value;
    if (value === "" || value < 1 || isNaN(value)){
        msg.innerText = `Enter a valid input`
    } 
    else {
        const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
        let response = await fetch(URL);
        let data = await response.json();
    
        let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
        let final = rate * value;
    
        msg.innerText = `${value} ${fromCurr.value} = ${final.toFixed(2)} ${toCurr.value}`
    }
})