// N1146723 鄭宜舫 (組長) 頁面#3
function init() {
    const bodyEl = document.body;
    const chatA = document.getElementById("chatA");
    const chatB = document.getElementById("chatB");
    const inputA = document.getElementById("inputA");
    const inputB = document.getElementById("inputB");
    const sendBtns = document.querySelectorAll('.send-btn');

    const sunBtn = document.getElementById('sunBtn');
    const moonBtn = document.getElementById('moonBtn');

    if (!bodyEl.classList.contains('dark') && !bodyEl.classList.contains('light')) {
        bodyEl.classList.add('dark');
    }

    sunBtn.addEventListener('click', () => {
        bodyEl.classList.add('light');
        bodyEl.classList.remove('dark');
    });

    moonBtn.addEventListener('click', () => {
        bodyEl.classList.add('dark');
        bodyEl.classList.remove('light');
    });

    function nowTime() {
        const d = new Date();
        return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    }

    function updateTime() {
        document.querySelectorAll('.status-bar .time-display').forEach(el => {
            el.textContent = nowTime();
        });
    }
    updateTime();
    setInterval(updateTime, 1000);

    function appendMessage(targetChatEl, type, text) {
        const msg = document.createElement('div');
        msg.className = 'msg ' + type;
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.textContent = text;

        // 設定字體大小
        const target = targetChatEl.id === "chatA" ? 'A' : 'B';
        const fontSelect = document.querySelector(`.font-size-select[data-target="${target}"]`);
        bubble.style.fontSize = fontSelect.value;

        const timeEl = document.createElement('div');
        timeEl.className = 'time';
        timeEl.textContent = nowTime();

        if (type === 'outgoing') {
            msg.appendChild(timeEl);
            msg.appendChild(bubble);
        } else {
            msg.appendChild(bubble);
            msg.appendChild(timeEl);
        }

        targetChatEl.appendChild(msg);
        targetChatEl.scrollTop = targetChatEl.scrollHeight;
    }

    function postMessage(sender, text) {
        if (!text || !text.trim()) return;
        const clean = text.trim();
        if (sender === 'A') {
            appendMessage(chatA, 'outgoing', clean);
            appendMessage(chatB, 'incoming', clean);
        } else {
            appendMessage(chatB, 'outgoing', clean);
            appendMessage(chatA, 'incoming', clean);
        }
    }

    sendBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const who = btn.getAttribute('data-send-for');
            if (who === 'A') {
                postMessage('A', inputA.value);
                inputA.value = '';
            } else {
                postMessage('B', inputB.value);
                inputB.value = '';
            }
        });
    });

    inputA.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            postMessage('A', inputA.value);
            inputA.value = '';
        }
    });
    inputB.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            postMessage('B', inputB.value);
            inputB.value = '';
        }
    });

    // 同步名字與副標題
    function setupPanel(panelId, phoneSelector) {
        const panel = document.getElementById(panelId);
        const phone = document.querySelector(phoneSelector);
        const nameInput = panel.querySelector('.name-input');
        const subInput = panel.querySelector('.sub-input');
        const nameEl = phone.querySelector('.name');
        const subEl = phone.querySelector('.sub');

        nameInput.addEventListener('input', () => nameEl.textContent = nameInput.value);
        subInput.addEventListener('input', () => subEl.textContent = subInput.value);
    }

    setupPanel('panelA', '.phone[data-user="A"]');
    setupPanel('panelB', '.phone[data-user="B"]');
    // 更新整個聊天區字體大小
    document.querySelectorAll('.font-size-select').forEach(select => {
        const target = select.getAttribute('data-target');
        const chatArea = document.querySelector(`#chat${target}`);

        // 當選擇改變時
        select.addEventListener('change', () => {
            const newSize = select.value;
            chatArea.querySelectorAll('.bubble').forEach(bubble => {
                bubble.style.fontSize = newSize;
            });
        });
    });

    // 頭像選擇功能
    document.querySelectorAll('.avatar-selector').forEach(selector => {
        const target = selector.getAttribute('data-target');
        const phoneAvatar = document.querySelector(`.phone[data-user="${target}"] .avatar`);
        selector.querySelectorAll('img').forEach(img => {
            img.addEventListener('click', () => {
                selector.querySelectorAll('img').forEach(i => i.classList.remove('selected'));
                img.classList.add('selected');
                phoneAvatar.src = img.src;
            });
        });
    });

    // 預設訊息
    postMessage('B', '人生如何人生如何人生如何人生如何人生如何人生如何');
    postMessage('A', '我怎知道我怎知道我怎知道我怎知道我怎知道');
}

