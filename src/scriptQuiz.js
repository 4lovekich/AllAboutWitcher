const questions = [
    {
        question: "Яке прізвисько Цірі отримала від мешканців Цінтри?",
        options: ["Срібне Волосся", "Львеня з Цінтри", "Ластівка", "Дитя Старшої Крові"],
        correctAnswer: "Львеня з Цінтри"
    },
    {
        question: "Як звали наставника Геральта?",
        options: ["Ескель", "Весемір", "Ламберт", "Коен"],
        correctAnswer: "Весемір"
    },
    {
        question: "Яку школу відьмаків представляє Геральт?",
        options: ["Школа Кота", "Школа Вовка", "Школа Грифона", "Школа Змії"],
        correctAnswer: "Школа Вовка"
    },
    {
        question: "Назвіть столицю Темерии.",
        options: ["Визима", "Новіград", "Оксенфурт", "Боклер"],
        correctAnswer: "Визима"
    },
    {
        question: "Яка чарівниця є коханням Геральта?",
        options: ["Трисс Мерігольд", "Йеннефер з Венгерберга", "Кейра Мец", "Фрінгілья Віго"],
        correctAnswer: "Йеннефер з Венгерберга"
    },
    {
        question: "Яке єдине місто не підкорилося Ніфльґаарду під час вторгнення?",
        options: ["Верден", "Махакам", "Туссент", "Новіград"],
        correctAnswer: "Новіград"
    },
    {
        question: "Як називається меч, який Геральт носить на спині?",
        options: ["Ластівка", "Ґвігір", "Арондит", "Немає постійної назви"],
        correctAnswer: "Немає постійної назви" // В книгах у нього немає постійної назви, в іграх по-різному
    },
    {
        question: "Хто є королем Реданії?",
        options: ["Фольтест", "Радовид V Суворий", "Емгир вар Емрейс", "Детамольд"],
        correctAnswer: "Радовид V Суворий"
    },
    {
        question: "Яке ім'я барда-друга Геральта?",
        options: ["Лютик", "Золтан", "Детлафф", "Іорвет"],
        correctAnswer: "Лютик"
    },
    {
        question: "Яка раса побудувала зруйновані руїни, що часто зустрічаються у світі Відьмака?",
        options: ["Ельфи", "Гноми", "Краснолюди", "Дріади"],
        correctAnswer: "Ельфи"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answeredQuestions = 0;

const questionScreen = document.querySelector('.question-screen');
const resultsScreen = document.querySelector('.results-screen');
const questionNumberElement = document.querySelector('.question-number');
const questionTextElement = document.querySelector('.question-text');
const optionsContainer = document.querySelector('.options-container');
const scoreElement = document.getElementById('score');
const totalQuestionsElement = document.getElementById('total-questions');
const restartQuizButton = document.getElementById('restart-quiz');

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionNumberElement.textContent = `${currentQuestionIndex + 1}.`;
        questionTextElement.textContent = currentQuestion.question;
        optionsContainer.innerHTML = ''; // Очищаємо попередні варіанти

        currentQuestion.options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectOption(optionElement, option, currentQuestion.correctAnswer));
            optionsContainer.appendChild(optionElement);
        });
        questionScreen.classList.add('active');
        resultsScreen.classList.remove('active');
    } else {
        showResults();
    }
}

function selectOption(selectedOptionElement, selectedAnswer, correctAnswer) {
    // Деактивуємо всі варіанти, щоб не можна було вибрати більше одного
    Array.from(optionsContainer.children).forEach(option => {
        option.removeEventListener('click', () => {}); // Видаляємо слухача подій
        option.classList.add('selected'); // Позначаємо вибраний
    });

    if (selectedAnswer === correctAnswer) {
        score++;
        selectedOptionElement.classList.add('correct');
    } else {
        selectedOptionElement.classList.add('incorrect');
        // Показ правильної відповіді
        Array.from(optionsContainer.children).forEach(option => {
            if (option.textContent === correctAnswer) {
                option.classList.add('correct');
            }
        });
    }

    answeredQuestions++;

    // Перехід до наступного питання через деякий час
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1500); // 1.5 секунди
}

function showResults() {
    questionScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    scoreElement.textContent = score;
    totalQuestionsElement.textContent = questions.length;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answeredQuestions = 0;
    loadQuestion();
}

restartQuizButton.addEventListener('click', restartQuiz);

// Завантажуємо перше питання при завантаженні сторінки
document.addEventListener('DOMContentLoaded', loadQuestion);