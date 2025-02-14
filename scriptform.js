/*(function () {
    class CustomForm extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });

            this.shadowRoot.innerHTML = `
        <div class="container">
            <form id="advanceForm">
                <div class="slider-container">
                    <p class="questions">How many events do you promote a year?</p>
                    <p class="amount answers" id="eventsCount">25 events</p>
                    <input type="range" min="1" max="50" value="25" id="eventsSlider">
                </div>
                <div class="slider-container">
                    <p class="questions">How much gross ticket sales do you sell a year?</p>
                    <p class="amount answers" id="ticketSales">$10,000,000</p>
                    <input type="range" min="500000" max="20000000" step="500000" value="10000000" id="salesSlider">
                </div>
                <div class="slider-container">
                    <p class="questions">For how long has your company been operating?</p>
                    <p class="amount answers" id="yearsOperating">5 years</p>
                    <input type="range" min="0" max="10" value="5" id="yearsSlider">
                </div>
                <div class="eligibilityDiv">
                    <p class="eligibilityLabel">You could be eligible for up to:</p>
                    <p class="eligibility" id="eligibilityAmount">$120,000</p>
                </div>
                <input id="email" type="email" class="email-input" placeholder="your-email@google.com">
                <button class="apply-btn" type="submit">Apply Now</button>
            </form>
        </div>
    `;


            // Ajout du style
            let style = document.createElement("style");
            style.innerHTML = `
        .container { font-family: Arial, sans-serif; background: #fff; padding: 20px; border-radius: 10px; max-width: 400px; }
        .questions { font-size: 14px; }
        .eligibility { font-size: 20px; color: #e91e63; }
        .apply-btn { background: #ff9800; color: white; border: none; padding: 10px; cursor: pointer; }
    `;
            document.head.appendChild(style);

            // Ajout des scripts EmailJS
            let emailScript = document.createElement("script");
            emailScript.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
            document.head.appendChild(emailScript);

            emailScript.onload = function () {
                emailjs.init("cI9NZFtz2liU-dAUJ");
            };

            // Gestion des sliders et calculs
            function updateValues() {
                let sales = document.getElementById("salesSlider").value;
                let events = document.getElementById("eventsSlider").value;
                let years = document.getElementById("yearsSlider").value;
                let eligibility = (sales * 0.1).toLocaleString("en-US");
                document.getElementById("eligibilityAmount").innerText = `$${eligibility}`;
            }

            document.querySelectorAll("input[type=range]").forEach(slider => {
                slider.addEventListener("input", updateValues);
            });
            updateValues();

            document.getElementById("advanceForm").addEventListener("submit", function (event) {
                event.preventDefault();
                let email = document.getElementById("email").value;
                let sales = document.getElementById("salesSlider").value;
                let eligibility = document.getElementById("eligibilityAmount").innerText;

                emailjs.send("service_p09r79s", "template_f3kgztv", {
                    user_email: email,
                    sales: sales,
                    eligibility: eligibility
                }).then(() => alert("Email envoyé !"));
            });
        }
    }
    customElements.define("custom-form", CustomForm);

})(); */
class CustomForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                body {
    font-family: 'Archivo', sans-serif;
    background-color: #222;
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    margin: 0;
}

#advanceForm {
    background: #ffffff;
    border-radius: 10px;
    width: 436px;
    text-align: center;
    overflow: auto;
    display: flex;
    justify-content: space-between;
    margin: 0 0;
    flex-direction: column;
    position: relative;
}

.logo {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 8px;
    right: 12px;
}

.questions {
    color: #434343;
    opacity: 80%;
    font-size: 15px;
    margin-bottom: 0 7px 0 0;
}

.eligibilityLabel {
    color: #696969;
}

input[type=range] {
    width: 346px;
    height: 3px;
    -webkit-appearance: none;
    appearance: none;
    background: #e68900;
    border-radius: 5px;
    outline: none;
}

/* Barre de progression avant et après le curseur (WebKit: Chrome, Safari, Edge) */
input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 2px;
    border-radius: 5px;
    background: linear-gradient(to right, #e68900 var(--progress), #ddd var(--progress));
}

/* Curseur du slider (WebKit) */
input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #EE8933;
    cursor: pointer;
    margin-top: -4px;
    position: relative;
}

/* Barre pour Firefox */
input[type=range]::-moz-range-track {
    width: 100%;
    height: 2px;
    border-radius: 5px;
    background: #ddd;
}

/* Partie remplie avant le curseur pour Firefox */
input[type=range]::-moz-range-progress {
    background: #e68900;
    height: 6px;
    border-radius: 5px;
}

/* Curseur pour Firefox */
input[type=range]::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #EE8933;
    cursor: pointer;
    border: none;
}


.amount {
    font-size: 22px;
    font-weight: 500;
    margin: 0 12px 0 0;
}

.eligibility {
    font-size: 35px;
    color: #e91e63;
    font-weight: 400;
    margin: 0 0 0 0;
}

