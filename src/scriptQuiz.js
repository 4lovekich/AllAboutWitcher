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
        correctAnswer: "Немає постійної назви"
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
let score = 0; // Бали все ще підраховуються, хоча не відображаються на фінальній сцені

// Отримуємо посилання на всі сцени
const quizPage = document.getElementById('quiz-page');
const finalPage = document.getElementById('final-page'); // Перейменовано з landing-page

// Елементи вікторини (в межах quizPage)
const questionScreen = quizPage.querySelector('.question-screen');
const questionNumberElement = quizPage.querySelector('.question-number');
const questionTextElement = quizPage.querySelector('.question-text');
const optionsContainer = quizPage.querySelector('.options-container');

// Кнопка для переходу з Final Page на Quiz Page
const restartQuizFromFinalButton = document.getElementById('restart-quiz-from-final');


// Функція для показу певної сцени
function showScene(sceneToShow) {
    quizPage.classList.remove('active-scene');
    finalPage.classList.remove('active-scene');

    sceneToShow.classList.add('active-scene');
}

// Функція для завантаження питання
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
        showScene(quizPage); // Показуємо сцену вікторини
    } else {
        // Якщо питання закінчились, показуємо фінальну сцену
        showScene(finalPage);
        // Можна тут вивести на консоль для перевірки, скільки балів набрано
        console.log(`Вікторина завершена! Ви набрали ${score} балів з ${questions.length}.`);
    }
}

// Функція вибору відповіді
function selectOption(selectedOptionElement, selectedAnswer, correctAnswer) {
    // Видаляємо слухачів подій з усіх варіантів, щоб уникнути повторних кліків
    Array.from(optionsContainer.children).forEach(option => {
        const newOption = option.cloneNode(true);
        option.parentNode.replaceChild(newOption, option);
    });

    selectedOptionElement.classList.add('selected');

    if (selectedAnswer === correctAnswer) {
        score++;
        selectedOptionElement.classList.add('correct');
    } else {
        selectedOptionElement.classList.add('incorrect');
        Array.from(optionsContainer.children).forEach(option => {
            if (option.textContent === correctAnswer) {
                option.classList.add('correct');
            }
        });
    }

    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1500); // 1.5 секунди
}


// Обробник подій для кнопки "Я З ВАМИ!" на фінальній сторінці
restartQuizFromFinalButton.addEventListener('click', () => {
    currentQuestionIndex = 0; // Скидаємо індекс питання
    score = 0; // Скидаємо бали
    loadQuestion(); // Завантажуємо перше питання вікторини
});


// Ініціалізація: показуємо сцену вікторини при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    loadQuestion(); // Починаємо одразу з вікторини
});