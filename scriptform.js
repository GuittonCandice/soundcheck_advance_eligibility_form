(function () {
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

})();
