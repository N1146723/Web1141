// N1116445 呂宜蓁 頁面#3
var bubbleBox = document.getElementById('bubbleField');
for (var i = 0; i < 20; i++) {
    var b = document.createElement('div');
    b.className = 'bubble';
    var size = Math.random() * 40 + 15;
    b.style.width = size + 'px';
    b.style.height = size + 'px';
    b.style.left = Math.random() * 100 + '%';
    b.style.bottom = Math.random() * -100 + 'px';
    b.style.animationDuration = (Math.random() * 15 + 10) + 's';
    b.style.animationDelay = Math.random() * 5 + 's';
    bubbleBox.appendChild(b);
}

var topBtn = document.getElementById('scrollTop');
var navDots = document.querySelectorAll('.side-nav-item');
var allSections = document.querySelectorAll('section[id]');

// 更新右側導航點的active狀態
function updateNav() {
    var scroll = window.scrollY + window.innerHeight / 3;

    for (var i = 0; i < allSections.length; i++) {
        var section = allSections[i];
        var sTop = section.offsetTop;
        var sHeight = section.offsetHeight;
        var sId = section.getAttribute('id');

        if (scroll >= sTop && scroll < sTop + sHeight) {
            for (var j = 0; j < navDots.length; j++) {
                navDots[j].classList.remove('active');
                if (navDots[j].dataset.section === sId) {
                    navDots[j].classList.add('active');
                }
            }
        }
    }
}

// 向下滾動到一定距離才顯示回頂部按鈕
window.addEventListener('scroll', function () {
    updateNav();

    if (window.scrollY > 500) {
        topBtn.classList.add('visible');
    } else {
        topBtn.classList.remove('visible');
    }
});

// 點擊側邊欄平滑滾動
for (var i = 0; i < navDots.length; i++) {
    navDots[i].addEventListener('click', function () {
        var sectionId = this.dataset.section;
        var sec = document.getElementById(sectionId);
        if (sec) {
            sec.scrollIntoView({ behavior: 'smooth' });
        }
    });
}


// 生物卡片點擊展開
var cards = document.querySelectorAll('.creature-item');
for (var i = 0; i < cards.length; i++) {
    var header = cards[i].querySelector('.creature-header');
    header.addEventListener('click', function () {
        var card = this.parentElement;
        // 先把其他卡片都收起來
        for (var j = 0; j < cards.length; j++) {
            if (cards[j] !== card) {
                cards[j].classList.remove('active');
            }
        }
        card.classList.toggle('active');
    });
}

// 深度資料
var depths = {
    1: { icon: '🏄', name: '水面層', desc: '0公尺 - 陽光普照的水面，海豚、海龜在此嬉戲。浮潛者最常接觸的區域，珊瑚礁生態系豐富多彩。' },
    2: { icon: '🤿', name: '休閒潛水區', desc: '20公尺 - 大多數休閒潛水的深度，色彩繽紛的珊瑚礁、小丑魚、蝴蝶魚的家園。光線充足，適合攝影。' },
    3: { icon: '🦈', name: '進階潛水區', desc: '40公尺 - 技術潛水的起點，可能遇見礁鯊、石斑魚等較大型魚類。需要進階認證，停留時間受限。' },
    4: { icon: '🌑', name: '中層帶', desc: '200公尺 - 陽光漸暗的暮光區，生物開始發展獨特的適應能力。大型烏賊、劍魚在此巡遊。' },
    5: { icon: '✨', name: '深海帶', desc: '1000公尺 - 永恆的黑暗，生物發光成為溝通方式。燈籠魚、巨型烏賊的神秘世界。壓力極大，水溫接近冰點。' },
    6: { icon: '👽', name: '深淵帶', desc: '4000公尺 - 極端環境，卻有生命存在。透明生物、奇異的深海魚類，以海底「雪花」為食。科學家仍在探索的未知領域。' },
    7: { icon: '🌋', name: '超深淵帶', desc: '6000公尺 - 海溝地帶，極少數生物能生存。熱泉口周圍有獨特的化能生態系，不依靠陽光而存在。' },
    8: { icon: '🏆', name: '挑戰者深淵', desc: '11034公尺 - 馬里亞納海溝最深處，地球表面的最低點。壓力相當於1000大氣壓，僅少數載人潛水器到達過。' }
};

// 深度探索器
var depthBtns = document.querySelectorAll('.depth-btn');
var wheel = document.getElementById('wheelCenter');
var resultBox = document.getElementById('depthResult');

for (var i = 0; i < depthBtns.length; i++) {
    depthBtns[i].addEventListener('click', function () {
        // 移除其他按鈕的active
        for (var j = 0; j < depthBtns.length; j++) {
            depthBtns[j].classList.remove('active');
        }
        this.classList.add('active');

        var level = this.dataset.depth;
        var data = depths[level];

        // 更新中間圓圈顯示
        wheel.innerHTML = '<span class="wheel-center-icon">' + data.icon + '</span>' +
            '<p class="wheel-center-name">' + data.name + '</p>' +
            '<p class="wheel-center-hint">' + this.textContent + '</p>';

        // 更新下方文字說明
        resultBox.innerHTML = '<p class="result-desc">' + data.desc + '</p>';
    });
}

// 回到頂部按鈕功能
topBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
