//  Listen for Submit

document.getElementById("loan-form").addEventListener("submit", function(e){
    // Hide Results
    document.getElementById("results").style.display = "none";
    // Show Loader
    document.getElementById("loading").style.display = "block";

    setTimeout(calculateResults, 2000)
    e.preventDefault();
})

// Calculate Results
function  calculateResults(){
    // UI Vars
    console.log("Calculating...");
    const  amount = document.getElementById("amount");
    const interest = document.getElementById("interest");
    const years = document.getElementById("years");
    const montlyPayment = document.getElementById("monthly-payment");
    const totalPayment = document.getElementById("total-payment");
    const totalInerest = document.getElementById("total-interest");


    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) /100 /12;
    const calculatedPayments= parseFloat(years.value) *12;


    // Calculate monthly payment
    const x = Math.pow(1+calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if (isFinite(monthly)){
        montlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly*calculatedPayments).toFixed();
        totalInerest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        // Show results
        document.getElementById("results").style.display = "block";
        
    }
    else{
        showError("Please check your numbers");
    }
    // Hide the loader
    document.getElementById("loading").style.display = "none";
}

// Show Error
function showError(error){
    // Create Div
    const errorDiv = document.createElement("div");
    const heading = document.querySelector(".heading"); 
    // get Elements
    card = document.querySelector(".card");


    // Add classs alert
    errorDiv.className = "alert alert-danger"
    // Create textNode and append it to errorDiv
    errorDiv.appendChild(document.createTextNode(error))
    // Insert error before heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 seconds
    setTimeout(clearError, 3000);

}

// Clear Error Function
function clearError(){
    document.querySelector(".alert").remove(); 
}