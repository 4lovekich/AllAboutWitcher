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
let score = 0;

// Отримуємо посилання на сцени з HTML
const quizPage = document.getElementById('quiz-page');
const finalPage = document.getElementById('final-page');

// Елементи вікторини
const questionNumberElement = quizPage.querySelector('.question-number');
const questionTextElement = quizPage.querySelector('.question-text');
const optionsContainer = quizPage.querySelector('.options-container');

// Елементи для фінальної сцени (вже існують в HTML)
const scoreDisplayElement = finalPage.querySelector('.score-display');
const resultTitleElement = finalPage.querySelector('.result-title');
const resultMessageElement = finalPage.querySelector('.result-message');
const goToMainButton = finalPage.querySelector('#go-to-main'); // Змінено назву змінної та ID кнопки

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

        optionsContainer.innerHTML = '';
        currentQuestion.options.forEach(optionText => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = optionText;
            optionElement.addEventListener('click', () => selectOption(optionElement, optionText, currentQuestion.correctAnswer));
            optionsContainer.appendChild(optionElement);
        });

        showScene(quizPage);
    } else {
        showFinalPageWithResults();
    }
}

// Функція вибору відповіді
function selectOption(selectedOptionElement, selectedAnswer, correctAnswer) {
    Array.from(optionsContainer.children).forEach(option => {
        option.removeEventListener('click', () => {});
        option.style.pointerEvents = 'none';
    });

    if (selectedAnswer === correctAnswer) {
        score++;
        selectedOptionElement.classList.add('correct');
    } else {
        selectedOptionElement.classList.add('incorrect');
    }

    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1500);
}

// Функція для відображення фінальної сторінки з результатами
function showFinalPageWithResults() {
    scoreDisplayElement.textContent = `${score} / ${questions.length}`;

    let title = "";
    let message = "";

    const percentage = (score / questions.length) * 100;

    if (percentage === 100) {
        title = "Ви - Відьмак!";
        message = "Вітаємо! Ваші знання про всесвіт Відьмака просто вражають! Здається, ви присвятили чимало часу вивченню монстрів, знаків та інтриг Північних Королівств. Така глибока обізнаність – це не що інше, як справжній дар. Можливо, у вас тече кров Старших, або ж ви просто народилися, щоб стати легендою. У будь-якому випадку, прийміть наші вітання – ви майже Відьмак!";
    } else if (percentage >= 70) {
        title = "Майже Відьмак!";
        message = "Чудовий результат! Ваші знання про світ Відьмака дуже солідні. Ще трохи і ви зможете конкурувати з самим Геральтом! Продовжуйте вивчати легенди та таємниці.";
    } else if (percentage >= 40) {
        title = "Учень Відьмака";
        message = "Непогано! Ви маєте базові знання про світ Відьмака, але є ще багато чого дізнатися. Не бійтеся досліджувати нові історії та персонажів!";
    } else {
        title = "Любитель пригод";
        message = "Схоже, ви тільки починаєте свій шлях у світі Відьмака. Це чудово! Попереду безліч захоплюючих пригод та нових знань. Не засмучуйтесь, адже головне - це почати!";
    }

    resultTitleElement.textContent = title;
    resultMessageElement.textContent = message;

    showScene(finalPage);
}


// ЗМІНА ТУТ: Обробник подій для кнопки "НА ГОЛОВНУ" тепер перенаправляє
goToMainButton.addEventListener('click', () => {
    window.location.href = 'main.html'; // Перенаправлення на main.html
});


// Ініціалізація: показуємо сцену вікторини при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
});