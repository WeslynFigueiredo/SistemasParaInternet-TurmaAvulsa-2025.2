document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit-btn');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    const restartButton = document.getElementById('restart-btn');
    const scoreDisplay = document.getElementById('score');
    const answersContainer = document.getElementById('answers');
    
    let currentQuestion = 0;
    let userAnswers = [];
    
    // Perguntas do quiz
    const quizQuestions = [
        {
            question: "Qual é a capital do Brasil?",
            options: ["Rio de Janeiro", "Brasília", "São Paulo", "Salvador"],
            correct: 1
        },
        {
            question: "Quantos planetas existem em nosso sistema solar?",
            options: ["7", "8", "9", "10"],
            correct: 1
        },
        {
            question: "Quem pintou a Mona Lisa?",
            options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
            correct: 2
        },
        {
            question: "Qual é o maior oceano do mundo?",
            options: ["Oceano Atlântico", "Oceano Índico", "Oceano Ártico", "Oceano Pacífico"],
            correct: 3
        },
        {
            question: "Em que ano o homem pisou na Lua pela primeira vez?",
            options: ["1965", "1969", "1972", "1975"],
            correct: 1
        }
    ];
    
    // Inicializar o quiz
    function initQuiz() {
        userAnswers = new Array(quizQuestions.length).fill(null);
        buildQuiz();
        showQuestion(currentQuestion);
        updateNavigationButtons();
    }
    
    // Construir o HTML do quiz
    function buildQuiz() {
        quizContainer.innerHTML = '';
        
        quizQuestions.forEach((questionData, questionIndex) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');
            questionElement.classList.add('hidden');
            
            const questionText = document.createElement('div');
            questionText.classList.add('question-text');
            questionText.textContent = `${questionIndex + 1}. ${questionData.question}`;
            
            const optionsElement = document.createElement('div');
            optionsElement.classList.add('options');
            
            questionData.options.forEach((option, optionIndex) => {
                const optionElement = document.createElement('div');
                optionElement.classList.add('option');
                
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `question-${questionIndex}`;
                input.id = `option-${questionIndex}-${optionIndex}`;
                input.value = optionIndex;
                
                input.addEventListener('change', () => {
                    userAnswers[questionIndex] = optionIndex;
                });
                
                const label = document.createElement('label');
                label.htmlFor = `option-${questionIndex}-${optionIndex}`;
                label.textContent = option;
                
                optionElement.appendChild(input);
                optionElement.appendChild(label);
                optionsElement.appendChild(optionElement);
            });
            
            questionElement.appendChild(questionText);
            questionElement.appendChild(optionsElement);
            quizContainer.appendChild(questionElement);
        });
    }
    
    // Mostrar a pergunta atual
    function showQuestion(questionIndex) {
        const questions = document.querySelectorAll('.question');
        questions.forEach((question, index) => {
            if (index === questionIndex) {
                question.classList.remove('hidden');
            } else {
                question.classList.add('hidden');
            }
        });
        
        // Marcar a resposta selecionada anteriormente, se houver
        if (userAnswers[questionIndex] !== null) {
            const radioInput = document.querySelector(`input[name="question-${questionIndex}"][value="${userAnswers[questionIndex]}"]`);
            if (radioInput) {
                radioInput.checked = true;
            }
        }
    }
    
    // Atualizar os botões de navegação
    function updateNavigationButtons() {
        prevButton.disabled = currentQuestion === 0;
        nextButton.disabled = currentQuestion === quizQuestions.length - 1;
    }
    
    // Mostrar os resultados
    function showResults() {
        let score = 0;
        
        // Calcular a pontuação
        userAnswers.forEach((answer, index) => {
            if (answer === quizQuestions[index].correct) {
                score++;
            }
        });
        
        // Exibir a pontuação
        scoreDisplay.textContent = `Você acertou ${score} de ${quizQuestions.length} perguntas!`;
        
        // Exibir as respostas corretas e incorretas
        answersContainer.innerHTML = '';
        quizQuestions.forEach((question, index) => {
            const answerItem = document.createElement('div');
            answerItem.classList.add('answer-item');
            
            if (userAnswers[index] === question.correct) {
                answerItem.classList.add('correct-answer');
            } else {
                answerItem.classList.add('incorrect-answer');
            }
            
            const questionText = document.createElement('div');
            questionText.classList.add('answer-question');
            questionText.textContent = `${index + 1}. ${question.question}`;
            
            const correctAnswer = document.createElement('div');
            correctAnswer.classList.add('answer-correct');
            correctAnswer.textContent = `Resposta correta: ${question.options[question.correct]}`;
            
            const userAnswer = document.createElement('div');
            userAnswer.classList.add('answer-user');
            
            if (userAnswers[index] !== null) {
                userAnswer.textContent = `Sua resposta: ${question.options[userAnswers[index]]}`;
            } else {
                userAnswer.textContent = "Sua resposta: Nenhuma resposta selecionada";
            }
            
            answerItem.appendChild(questionText);
            answerItem.appendChild(correctAnswer);
            answerItem.appendChild(userAnswer);
            
            answersContainer.appendChild(answerItem);
        });
        
        // Mostrar a seção de resultados e ocultar o quiz
        quizContainer.classList.add('hidden');
        document.querySelector('.controls').classList.add('hidden');
        resultsContainer.classList.remove('hidden');
    }
    
    // Event listeners
    prevButton.addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion(currentQuestion);
            updateNavigationButtons();
        }
    });
    
    nextButton.addEventListener('click', () => {
        if (currentQuestion < quizQuestions.length - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
            updateNavigationButtons();
        }
    });
    
    submitButton.addEventListener('click', () => {
        showResults();
    });
    
    restartButton.addEventListener('click', () => {
        currentQuestion = 0;
        userAnswers = new Array(quizQuestions.length).fill(null);
        
        quizContainer.classList.remove('hidden');
        document.querySelector('.controls').classList.remove('hidden');
        resultsContainer.classList.add('hidden');
        
        showQuestion(currentQuestion);
        updateNavigationButtons();
    });
    
    // Iniciar o quiz
    initQuiz();
});