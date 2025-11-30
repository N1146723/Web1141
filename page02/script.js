/*****************************/
/* N1146723 (組長) 第3個頁面 */
/*****************************/
function init() {
    const bodyEl = document.body;

    const chatA = document.getElementById("chatA");
    const chatB = document.getElementById("chatB");
    const inputA = document.getElementById("inputA");
    const inputB = document.getElementById("inputB");
    const sendBtns = document.querySelectorAll('.send-btn');

    const sunBtn = document.getElementById('sunBtn');
    const moonBtn = document.getElementById('moonBtn');

    // 預設 dark
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

    function appendMessage(targetChatEl, type, text) {
        const msg = document.createElement('div');
        msg.className = 'msg ' + type;

        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.textContent = text;

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

    inputA.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            postMessage('A', inputA.value);
            inputA.value = '';
        }
    });
    inputB.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            postMessage('B', inputB.value);
            inputB.value = '';
        }
    });

    // 預設訊息
    postMessage('B', '人生如何人生如何人生如何人生如何人生如何人生如何');
    postMessage('A', '我怎知道我怎知道我怎知道我怎知道我怎知道');
}

