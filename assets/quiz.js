/**
 * Minimal quiz widget for lessons.
 * Usage:
 * <div class="quiz" data-correct="1">
 *   <p class="quiz-prompt">Question?</p>
 *   <ul class="quiz-options">
 *     <li><button type="button">Same length choice A</button></li>
 *     <li><button type="button">Same length choice B</button></li>
 *   </ul>
 *   <p class="quiz-feedback" aria-live="polite"></p>
 * </div>
 * data-correct is the 0-based index of the correct option.
 * Optional data-ok and data-bad for feedback messages.
 */
(function () {
  function initQuiz(root) {
    const correct = Number(root.dataset.correct);
    const okMsg = root.dataset.ok || "Correct — that sticks.";
    const badMsg = root.dataset.bad || "Not quite — try again, or re-read the section above.";
    const feedback = root.querySelector(".quiz-feedback");
    const buttons = Array.from(root.querySelectorAll(".quiz-options button"));

    buttons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        const isCorrect = index === correct;
        buttons.forEach((b) => {
          b.disabled = true;
          b.classList.remove("correct", "incorrect");
        });
        btn.classList.add(isCorrect ? "correct" : "incorrect");
        if (!isCorrect) {
          buttons[correct].classList.add("correct");
        }
        if (feedback) {
          feedback.dataset.state = isCorrect ? "ok" : "bad";
          feedback.textContent = isCorrect ? okMsg : badMsg;
        }
      });
    });
  }

  document.querySelectorAll(".quiz").forEach(initQuiz);
})();
