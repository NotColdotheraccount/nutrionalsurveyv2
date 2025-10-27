let seconds = 0;
let timerInterval;
let started = false;       // prevent starting timer twice
let isSubmitting = false;  // prevent double submission

const form = document.getElementById('surveyForm');
const surveySection = document.getElementById('surveySection');
const consentBlock = document.getElementById('consentBlock');
const consentYesBtn = document.getElementById('consentYesBtn');
const consentNoBtn = document.getElementById('consentNoBtn');
const submitBtn = form.querySelector('button[type="submit"]');

// Consent: Yes -> start timer & show survey
consentYesBtn.addEventListener('click', () => {
    if (started) return;
    started = true;

    // hide consent UI
    consentBlock.style.display = "none";

    // Start timer (hidden but active)
    timerInterval = setInterval(() => {
        seconds++;
    }, 1000);

    // Show survey section
    surveySection.style.display = "block";
});

// Consent: No -> thank you popup, do not proceed
consentNoBtn.addEventListener('click', () => {
    alert("Thank you for your time.");
    // You can optionally redirect them away, e.g.:
    // window.location.href = "https://google.com";
});

// Submit handler
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    if (isSubmitting) return;
    isSubmitting = true;
    submitBtn.disabled = true;

    clearInterval(timerInterval);

    const formData = {
        name: "",            // no name now
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

        // Redirect to post-survey after submission
        window.location.href = redirectURL;

    } catch (error) {
        console.error(error);
        alert("There was an error submitting your response. Please try again.");
        // allow retry
        isSubmitting = false;
        submitBtn.disabled = false;
    }
});