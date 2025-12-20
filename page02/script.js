// N1146723 鄭宜舫 (組長) 頁面#3

    var docBody = document.body;
    var chatA = document.getElementById("chatA");
    var chatB = document.getElementById("chatB");
    var inputA = document.getElementById("inputA");
    var inputB = document.getElementById("inputB");
    var sendBtns = document.querySelectorAll('.send-btn');

    var sunBtn = document.getElementById('sunBtn');
    var moonBtn = document.getElementById('moonBtn');

    if (!docBody.classList.contains('dark') && !docBody.classList.contains('light')) {
        docBody.classList.add('dark');
    }

    sunBtn.addEventListener('click', () => {
        docBody.classList.add('light');
        docBody.classList.remove('dark');
    });

    moonBtn.addEventListener('click', () => {
        docBody.classList.add('dark');
        docBody.classList.remove('light');
    });

    function nowTime() {
        var d = new Date();
        return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    }

    function updateTime() {
        document.querySelectorAll('.status-bar .time-display').forEach(item => {
            item.textContent = nowTime();
        });
    }
    updateTime();
    setInterval(updateTime, 1000);

    function appendMessage(targetChat, type, text) {
        var msg = document.createElement('div');
        msg.className = 'msg ' + type;
        var bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.textContent = text;

        // 設定字體大小
        var target = targetChat.id === "chatA" ? 'A' : 'B';
        var fontSelect = document.querySelector(`.font-size-select[data-target="${target}"]`);
        bubble.style.fontSize = fontSelect.value;

        var timeEl = document.createElement('div');
        timeEl.className = 'time';
        timeEl.textContent = nowTime();

        if (type === 'outgoing') {
            msg.appendChild(timeEl);
            msg.appendChild(bubble);
        } else {
            msg.appendChild(bubble);
            msg.appendChild(timeEl);
        }

        targetChat.appendChild(msg);
        targetChat.scrollTop = targetChat.scrollHeight;
    }

    function postMessage(sender, text) {
        if (!text || !text.trim()) return;
        var clean = text.trim();
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
            var who = btn.getAttribute('data-send-for');
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
        var panel = document.getElementById(panelId);
        var phone = document.querySelector(phoneSelector);
        var nameInput = panel.querySelector('.name-input');
        var subInput = panel.querySelector('.sub-input');
        var nameEl = phone.querySelector('.name');
        var subEl = phone.querySelector('.sub');

        nameInput.addEventListener('input', () => nameEl.textContent = nameInput.value);
        subInput.addEventListener('input', () => subEl.textContent = subInput.value);
    }

    setupPanel('panelA', '.phone[data-user="A"]');
    setupPanel('panelB', '.phone[data-user="B"]');
    // 更新整個聊天區字體大小
    document.querySelectorAll('.font-size-select').forEach(select => {
        var target = select.getAttribute('data-target');
        var chatArea = document.querySelector(`#chat${target}`);

        // 當選擇改變時
        select.addEventListener('change', () => {
            var newSize = select.value;
            chatArea.querySelectorAll('.bubble').forEach(bubble => {
                bubble.style.fontSize = newSize;
            });
        });
    });

    // 頭像選擇功能
    document.querySelectorAll('.avatar-selector').forEach(selector => {
        var target = selector.getAttribute('data-target');
        var phoneAvatar = document.querySelector(`.phone[data-user="${target}"] .avatar`);
        selector.querySelectorAll('img').forEach(img => {
            img.addEventListener('click', () => {
                selector.querySelectorAll('img').forEach(i => i.classList.remove('selected'));
                img.classList.add('selected');
                phoneAvatar.src = img.src;
            });
        });
    });

    // 預設訊息
    postMessage('B', '你好嗎');
    postMessage('A', '我還不錯我還不錯我還不錯我還不錯我還不錯');
