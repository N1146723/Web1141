// N1116445 呂宜蓁 頁面#2
const questions = [
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

let qIndex = 0;
let totalScore = 0;
let answered = false;

function updateQuestion() {
    const q = questions[qIndex];
    document.getElementById('questionText').textContent = q.question;
    document.querySelector('.quiz-question-icon').textContent = q.icon;

    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';

    for (let i = 0; i < q.options.length; i++) {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.dataset.answer = i;
        btn.textContent = q.options[i];
        btn.onclick = function () {
            selectAnswer(parseInt(this.dataset.answer));
        };
        container.appendChild(btn);
    }

    const dots = document.querySelectorAll('.progress-dot');
    for (let i = 0; i < dots.length; i++) {
        if (i === qIndex) {
            dots[i].classList.add('active');
        } else {
            dots[i].classList.remove('active');
        }
    }

    answered = false;
}

function selectAnswer(selected) {
    if (answered) return;
    answered = true;

    const q = questions[qIndex];
    const opts = document.querySelectorAll('.quiz-option');
    const dots = document.querySelectorAll('.progress-dot');

    for (let i = 0; i < opts.length; i++) {
        opts[i].style.pointerEvents = 'none';
        if (i === q.correct) {
            opts[i].classList.add('correct');
        } else if (i === selected && selected !== q.correct) {
            opts[i].classList.add('wrong');
        }
    }

    if (selected === q.correct) {
        totalScore++;
        dots[qIndex].classList.add('correct');
    } else {
        dots[qIndex].classList.add('wrong');
    }

    setTimeout(function () {
        qIndex++;
        if (qIndex < questions.length) {
            updateQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    document.getElementById('quizContent').style.display = 'none';
    const resultDiv = document.getElementById('quizResult');
    resultDiv.classList.add('show');

    const pct = (totalScore / questions.length) * 100;
    let icon, txt;

    if (pct >= 80) {
        icon = '🏆';
        txt = '狗狗知識達人！';
    } else if (pct >= 60) {
        icon = '🎉';
        txt = '表現不錯！';
    } else if (pct >= 40) {
        icon = '😊';
        txt = '繼續加油！';
    } else {
        icon = '📚';
        txt = '多學習狗狗知識吧！';
    }

    document.getElementById('resultIcon').textContent = icon;
    document.getElementById('resultText').textContent = txt;
    document.getElementById('resultScore').textContent = '你答對了 ' + totalScore + ' / ' + questions.length + ' 題';
}

// 重新開始測驗
function restartQuiz() {
    currentQ = 0;
    score = 0;
    hasAnswered = false;

    document.getElementById('quizContent').style.display = 'block';
    document.getElementById('quizResult').classList.remove('show');

    // 清除進度點的狀態
    var allDots = document.querySelectorAll('.progress-dot');
    for (var i = 0; i < allDots.length; i++) {
        allDots[i].classList.remove('correct', 'wrong');
    }

    updateQuestion();
}

// 狗品種資料庫
var dogBreeds = {
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

// 開啟品種詳細資訊彈窗
function openModal(breed) {
    var dogInfo = dogBreeds[breed];
    if (!dogInfo) return;

    document.getElementById('modalIcon').textContent = dogInfo.icon;
    document.getElementById('modalTitle').textContent = dogInfo.name;
    document.getElementById('modalSize').textContent = dogInfo.size;
    document.getElementById('modalLife').textContent = dogInfo.life;
    document.getElementById('modalExercise').textContent = dogInfo.exercise;
    document.getElementById('modalShedding').textContent = dogInfo.shedding;
    document.getElementById('modalDesc').textContent = dogInfo.desc;

    document.getElementById('breedModal').classList.add('show');
}

// 關閉彈窗
function closeModal() {
    document.getElementById('breedModal').classList.remove('show');
}


// 計算狗狗年齡對應人類年齡
function calculateAge() {
    var age = parseFloat(document.getElementById('dogAge').value);
    var size = document.getElementById('dogSize').value;

    if (isNaN(age) || age < 0) {
        alert('請輸入有效的狗狗年齡！');
        return;
    }

    var humanYears;
    var lifeStage;
    var msg;

    // 計算公式
    if (age <= 1) {
        humanYears = age * 15;
    } else if (age <= 2) {
        humanYears = 15 + (age - 1) * 9;
    } else {
        var multiplier;
        if (size === 'small') {
            multiplier = 4;
        } else if (size === 'medium') {
            multiplier = 5;
        } else {
            multiplier = 6;
        }
        humanYears = 24 + (age - 2) * multiplier;
    }

    humanYears = Math.round(humanYears);

    // 判斷生命階段
    if (humanYears <= 15) {
        lifeStage = '🐣 幼年期';
        msg = '就像小朋友一樣充滿好奇心，需要很多學習和社會化訓練！';
    } else if (humanYears <= 25) {
        lifeStage = '🎒 青少年期';
        msg = '精力旺盛、活潑好動，可能有點叛逆，需要耐心引導！';
    } else if (humanYears <= 50) {
        lifeStage = '💪 壯年期';
        msg = '身體最健康的時期，保持規律運動和均衡飲食很重要！';
    } else if (humanYears <= 70) {
        lifeStage = '🌟 中年期';
        msg = '活動量可能開始減少，要注意體重控制和定期健檢！';
    } else {
        lifeStage = '👴 老年期';
        msg = '需要更多的愛與照顧，適度運動和舒適的休息環境很重要！';
    }

    document.getElementById('humanAge').textContent = '相當於人類 ' + humanYears + ' 歲';
    document.getElementById('ageStage').textContent = lifeStage;
    document.getElementById('ageMessage').textContent = msg;
    document.getElementById('calcResult').classList.add('show');
}

// 回到頂部
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 頁面載入完成後執行
window.addEventListener('load', function () {
    // 初始化測驗
    updateQuestion();

    // 翻轉卡片
    var cards = document.querySelectorAll('.flip-card');
    for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function () {
            this.classList.toggle('flipped');
        });
    }

    // 品種卡片點擊
    var breedCards = document.querySelectorAll('.breed-card');
    for (var i = 0; i < breedCards.length; i++) {
        breedCards[i].addEventListener('click', function () {
            openModal(this.dataset.breed);
        });
    }

    // 點擊背景關閉彈窗
    document.getElementById('breedModal').addEventListener('click', function (e) {
        if (e.target === this) closeModal();
    });
});

// 滾動事件
window.addEventListener('scroll', function () {
    var btn = document.querySelector('.floating-paw');
    if (window.pageYOffset > 300) {
        btn.classList.add('show');
    } else {
        btn.classList.remove('show');
    }
});

// ESC鍵關閉彈窗
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});
