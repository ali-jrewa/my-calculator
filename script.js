let result = document.querySelector('input[name="result"]');

// Landing Page
window.addEventListener("load", () => {

    setTimeout(() => {

        const landing = document.getElementById("landing-page");

        landing.classList.add("fade-out");

        setTimeout(() => {

            landing.style.display = "none";

            document
            .getElementById("app")
            .classList.remove("hidden");

        },1000);

    },4000);

});


// Theme Toggle
const themeBtn = document.getElementById("theme-btn");

// Load saved theme
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-theme");
    themeBtn.innerHTML = "☀️ Light Mode";
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-theme");

    if(document.body.classList.contains("dark-theme")){

        localStorage.setItem("theme", "dark");
        themeBtn.innerHTML = "☀️ Light Mode";

    }else{

        localStorage.setItem("theme", "light");
        themeBtn.innerHTML = "🌙 Dark Mode";

    }
});

// keyboard support
document.addEventListener("keydown", (e) => {

    const key = e.key;

    if ("0123456789+-*/.".includes(key)) {
        cal(key);
    }

    if (key === "Enter") {
        cal("=");
    }

    if (key === "Backspace") {
        cal("DE");
    }

    if (key === "Escape") {
        cal("AC");
    }
});

function appendValue(value){
    result.value += value;
}

function cal(value) {
    switch (value) {
        case 'AC':
            result.value = '';
            break;

        case 'DE':
            result.value = result.value.slice(0, -1);
            break;

        case '.':
            const parts = result.value.split(/[+\-*/]/);
            const currentNumber = parts[parts.length - 1];

            if (!currentNumber.includes('.')) {
                result.value += '.';
            }
            break;
       
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
        case '00':
        case '+':
        case '-':
        case '*':
        case '/':
            appendValue(value);
            break;

        case '=':

            if(result.value.trim() === ''){
                return;
            }

            try {

                result.value = Function(
                    '"use strict"; return (' + result.value + ')'
                )();

            } catch(error) {

                result.value = 'Error';

            }
            break;
    }
}


let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {

    e.preventDefault();

    deferredPrompt = e;

    document
      .getElementById("install-btn")
      .hidden = false;
});

document
.getElementById("install-btn")
.addEventListener("click", async () => {

    if(!deferredPrompt) return;

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    document.getElementById("install-btn").hidden = true;

    deferredPrompt = null;
});