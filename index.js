const questionEl = document.getElementById("question");
const questionFormEl = document.getElementById("questionForm");
const scoreEl = document.getElementById("score");

let storedAnswer;
let score = 0;

// Generate a random number between min and max
const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// Generate a new question
const generateQuestion = () => {
    const num1 = randomNumber(1, 10);
    const num2 = randomNumber(1, 10);
    const questionType = randomNumber(1, 6); // 1 = Addition, 2 = Subtraction, 3 = Multiplication, 4 = Division, 5 = Percentage, 6 = Probability

    let questionText, answer;

    if (questionType === 1) {
        questionText = `Q. What is ${num1} + ${num2}?`;
        answer = num1 + num2;
    } else if (questionType === 2) {
        questionText = `Q. What is ${num1} - ${num2}?`;
        answer = num1 - num2;
    } else if (questionType === 3) {
        questionText = `Q. What is ${num1} × ${num2}?`;
        answer = num1 * num2;
    }
      else if (questionType === 4) {
          questionText = `Q. What is ${num1} / ${num2}?`;
          answer = num1 - num2;
    } else if (questionType === 5) { 
        let percentage = (num1 / num2) * 100;
        questionText = `Q. What is ${num1} as a percentage of ${num2}? (Round to 2 decimal places)`;
        answer = parseFloat(percentage.toFixed(2)); // Round to 2 decimal places 
    } else {
        let probability = num1 / (num1 + num2);
        questionText = `Q. If there are ${num1} red balls and ${num2} blue balls, what is the probability of picking a red ball? (Round to 2 decimal places)`;
        answer = parseFloat(probability.toFixed(2)); // Round to 2 decimal places
    }

    return { questionText, answer };
};

// Display the question
const showQuestion = () => {
    const { questionText, answer } = generateQuestion();
    questionEl.innerText = questionText;
    storedAnswer = answer;
};
showQuestion();

// Check the user's answer
const checkAnswer = (event) => {
    event.preventDefault();
    const formData = new FormData(questionFormEl);
    const userAnswer = parseFloat(formData.get("answer"));

    if (userAnswer === storedAnswer) {
        score += 1; // Correct answer → +1
    } else {
        score -= 1; // Wrong answer → -1
    }

    scoreEl.innerText = score; // Update score
    event.target.reset(); // Clear input field
    showQuestion(); // Load new question
};
