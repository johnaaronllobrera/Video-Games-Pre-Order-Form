/* 
Name: Llobrera, John Aaron B. 
SN: 2022-11656
Degree Program: BS Statistics
Laboratory Section: C1L 
Exercise 11: Javascript 2
*/

// Function to compute the total cost of selected games
function computeTotalCost() {
    // Get all selected games
    var games = document.querySelectorAll('input[name="game"]:checked');
    // Log the number of selected games
    console.log("Number of games selected:", games.length);
    var totalCost = 0;

    // Prices of Triple A games
    var gamePrices = {
        'game1': 3999,
        'game2': 2999,
        'game3': 4200,
        'game4': 4999,
        'game5': 2000,
        'game6': 3499,
        'game7': 5499
    };

    // Calculate total cost of selected games
    games.forEach(function(game) {
        totalCost += gamePrices[game.value];
    });

    // Apply discounts based on the number of games chosen
    var discount = 0;
    if (games.length == 7) {
        console.log("20% discount applied");
        discount = 0.2;
    } else if (games.length >= 5) {
        console.log("15% discount applied");
        discount = 0.15;
    } else if (games.length >= 3) {
        console.log("10% discount applied");
        discount = 0.1;
    }

    // Apply discount to the total cost
    totalCost *= (1 - discount);

    return totalCost;
}

// Function to handle form elements and their interactions
function handleFormElements() {
    // Get form elements
    var games = document.querySelectorAll('input[name="game"]');
    var freeGameRadios = document.querySelectorAll('input[name="freeGame"]');
    var freeTrialRadios = document.querySelectorAll('input[name="trialGame"]');
    var deliveryDetails = document.querySelectorAll('input[name="physicalCopy"]');
    var addressInput = document.getElementById('address');
    var dateInput = document.getElementById('date');
    var timeInput = document.getElementById('time');
    var paymentMethod = document.getElementById('paymentMethod');
    var mobileNumberInput = document.getElementById('mobileNumber');
    var submitButton = document.querySelector('button[type="submit"]');

    // Disable free game and free trial game if no Triple A game is chosen
    var tripleAGameChosen = document.querySelector('input[name="game"]:checked') !== null;
    freeGameRadios.forEach(function(radio) {
        radio.disabled = !tripleAGameChosen;
    });
    freeTrialRadios.forEach(function(radio) {
        radio.disabled = !tripleAGameChosen;
    });

    // Disable submit button if no Triple A game is chosen
    submitButton.disabled = !tripleAGameChosen;

    // Enable/disable address, date, and time based on physical copy choice
    var physicalCopyChosen = deliveryDetails[0].checked;
    addressInput.disabled = !physicalCopyChosen;
    dateInput.disabled = !physicalCopyChosen;
    timeInput.disabled = !physicalCopyChosen;
    addressInput.required = physicalCopyChosen;
    dateInput.required = physicalCopyChosen;
    timeInput.required = physicalCopyChosen;

    // Enable/disable mobile number based on payment method choice
    mobileNumberInput.disabled = (paymentMethod.value !== 'Gcash/Maya');
    mobileNumberInput.required = (paymentMethod.value === 'Gcash/Maya');
}

// Function to validate date and time inputs
function validateDateTime() {
    var dateInput = document.getElementById('date');
    var timeInput = document.getElementById('time');
    var now = new Date();
    var selectedDate = new Date(dateInput.value + 'T' + timeInput.value);

    // Validate date and time
    if (selectedDate <= now) {
        alert("Please select a future date and time.");
        dateInput.value = '';
        timeInput.value = '';
        return false;
    }

    if (selectedDate.getHours() < 8 || selectedDate.getHours() > 17) {
        alert("Delivery time should be between 8 AM and 5 PM.");
        timeInput.value = '';
        return false;
    }

    return true;
}

// Function to display order summary
function displayOrderSummary() {
    var totalCost = computeTotalCost();
    if (totalCost > 0) {
        var orderSummary = "Games Chosen:\n";
        document.querySelectorAll('input[name="game"]:checked').forEach(function(game) {
            var label = document.querySelector('label[for="' + game.id + '"]');
            orderSummary += "- " + label.innerText + " - Php " + label.innerText.match(/\d+/) + "\n";
        });

        var games = document.querySelectorAll('input[name="game"]:checked');
        var discount = 0;
        if (games.length == 7) {
            discount = 0.2;
            orderSummary += "\n20% DISCOUNT FOR BUYING ALL GAMES!!!\n";
        } else if (games.length >= 5) {
            discount = 0.15;
            orderSummary += "\n15% DISCOUNT FOR BUYING 5 OR MORE GAMES!!!\n";
        } else if (games.length >= 3) {
            discount = 0.1;
            orderSummary += "\n10% DISCOUNT FOR BUYING 3 OR MORE GAMES!!!\n";
        }

        orderSummary += "\nFree Game:\n";
        document.querySelectorAll('input[name="freeGame"]:checked').forEach(function(game) {
            orderSummary += "- " + game.value + "\n";
        });

        orderSummary += "\nFree Trial Game:\n";
        document.querySelectorAll('input[name="trialGame"]:checked').forEach(function(game) {
            orderSummary += "- " + game.value + "\n";
        });

        orderSummary += "\nWish List Game:\n";
        document.querySelectorAll('input[name="wishlistgame"]:checked').forEach(function(game) {
            var label = document.querySelector('label[for="' + game.id + '"]');
            orderSummary += "- " + label.innerText + "\n";
        });

        var date = document.getElementById('date').value;
        var time = document.getElementById('time').value;
        var mobileNumber = document.getElementById('mobileNumber').value;
        var deliveryFee = document.querySelectorAll('input[name="physicalCopy"]')[0].checked ? 399 : 0;
        var paymentMethod = document.getElementById('paymentMethod').value;

        orderSummary += "\nDelivery Time: " + time + "\n";
        orderSummary += "Delivery Date: " + date + "\n";
        orderSummary += "Delivery Fee: " + deliveryFee + "\n";
        orderSummary += "Payment Method: " + paymentMethod + "\n";
        orderSummary += "Mobile Number: " + mobileNumber + "\n";

        orderSummary += "\nPrice of Games: Php " + totalCost + "\n";
        var discountedTotal = totalCost * (1 - discount);
        orderSummary += "Discount: " + (discount * 100) + "%\n";
        orderSummary += "Discounted Total: Php " + discountedTotal + "\n";
        orderSummary += "Total Price (including delivery fee): Php " + (discountedTotal + deliveryFee) + "\n";

        alert(orderSummary);
    }
}

// Add event listeners to trigger form element handling
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for date and time inputs
    document.getElementById('date').addEventListener('change', validateDateTime);
    document.getElementById('time').addEventListener('change', validateDateTime);
    // Handle initial state
    handleFormElements();

    // Add event listeners for form elements
    document.querySelectorAll('input[name="game"]').forEach(function(input) {
        input.addEventListener('change', handleFormElements);
    });
    document.querySelectorAll('input[name="physicalCopy"]').forEach(function(input) {
        input.addEventListener('change', handleFormElements);
    });
    document.getElementById('paymentMethod').addEventListener('change', handleFormElements);

    // Add event listener for form submission
    document.getElementById('gameOrderForm').addEventListener('submit', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Display order summary
        displayOrderSummary();
    });
});