.email-input {
    width: 345px;
    height: 40px;
    border: 0.3px solid #03010A;
    border-radius: 6px;
    margin-bottom: 10px;
    margin-top: 24px;
    text-indent: 10px;
    padding: 0;
    align-self: center;

}

.apply-btn {
    background: #ff9800;
    color: white;
    border: none;
    padding: 10px;
    width: 345px;
    height: 40px;
    border-radius: 6px;
    font-size: 1em;
    cursor: pointer;
    flex: content;
    align-self: center;
    margin-bottom: 13px;
}

.apply-btn:hover {
    background: #e68900;
}
            </style>
            <form id="advanceForm">
            <div class="slider-container">
                <img src="logo.jpg" class="logo" />
                <p class="questions">How many events do you promote a year?</p>
                <p class="amount answers" id="eventsCount">25 events</p>
                <input type="range" min="1" max="50" value="25" id="eventsSlider">
            </div>
            <div class="slider-container">
                <p class="questions">How much gross ticket sales do you sell a year?</p>
                <p class="amount answers" id="ticketSales">$10,000,000</p>
                <input type="range" min="500000" max="20000000" step="500000" value="10000000" id="salesSlider">
            </div>
            <div class="slider-container">
                <p class="questions">For how long has your company been operating?</p>
                <p class="amount answers" id="yearsOperating">5 years</p>
                <input type="range" min="0" max="10" value="5" id="yearsSlider">
            </div>
            <div class="eligibilityDiv">
                <p class="eligibilityLabel">You could be eligible for up to:</p>
                <p class="eligibility" id="eligibilityAmount">$120,000</p>
            </div>
            <input id="email" type="email" class="email-input" placeholder="your-email@google.com">
            <button class="apply-btn" type="submit">Apply Now</button>
        </form>
        `;
       
    
        // Ajouter les événements
        this.shadowRoot.querySelector("#advanceForm").addEventListener("submit", (event) => {
            event.preventDefault();
            this.sendEmail();
        });
        // Mettre à jour les valeurs des sliders
        this.shadowRoot.getElementById("yearsSlider").addEventListener("input", (event) => {
                var input = event.target.value;
                this.shadowRoot.getElementById("yearsOperating").innerText = `${input} years`;
                this.calculateAdvance();
            });

            this.shadowRoot.getElementById("eventsSlider").addEventListener("input", (event) => {
                var input = event.target.value;
                this.shadowRoot.getElementById("eventsCount").innerText = `${input} events`;
                this.calculateAdvance();
            });    
            this.shadowRoot.getElementById("salesSlider").addEventListener("input", (event) => {
                var input = event.target.value;
                this.shadowRoot.getElementById("ticketSales").innerText =`$${Number(input).toLocaleString("en-US")}`;
                this.calculateAdvance();
            });  
        this.shadowRoot.querySelectorAll("input[type=range]").forEach(slider => {
            function updateProgress() {
                let percent = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
                slider.style.setProperty("--progress", percent + "%");
            }
        
            slider.addEventListener("input", updateProgress);
            updateProgress(); // Initialise la valeur au chargement de la page
        });

    }
    
    getPercentage(value, percentageTable) {
        let range = percentageTable.find(entry => value >= entry.min && value <= entry.max);
        return range ? range.percentage : 0;
    }
  
    calculateAdvance() {
        let sales = this.shadowRoot.getElementById("salesSlider").value;
        var events = this.shadowRoot.getElementById("eventsSlider").value;
        var years = this.shadowRoot.getElementById("yearsSlider").value;
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
        var eventsAdvanceEligibility = this.getPercentage(events, eventsAdvanceEligibilityFactor);
        console.log(eventsAdvanceEligibility);
    
        var yearsAdvanceEligibility = this.getPercentage(years, yearsAdvanceEligibilityFactor);
        console.log(yearsAdvanceEligibility);
        var range = soundcheckMaxAdvance - soundcheckBaseAdvance;
        var scoring = (eventsAdvanceEligibility + yearsAdvanceEligibility) / 2;
        var advanceEligibility = (soundcheckBaseAdvance + range) * scoring;
    
        let eligibility = sales * advanceEligibility;
        if (eligibility > maxAdvance) {
            eligibility = maxAdvance;
        }
        this.shadowRoot.getElementById("eligibilityAmount").innerText = `$${parseInt(eligibility).toLocaleString("en-US")}`;
    
        
    }
    
    sendEmail() {
        const email = this.shadowRoot.querySelector("#email").value;
        let sales = this.shadowRoot.getElementById("salesSlider").value;
        var eventsSlider = this.shadowRoot.getElementById("eventsSlider").value;
        var yearsSlider = this.shadowRoot.getElementById("yearsSlider").value;
        var eligibility = this.shadowRoot.getElementById("eligibilityAmount").innerText;

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
}

// Déclarer la balise personnalisée
customElements.define("custom-form", CustomForm);
