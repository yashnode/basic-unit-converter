function setInputFilter(textbox, inputFilter, errMsg) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function(event) {
        textbox.addEventListener(event, function(e) {
            if (inputFilter(this.value)) {
                // Accepted value
                if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                    this.classList.remove("input-error");
                    this.setCustomValidity("");
                }
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                // Rejected value - restore the previous one
                this.classList.add("input-error");
                this.setCustomValidity(errMsg);
                this.reportValidity();
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                // Rejected value - nothing to restore
                this.value = "";
            }
        });
    });
}
setInputFilter(document.getElementById("number"), function(value) {
    return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
}, "Only digits are allowed");


let volText = document.getElementById("volume")
let lenText = document.getElementById("length")
let massText = document.getElementById("mass")

function convert() {
    let number = document.getElementById("number").value;
    length(number)
    volume(number)
    mass(number)

}

function length(number) {
    let feet = parseFloat(number * 3.28).toFixed(2)
    let meter = parseFloat(number / 3.28).toFixed(2)
    lenText.textContent = number + " meters = " + feet + " feet" + " | " + number + " feet = " + meter + " meters"

}

function volume(number) {
    let gallons = parseFloat(number * 0.2641).toFixed(2)
    let litres = parseFloat(number * 3.7854).toFixed(2)
    volText.textContent = number + " litres = " + gallons + " gallons" + " | " + number + " gallons = " + litres + " litres"

}

function mass(number) {
    let kilos = parseFloat(number / 2.2046).toFixed(2)
    let pounds = parseFloat(number * 2.2046).toFixed(2)
    massText.textContent = number + " pounds = " + kilos + " kilograms" + " | " + number + " kilograms = " + pounds + " pounds"
}