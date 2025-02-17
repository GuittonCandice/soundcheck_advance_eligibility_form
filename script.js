document.querySelectorAll("input[type=range]").forEach(slider => {
    function updateProgress() {
        let percent = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
        slider.style.setProperty("--progress", percent + "%");
    }

    slider.addEventListener("input", updateProgress);
    updateProgress(); // Initialise la valeur au chargement de la page
});

function getPercentage(value, percentageTable) {
    let range = percentageTable.find(entry => value >= entry.min && value <= entry.max);
    return range ? range.percentage : 0;
}

function calculateAdvance() {
    let sales = document.getElementById("salesSlider").value;
    var events = document.getElementById("eventsSlider").value;
    var years = document.getElementById("yearsSlider").value;
    const maxAdvance = 1000000;
    const soundcheckBaseAdvance = 0.02;
    const soundcheckMaxAdvance = 0.15;
    const eventsAdvanceEligibilityFactor = [
        { min: 1, max: 1, percentage: 0.00 },
        { min: 2, max: 3, percentage: 0.05 },
        { min: 4, max: 6, percentage: 0.15 },
        { min: 7, max: 10, percentage: 0.30 },
        { min: 11, max: 20, percentage: 0.50 },
        { min: 21, max: 49, percentage: 0.80 },
        { min: 50, max: 50, percentage: 1.00 }
    ];

    const yearsAdvanceEligibilityFactor = [
        { min: 0, max: 0, percentage: 0.00 },
        { min: 1, max: 2, percentage: 0.15 },
        { min: 3, max: 5, percentage: 0.40 },
        { min: 6, max: 9, percentage: 0.70 },
        { min: 10, max: 10, percentage: 1.00 },
    ];
    var eventsAdvanceEligibility = getPercentage(events, eventsAdvanceEligibilityFactor);
    console.log(eventsAdvanceEligibility);

    var yearsAdvanceEligibility = getPercentage(years, yearsAdvanceEligibilityFactor);
    console.log(yearsAdvanceEligibility);
    var range = soundcheckMaxAdvance - soundcheckBaseAdvance;
    var scoring = (eventsAdvanceEligibility + yearsAdvanceEligibility) / 2;
    var advanceEligibility = (soundcheckBaseAdvance + range) * scoring;

    let eligibility = sales * advanceEligibility;
    if (eligibility > maxAdvance) {
        eligibility = maxAdvance;
    }
    document.getElementById("eligibilityAmount").innerText = `$${parseInt(eligibility).toLocaleString("en-US")}`;

}
function changeGrossTicketSalesInputStep() {
    let sales = document.getElementById("salesSlider").value;
    document.getElementById("ticketSales").innerText = `$${Number(sales).toLocaleString("en-US")}`;
    calculateAdvance();
}

document.getElementById("salesSlider").addEventListener("input", changeGrossTicketSalesInputStep);



function changeEventInputStep() {
    var input = document.getElementById("eventsSlider").value;
    document.getElementById("eventsCount").innerText = `${input} events`;
    calculateAdvance();
}
document.getElementById("eventsSlider").addEventListener("input", changeEventInputStep);

function changeYearInputStep() {
    var input = document.getElementById("yearsSlider").value;
    document.getElementById("yearsOperating").innerText = `${input} years`;
    calculateAdvance();
}
document.getElementById("yearsSlider").addEventListener("input", changeYearInputStep);

document.getElementById("advanceForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche l'envoi classique

    // Récupération des valeurs
    let email = document.getElementById("email").value;

    var yearsSlider = document.getElementById("yearsSlider").value;
    var eventsSlider = document.getElementById("eventsSlider").value;
    var sales = document.getElementById("salesSlider").innerText;

    var eligibility = document.getElementById("eligibilityAmount").innerText;
    sendEmail(email, yearsSlider, eventsSlider, sales, eligibility);
});

function sendEmail(email, yearsSlider, eventsSlider, sales, eligibility) {
    emailjs.send("service_p09r79s", "template_f3kgztv", {
        user_email: email,
        yearSlider: yearsSlider,
        eventSlider: eventsSlider,
        sales: sales,
        eligibility: eligibility
    }).then(response => {
        alert("Email envoyé !");
    }).catch(error => {
    });
}



