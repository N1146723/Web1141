// 測驗題目資料
const quizData = [
    {
        question: "狗狗的嗅覺比人類強多少倍？",
        options: ["10 倍", "100 倍", "10,000 倍以上", "1,000 倍"],
        correct: 2,
        icon: "👃"
    },
    {
        question: "成年狗狗有幾顆牙齒？",
        options: ["28 顆", "32 顆", "42 顆", "36 顆"],
        correct: 2,
        icon: "🦷"
    },
    {
        question: "狗狗主要靠什麼方式散熱？",
        options: ["流汗", "喘氣", "搖尾巴", "泡水"],
        correct: 1,
        icon: "🌡️"
    },
    {
        question: "狗狗能看到什麼顏色？",
        options: ["完全色盲", "只有黑白", "藍色和黃色", "跟人類一樣"],
        correct: 2,
        icon: "🎨"
    },
    {
        question: "幼犬一天大約需要睡多少小時？",
        options: ["8-10 小時", "12-14 小時", "18-20 小時", "24 小時"],
        correct: 2,
        icon: "💤"
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

// 更新題目
function updateQuestion() {
    const question = quizData[currentQuestion];
    document.getElementById('questionText').textContent = question.question;
    document.querySelector('.quiz-question-icon').textContent = question.icon;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.dataset.answer = index;
        btn.textContent = option;
        btn.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(btn);
    });

    // 更新進度點
    document.querySelectorAll('.progress-dot').forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentQuestion) {
            dot.classList.add('active');
        }
    });

    answered = false;
}

