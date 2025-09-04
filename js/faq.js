document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll(".accordion-question");

  questions.forEach((question) => {
    question.addEventListener("click", () => {
      const currentlyActive = document.querySelector(
        ".accordion-question.active"
      );
      if (currentlyActive && currentlyActive !== question) {
        currentlyActive.classList.remove("active");
        currentlyActive.nextElementSibling.style.maxHeight = null;
      }

      question.classList.toggle("active");
      const answer = question.nextElementSibling;

      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
});
