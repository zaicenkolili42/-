
function createQuiz(quizContainer, quizData) {
  const quiz = document.createElement('div');
  quiz.classList.add('quiz');

  quizData.forEach((questionData, index) => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    
    const questionParagraph = document.createElement('p');
    questionParagraph.textContent = `${index + 1}. ${questionData.question}`;
    questionElement.appendChild(questionParagraph);

    const answersElement = document.createElement('div');
    answersElement.classList.add('answers');

    questionData.answers.forEach(answer => {
      const answerElement = document.createElement('div');
      answerElement.classList.add('answer');

      const inputElement = document.createElement('input');
      inputElement.type = 'radio';
      inputElement.name = `question${index}`;
      inputElement.value = answer.text;
      if (answer.correct) {
        inputElement.dataset.correct = "true";
      }

      const labelElement = document.createElement('label');
      labelElement.textContent = answer.text;
      
      answerElement.appendChild(inputElement);
      answerElement.appendChild(labelElement);
      answersElement.appendChild(answerElement);
    });

    questionElement.appendChild(answersElement);
    quiz.appendChild(questionElement);
  });

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit';
  quiz.appendChild(submitButton);

  const resultsContainer = document.createElement('div');
  resultsContainer.classList.add('quiz-results');
  quiz.appendChild(resultsContainer);

  submitButton.addEventListener('click', () => {
    let score = 0;
    resultsContainer.innerHTML = '';

    quizData.forEach((questionData, index) => {
      const questionElement = quiz.querySelectorAll('.question')[index];
      const selectedAnswerInput = questionElement.querySelector(`input[name="question${index}"]:checked`);
      
      // Reset previous styles
      questionElement.querySelectorAll('.answer').forEach(answerEl => {
        answerEl.classList.remove('correct', 'incorrect');
      });

      if (selectedAnswerInput) {
        const isCorrect = selectedAnswerInput.dataset.correct === "true";
        if (isCorrect) {
          score++;
          selectedAnswerInput.parentElement.classList.add('correct');
        } else {
          selectedAnswerInput.parentElement.classList.add('incorrect');
          // Highlight the correct answer
          const correctAnswerInput = questionElement.querySelector('input[data-correct="true"]');
          if (correctAnswerInput) {
            correctAnswerInput.parentElement.classList.add('correct');
          }
        }
      } else {
        // If no answer is selected, just highlight the correct one
        const correctAnswerInput = questionElement.querySelector('input[data-correct="true"]');
        if (correctAnswerInput) {
          correctAnswerInput.parentElement.classList.add('correct');
        }
      }
    });

    resultsContainer.textContent = `Вы ответили правильно на ${score} из ${quizData.length} вопросов.`;
  });

  quizContainer.appendChild(quiz);
}