function selectAnswer(selected) {
    if (answered) return;
    answered = true;

    const question = quizData[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    const progressDots = document.querySelectorAll('.progress-dot');

    options.forEach((option, index) => {
        option.style.pointerEvents = 'none';
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selected && selected !== question.correct) {
            option.classList.add('wrong');
        }
    });

    if (selected === question.correct) {
        score++;
        progressDots[currentQuestion].classList.add('correct');
    } else {
        progressDots[currentQuestion].classList.add('wrong');
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            updateQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    document.getElementById('quizContent').style.display = 'none';
    const result = document.getElementById('quizResult');
    result.classList.add('show');

    const percentage = (score / quizData.length) * 100;
    let icon, text;

    if (percentage >= 80) {
        icon = '🏆';
        text = '狗狗知識達人！';
    } else if (percentage >= 60) {
        icon = '🎉';
        text = '表現不錯！';
    } else if (percentage >= 40) {
        icon = '😊';
        text = '繼續加油！';
    } else {
        icon = '📚';
        text = '多學習狗狗知識吧！';
    }

    document.getElementById('resultIcon').textContent = icon;
    document.getElementById('resultText').textContent = text;
    document.getElementById('resultScore').textContent = `你答對了 ${score} / ${quizData.length} 題`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;

    document.getElementById('quizContent').style.display = 'block';
    document.getElementById('quizResult').classList.remove('show');
    
    document.querySelectorAll('.progress-dot').forEach(dot => {
        dot.classList.remove('correct', 'wrong');
    });

    updateQuestion();
}

// 狗狗品種資料
const breedData = {
    golden: {
        icon: '🦮',
        name: '黃金獵犬',
        size: '大型犬',
        life: '10-12年',
        exercise: '高',
        shedding: '多',
        desc: '黃金獵犬以其溫和友善的性格著稱，是最受歡迎的家庭犬之一。牠們聰明易訓練，非常適合作為導盲犬或治療犬。需要大量運動和互動。'
    },
    corgi: {
        icon: '🐕',
        name: '柯基犬',
        size: '小型犬',
        life: '12-15年',
        exercise: '中高',
        shedding: '多',
        desc: '柯基犬原是威爾斯的牧牛犬，以短腿長身聞名。牠們聰明、警覺且充滿活力，需要適度運動。是英國女王最愛的犬種！'
    },
    husky: {
        icon: '🐺',
        name: '哈士奇',
        size: '中大型犬',
        life: '12-14年',
        exercise: '非常高',
        shedding: '多',
        desc: '哈士奇是西伯利亞的雪橇犬，精力極度旺盛。牠們友善但較獨立，喜歡「唱歌」而不是吠叫。需要大量運動否則會拆家！'
    },
    shiba: {
        icon: '🐕‍🦺',
        name: '柴犬',
        size: '中型犬',
        life: '12-15年',
        exercise: '中',
        shedding: '多（換毛期）',
        desc: '柴犬是日本最古老的犬種之一，以獨立、固執和忠誠著稱。牠們表情豐富，是網路迷因的常客。需要耐心訓練。'
    },
    poodle: {
        icon: '🐩',
        name: '貴賓犬',
        size: '多種尺寸',
        life: '12-15年',
        exercise: '中高',
        shedding: '極少',
        desc: '貴賓犬是最聰明的犬種之一，不容易掉毛，適合過敏體質的人。牠們優雅活潑，需要定期美容修剪。'
    },
    bulldog: {
        icon: '🐶',
        name: '法國鬥牛犬',
        size: '小型犬',
        life: '10-12年',
        exercise: '低',
        shedding: '少',
        desc: '法鬥以可愛的蝙蝠耳和扁臉著稱，個性溫和愛撒嬌。不需要大量運動，但要注意呼吸系統和散熱問題。'
    },
    labrador: {
        icon: '🦴',
        name: '拉布拉多',
        size: '大型犬',
        life: '10-12年',
        exercise: '高',
        shedding: '多',
        desc: '拉布拉多連續多年蟬聯最受歡迎犬種。牠們溫順、聰明、好訓練，是優秀的工作犬和家庭伴侶犬。超愛游泳和叼東西！'
    },
    chihuahua: {
        icon: '🐕',
        name: '吉娃娃',
        size: '超小型犬',
        life: '12-20年',
        exercise: '低',
        shedding: '少-中',
        desc: '吉娃娃是世界上最小的犬種，但性格勇敢、忠誠且警覺。牠們壽命很長，但需要注意保暖和避免劇烈運動。'
    }
};

// 開啟品種彈窗
function openModal(breed) {
    const data = breedData[breed];
    if (!data) return;

    document.getElementById('modalIcon').textContent = data.icon;
    document.getElementById('modalTitle').textContent = data.name;
    document.getElementById('modalSize').textContent = data.size;
    document.getElementById('modalLife').textContent = data.life;
    document.getElementById('modalExercise').textContent = data.exercise;
    document.getElementById('modalShedding').textContent = data.shedding;
    document.getElementById('modalDesc').textContent = data.desc;

    document.getElementById('breedModal').classList.add('show');
}

function closeModal() {
    document.getElementById('breedModal').classList.remove('show');
}

// 點擊彈窗外部關閉
document.getElementById('breedModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// 品種卡片點擊事件
document.querySelectorAll('.breed-card').forEach(card => {
    card.addEventListener('click', function() {
        const breed = this.dataset.breed;
        openModal(breed);
    });
});

// 狗狗年齡計算
function calculateAge() {
    const dogAge = parseFloat(document.getElementById('dogAge').value);
    const dogSize = document.getElementById('dogSize').value;

    if (isNaN(dogAge) || dogAge < 0) {
        alert('請輸入有效的狗狗年齡！');
        return;
    }

    let humanAge;
    let stage;
    let message;

    // 根據體型計算人類年齡（更精確的換算方式）
    if (dogAge <= 1) {
        humanAge = dogAge * 15;
    } else if (dogAge <= 2) {
        humanAge = 15 + (dogAge - 1) * 9;
    } else {
        let yearMultiplier;
        if (dogSize === 'small') {
            yearMultiplier = 4;
        } else if (dogSize === 'medium') {
            yearMultiplier = 5;
        } else {
            yearMultiplier = 6;
        }
        humanAge = 24 + (dogAge - 2) * yearMultiplier;
    }

    humanAge = Math.round(humanAge);

    // 判斷生命階段
    if (humanAge <= 15) {
        stage = '🐣 幼年期';
        message = '就像小朋友一樣充滿好奇心，需要很多學習和社會化訓練！';
    } else if (humanAge <= 25) {
        stage = '🎒 青少年期';
        message = '精力旺盛、活潑好動，可能有點叛逆，需要耐心引導！';
    } else if (humanAge <= 50) {
        stage = '💪 壯年期';
        message = '身體最健康的時期，保持規律運動和均衡飲食很重要！';
    } else if (humanAge <= 70) {
        stage = '🌟 中年期';
        message = '活動量可能開始減少，要注意體重控制和定期健檢！';
    } else {
        stage = '👴 老年期';
        message = '需要更多的愛與照顧，適度運動和舒適的休息環境很重要！';
    }

    document.getElementById('humanAge').textContent = `相當於人類 ${humanAge} 歲`;
    document.getElementById('ageStage').textContent = stage;
    document.getElementById('ageMessage').textContent = message;
    document.getElementById('calcResult').classList.add('show');
}

// 回到頂部
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 翻轉卡片觸摸支援
document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', function() {
        this.classList.toggle('flipped');
    });
});

// 初始化
window.addEventListener('load', function() {
    updateQuestion();
});

// 滾動事件監聽 - 控制浮動按鈕顯示/隱藏
window.addEventListener('scroll', function() {
    const floatingPaw = document.querySelector('.floating-paw');
    if (window.pageYOffset > 300) {
        floatingPaw.classList.add('show');
    } else {
        floatingPaw.classList.remove('show');
    }
});

// ESC 鍵關閉彈窗
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});
