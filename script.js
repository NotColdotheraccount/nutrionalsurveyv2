let seconds = 0;
let timerInterval;
const timer = document.getElementById('timer');
const form = document.getElementById('surveyForm');
const surveySection = document.getElementById('surveySection');
const confirmBtn = document.getElementById('confirmNameBtn');
const nameField = document.getElementById('fullname');

// Step 1: Wait for "Confirm Name"
confirmBtn.addEventListener('click', () => {
    if (nameField.value.trim() === "") {
        alert("Please enter your full name first.");
        return;
    }

    // Lock name input
    nameField.readOnly = true;
    confirmBtn.style.display = "none";

    // Show timer and survey section
    timer.style.display = "block";
    surveySection.style.display = "block";

    // Start timer
    timerInterval = setInterval(() => {
        seconds++;
        timer.textContent = `Time taken: ${seconds}s`;
    }, 1000);
});

// Step 2: Handle submission
// Step 2: Handle submission
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    clearInterval(timerInterval);

    const formData = {
        name: nameField.value,
        buy: form.buy.value,
        time: seconds
    };

    const scriptURL = "https://script.google.com/macros/s/AKfycbw-u3_jQE5tySNdgjSmR91ObFcymedOycbkAanEtUstzKrzKjoWP33JdJT7gPfmxOKj/exec";
    const redirectURL = "https://forms.gle/YHiB3pNsAbtbXmRa7"; // post-survey link

    try {
        await fetch(scriptURL, {
            method: "POST",
            body: new URLSearchParams(formData)
        });

        // ✅ Redirect to post-survey after submission
        window.location.href = redirectURL;

        // (Optional alternative: small delay)
        // alert(`Thank you, ${nameField.value}! You took ${seconds} seconds.`);
        // setTimeout(() => { window.location.replace(redirectURL); }, 500);

    } catch (error) {
        alert("There was an error submitting your response.");
        console.error(error);
    }
});
