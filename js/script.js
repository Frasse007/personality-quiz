// Store answers of user (key = question number, value = points)
let userAnswers = {};

// Select all questions and loops through each
const questions = document.querySelectorAll('.question-block');
questions.forEach((block, questionIndex) => {
    const answerButtons = block.querySelectorAll('.answer-btn');
    
    // Adds click listener for each button
    answerButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            
            // Removes selected class from all buttons in this question
            answerButtons.forEach(function(btn) {
                btn.classList.remove("selected");
            });

            // Adds selected class to the clicked button
            button.classList.add("selected");

            // Stores value of answer
            // parseInt converts the string from data-answer attribute to a integer for calculation
            const answerValue = parseInt(this.getAttribute('data-answer'));
            userAnswers[questionIndex] = answerValue;
        });
    });
});

// Calculates quiz results and displays user's attachment style
function displayResult() {
    // Checks that user answered all questions
    if (Object.keys(userAnswers).length < questions.length) {
        alert('Please answer all questions before viewing results!');
        return;
    }

    // Calculate total points by summing all answer values
    let totalPoints = 0;
    for (let questionIndex in userAnswers) {
        totalPoints += userAnswers[questionIndex];
    }

    // Determine attachment style based on answer points
    // Scoring ranges: 5-8, 9-12, 13-16, 17-20
    let attachmentStyle = '';
    let description = '';

    if (totalPoints >= 5 && totalPoints <= 8) {
        attachmentStyle = 'The Independent Lover';
        description = 'You love deeply but need space to stay grounded. You value autonomy and don’t believe love should feel consuming. When balanced, you’re a calm and steady partner.';
    } else if (totalPoints >= 9 && totalPoints <= 12) {
        attachmentStyle = 'The Secure Partner';
        description = 'You prioritize trust, communication, and emotional safety. You’re comfortable with closeness and independence, making you one of the most emotionally healthy partners.';
    } else if (totalPoints >= 13 && totalPoints <= 16) {
        attachmentStyle = 'The Devoted Builder';
        description = 'You show love through effort and consistency. You want a relationship that lasts and are willing to put in the work to make it strong.';
    } else {
        attachmentStyle = 'The Intense Romantic';
        description = 'You love loudly, deeply, and with your whole chest. You crave passion, closeness, and emotional honesty. Relationships are a major source of meaning for you.';
    }

    // Shows the result container by changing display property
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';

    // Updates result text with attachment style, description and total points
    const resultText = document.getElementById('result-text');
    resultText.innerHTML = `
        <h4 class="text-danger">${attachmentStyle}</h4>
        <p>${description}</p>
        <p class="text-muted"><small>Total Points: ${totalPoints}/20</small></p>
    `;

    // Scroll to result for better UX
    resultContainer.scrollIntoView({ behavior: 'smooth' });
} 

// Adds click listener to the show results button
const resultsButton = document.getElementById('show-result');
resultsButton.addEventListener('click', displayResult);