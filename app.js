const BASE_URL =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector("form button");
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const msg = document.querySelector('.msg');
for (select of dropdowns) {
    for (Currcode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = Currcode;
        newoption.value = Currcode;
        if (select.name === "from" && Currcode === "USD") {
            newoption.selected = "selected"
        } else if (select.name === "to" && Currcode === "PKR") {
            newoption.selected = "selected"
        }
        select.append(newoption);
    }

    select.addEventListener("change", (evt) => {
        UpdateFLag(evt.target);
    })
}

const UpdateFLag = (elt) => {
    let currCode = elt.value;
    let countrycode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`
    let img = elt.parentElement.querySelector("img");
    img.src = newSrc;



}
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    let amount = document.querySelector("form input");
    let amtVal = amount.value;

    if (amtVal === "" || amtVal < 0) {
        amtVal = 1;
        amount.value = "1";
    }

    const from = fromCurr.value.toLowerCase();
    const to = toCurr.value.toLowerCase();

    const URL = `${BASE_URL}/${from}.json`;


    let response = await fetch(URL);
    if (!response.ok) throw new Error("API request failed");

    let data = await response.json();

    let rate = data[from][to];
    let finalAmount = (amtVal * rate).toFixed(2);

    // console.log(`Converted amount: ${finalAmount}`);


    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
});


