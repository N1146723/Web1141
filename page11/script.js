// 生成背景氣泡
const bubbleField = document.getElementById('bubbleField');
for (let i = 0; i < 20; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const size = Math.random() * 40 + 15;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = Math.random() * 100 + '%';
    bubble.style.bottom = Math.random() * -100 + 'px';
    bubble.style.animationDuration = (Math.random() * 15 + 10) + 's';
    bubble.style.animationDelay = Math.random() * 5 + 's';
    bubbleField.appendChild(bubble);
}


// 導航欄元素
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

// 側邊導航功能
const sideNavItems = document.querySelectorAll('.side-nav-item');
const sections = document.querySelectorAll('section[id]');

function updateSideNav() {
    const scrollPos = window.scrollY + window.innerHeight / 3;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            sideNavItems.forEach(item => {
                item.classList.remove('active');
                if (item.dataset.section === sectionId) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// 滾動事件（合併所有 scroll 監聽器）
window.addEventListener('scroll', () => {
    // 側邊導航更新
    updateSideNav();
    
    // 回到頂部按鈕
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

sideNavItems.forEach(item => {
    item.addEventListener('click', () => {
        const sectionId = item.dataset.section;
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== 數字顯示 =====
setTimeout(() => {
    document.querySelectorAll('.hero-stat-number').forEach(num => {
        const target = parseInt(num.dataset.count);
        num.textContent = target.toLocaleString();
    });
}, 300);

// 海洋生物展開功能
const creatureItems = document.querySelectorAll('.creature-item');

creatureItems.forEach(item => {
    const header = item.querySelector('.creature-header');
    header.addEventListener('click', () => {
        creatureItems.forEach(other => {
            if (other !== item) {
                other.classList.remove('active');
            }
        });
        item.classList.toggle('active');
    });
});

// ===== 深度探索功能 =====
const depthData = {
    1: { icon: '🏄', name: '水面層', desc: '0公尺 - 陽光普照的水面，海豚、海龜在此嬉戲。浮潛者最常接觸的區域，珊瑚礁生態系豐富多彩。' },
    2: { icon: '🤿', name: '休閒潛水區', desc: '20公尺 - 大多數休閒潛水的深度，色彩繽紛的珊瑚礁、小丑魚、蝴蝶魚的家園。光線充足，適合攝影。' },
    3: { icon: '🦈', name: '進階潛水區', desc: '40公尺 - 技術潛水的起點，可能遇見礁鯊、石斑魚等較大型魚類。需要進階認證，停留時間受限。' },
    4: { icon: '🌑', name: '中層帶', desc: '200公尺 - 陽光漸暗的暮光區，生物開始發展獨特的適應能力。大型烏賊、劍魚在此巡遊。' },
    5: { icon: '✨', name: '深海帶', desc: '1000公尺 - 永恆的黑暗，生物發光成為溝通方式。燈籠魚、巨型烏賊的神秘世界。壓力極大，水溫接近冰點。' },
    6: { icon: '👽', name: '深淵帶', desc: '4000公尺 - 極端環境，卻有生命存在。透明生物、奇異的深海魚類，以海底「雪花」為食。科學家仍在探索的未知領域。' },
    7: { icon: '🌋', name: '超深淵帶', desc: '6000公尺 - 海溝地帶，極少數生物能生存。熱泉口周圍有獨特的化能生態系，不依靠陽光而存在。' },
    8: { icon: '🏆', name: '挑戰者深淵', desc: '11034公尺 - 馬里亞納海溝最深處，地球表面的最低點。壓力相當於1000大氣壓，僅少數載人潛水器到達過。' }
};

const depthBtns = document.querySelectorAll('.depth-btn');
const wheelCenter = document.getElementById('wheelCenter');
const depthResult = document.getElementById('depthResult');

depthBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        depthBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const depth = btn.dataset.depth;
        const data = depthData[depth];

        wheelCenter.innerHTML = `
            <span class="wheel-center-icon">${data.icon}</span>
            <p class="wheel-center-name">${data.name}</p>
            <p class="wheel-center-hint">${btn.textContent}</p>
        `;

        depthResult.innerHTML = `
            <p class="result-desc">${data.desc}</p>
        `;
    });
});

// 回到頂部按鈕點擊事件
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 平滑滾動
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

