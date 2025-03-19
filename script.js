document.addEventListener("DOMContentLoaded", function () {
    // Dropdown Menu for "Choose Place"
    const dropdownInput = document.querySelector(".custom-dropdown");
    const dropdownItems = document.querySelectorAll(".dropdown-item");

    dropdownItems.forEach(item => {
        item.addEventListener("click", function () {
            dropdownInput.value = this.textContent; // Set input value to selected item
        });
    });

    // Counter (Rooms, Bathrooms, Floor, Rating)
    document.querySelectorAll(".number-input").forEach(container => {
        let input = container.querySelector("input");
        let increment = container.querySelector(".increment");
        let decrement = container.querySelector(".decrement");

        increment.addEventListener("click", () => {
            input.value = parseInt(input.value) + 1;
        });

        decrement.addEventListener("click", () => {
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }
        });
    });

    // Toggle Active State for Furnished & Additional Services Buttons
    document.querySelectorAll(".btn-group button, .d-flex button").forEach(button => {
        button.addEventListener("click", function () {
            let parent = this.parentElement; // Find parent group
            parent.querySelectorAll("button").forEach(btn => btn.classList.remove("btn-success", "active"));
            this.classList.add("btn-success", "active"); // Set active button
        });
    });

    // Pets Allowed Toggle Switch
    document.getElementById("petsAllowed").addEventListener("change", function () {
        console.log(this.checked ? "Pets Allowed ✅" : "Pets Not Allowed ❌");
    });

    // Price Range Slider
    const rangeMin = document.getElementById("rangeMin");
    const rangeMax = document.getElementById("rangeMax");
    const priceFrom = document.getElementById("priceFrom");
    const priceTo = document.getElementById("priceTo");

    function updatePriceInputs() {
        priceFrom.value = rangeMin.value;
        priceTo.value = rangeMax.value;
    }

    rangeMin.addEventListener("input", updatePriceInputs);
    rangeMax.addEventListener("input", updatePriceInputs);


});
//------------------------------------------
//  Script.js
const rangevalue =
    document.querySelector(".slider-container .price-slider");
const rangeInputvalue =
    document.querySelectorAll(".range-input input");

// Set the price gap
let priceGap = 500;

// Adding event listners to price input elements
const priceInputvalue =
    document.querySelectorAll(".price-input input");
for (let i = 0; i < priceInputvalue.length; i++) {
    priceInputvalue[i].addEventListener("input", e => {

        // Parse min and max values of the range input
        let minp = parseInt(priceInputvalue[0].value);
        let maxp = parseInt(priceInputvalue[1].value);
        let diff = maxp - minp

        if (minp < 0) {
            alert("minimum price cannot be less than 0");
            priceInputvalue[0].value = 0;
            minp = 0;
        }

        // Validate the input values
        if (maxp > 10000) {
            alert("maximum price cannot be greater than 10000");
            priceInputvalue[1].value = 10000;
            maxp = 10000;
        }

        if (minp > maxp - priceGap) {
            priceInputvalue[0].value = maxp - priceGap;
            minp = maxp - priceGap;

            if (minp < 0) {
                priceInputvalue[0].value = 0;
                minp = 0;
            }
        }

        // Check if the price gap is met 
        // and max price is within the range
        if (diff >= priceGap && maxp <= rangeInputvalue[1].max) {
            if (e.target.className === "min-input") {
                rangeInputvalue[0].value = minp;
                let value1 = rangeInputvalue[0].max;
                rangevalue.style.left = `${(minp / value1) * 100}%`;
            }
            else {
                rangeInputvalue[1].value = maxp;
                let value2 = rangeInputvalue[1].max;
                rangevalue.style.right =
                    `${100 - (maxp / value2) * 100}%`;
            }
        }
    });

    // Add event listeners to range input elements
    for (let i = 0; i < rangeInputvalue.length; i++) {
        rangeInputvalue[i].addEventListener("input", e => {
            let minVal =
                parseInt(rangeInputvalue[0].value);
            let maxVal =
                parseInt(rangeInputvalue[1].value);

            let diff = maxVal - minVal

            // Check if the price gap is exceeded
            if (diff < priceGap) {

                // Check if the input is the min range input
                if (e.target.className === "min-range") {
                    rangeInputvalue[0].value = maxVal - priceGap;
                }
                else {
                    rangeInputvalue[1].value = minVal + priceGap;
                }
            }
            else {

                // Update price inputs and range progress
                priceInputvalue[0].value = minVal;
                priceInputvalue[1].value = maxVal;
                rangevalue.style.left =
                    `${(minVal / rangeInputvalue[0].max) * 100}%`;
                rangevalue.style.right =
                    `${100 - (maxVal / rangeInputvalue[1].max) * 100}%`;
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    flatpickr("#bookingCalendar", {
        inline: true,
        defaultDate: "today",
        appendTo: document.getElementById("calendarContainer"),
        showMonths: 1,
        dateFormat: "Y-m-d",
    });
});