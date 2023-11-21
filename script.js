
class Smoothie {
    constructor(fruit, base, toppings, size, sweetener, extra) {
        this.fruit = fruit;
        this.base = base;
        this.toppings = toppings;
        this.size = size;
        this.sweetener = sweetener;
        this.extra = extra;
        // initialize other properties if needed
    }

    getDescription() {
        // generate smoothie description
        return `Fruit: ${this.fruit}, Base: ${this.base}, Toppings: ${this.toppings.join(', ')}, Size: ${this.size}, Sweetener: ${this.sweetener}, Extra: ${this.extra || 'None'}`;
    }

    calculateApproximatePrice() {
        // Assume a random factor between 0.8 and 1.2 to simulate variation
        const randomFactor = Math.random() * 0.4 + 0.8;
        
        // Map sizes to base prices (you can adjust these prices)
        const sizePrices = {
            small: 2.00,
            medium: 2.50,
            large: 3.00,
        };

        // Use the selected size to determine the approximate price
        const approximatePrice = sizePrices[this.size] * randomFactor;

        return approximatePrice;
    }
}

function orderSmoothie() {
    // capture form values
    const fruit = document.getElementById('fruit').value;
    const base = document.getElementById('base').value;

    // For checkboxes (toppings), get selected toppings
    const toppings = [];
    const toppingCheckboxes = document.getElementsByName('topping');
    toppingCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            toppings.push(checkbox.value);
        }
    });

    // For radio buttons (size and sweetener), get selected value
    const size = document.querySelector('input[name="size"]:checked').value;
    const sweetener = document.querySelector('input[name="sweetener"]:checked').value;

    const extra = document.getElementById('extra').value;

    // create Smoothie object
    const smoothie = new Smoothie(fruit, base, toppings, size, sweetener, extra);

    // display smoothie description
    const smoothieOutput = document.getElementById('smoothieOutput');
    smoothieOutput.innerHTML = ''; // Clear previous content

    // Add a header
    const header = document.createElement('div');
    // header.innerText = "Your Smoothie Order";
    header.style.fontSize = '1.5em';
    header.style.marginBottom = '10px';
    smoothieOutput.appendChild(header);

    // Create and append a UL for the smoothie details
    const smoothieDetailsList = document.createElement('ul');
    smoothieDetailsList.id = 'smoothieDetails';

    // Add smoothie details as list items
    const details = Object.entries(smoothie);
    details.forEach(([key, value]) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${key}:</strong> ${Array.isArray(value) ? value.join(', ') : value}`;
        smoothieDetailsList.appendChild(listItem);
    });

    smoothieOutput.appendChild(smoothieDetailsList);
}

// Array of smoothie images
const smoothieImages = [
    'sm.jpg',
    'sm1.jpg',
    'sm2.jpg',
    'sm3.jpg',
   
];

// Function to get a random smoothie image URL
function getRandomSmoothieImage() {
    const randomIndex = Math.floor(Math.random() * smoothieImages.length);
    return smoothieImages[randomIndex];
}

// Display a random smoothie image
const smoothieImage = document.getElementById('smoothiePresentationImage');
smoothieImage.src = getRandomSmoothieImage();

// Create Smoothie object
const smoothie = new Smoothie(fruit, base, toppings, size, sweetener, extra);

// Calculate approximate price based on size
const approximatePrice = smoothie.calculateApproximatePrice();


// Display bill details
displayBillDetails(fruit, base, toppings, size, sweetener, approximatePrice);
