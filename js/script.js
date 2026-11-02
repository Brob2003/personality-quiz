// Ensure script loading verification
console.log("script.js connected!");

// Outcomes dataset mapping score ranges to persona results
const quizOutcomes = [
  {
    minScore: 4,
    maxScore: 6,
    title: "⚡ The Powerhouse Champion",
    description: "You rely on raw strength, courage, and direct action. You never back down from a fight and are always the first to stand between danger and innocent people."
  },
  {
    minScore: 7,
    maxScore: 9,
    title: "🧠 The Tech Strategist",
    description: "Your superpower is your brain. You outsmart opponents with high-tech solutions, calculated plans, and cutting-edge innovations."
  },
  {
    minScore: 10,
    maxScore: 12,
    title: "🦇 The Tactical Guardian",
    description: "You operate quietly, efficiently, and strategically from the shadows. You analyze security risks and execute precise solutions."
  }
];

// DOM element references
const questionBlocks = document.querySelectorAll(".question-block");
const submitBtn = document.getElementById("submit-btn");
const errorMsg = document.getElementById("error-msg");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const resultTitle = document.getElementById("result-title");
const resultDesc = document.getElementById("result-desc");
const restartBtn = document.getElementById("restart-btn");

/**
 * Attaches event listeners to every answer button inside each question block.
 * Toggles the 'selected' class within that specific block.
 */
questionBlocks.forEach((block) => {
  const buttons = block.querySelectorAll(".answer-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Clear 'selected' from all buttons in THIS question block only
      buttons.forEach((b) => b.classList.remove("selected"));

      // Mark the clicked button as selected
      btn.classList.add("selected");
      
      // Hide error message if active
      errorMsg.classList.add("d-none");
    });
  });
});

/**
 * Validates selections, calculates total score, and renders the result.
 */
function displayResult() {
  const selectedButtons = document.querySelectorAll(".answer-btn.selected");

  // Check if all questions have been answered
  if (selectedButtons.length < questionBlocks.length) {
    errorMsg.classList.remove("d-none");
    return;
  }

  // Tally score from data-score attributes
  let totalScore = 0;
  selectedButtons.forEach((btn) => {
    totalScore += parseInt(btn.getAttribute("data-score"), 10);
  });

  // Find corresponding outcome
  const outcome = quizOutcomes.find(
    (o) => totalScore >= o.minScore && totalScore <= o.maxScore
  );

  // Update DOM elements with outcome content
  if (outcome) {
    resultTitle.textContent = outcome.title;
    resultDesc.textContent = outcome.description;

    // Swap views
    quizContainer.classList.add("d-none");
    resultContainer.classList.remove("d-none");
  }
}

/**
 * Resets the quiz to original state.
 */
function resetQuiz() {
  // Deselect all buttons
  document.querySelectorAll(".answer-btn").forEach((btn) => {
    btn.classList.remove("selected");
  });

  // Reset view visibility
  resultContainer.classList.add("d-none");
  quizContainer.classList.remove("d-none");
  errorMsg.classList.add("d-none");

  // Scroll smoothly back to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Event Listeners
submitBtn.addEventListener("click", displayResult);
restartBtn.addEventListener("click", resetQuiz);