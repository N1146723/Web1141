let score = 0;
        let highScore = localStorage.getItem('mathHighScore') || 0;
        let currentQ = { a: 0, b: 0, ans: 0 };

        document.getElementById('highScore').innerText = highScore;

        
        const table = document.getElementById('multiplicationTable');
        for (let i = 1; i <= 9; i++) {
            for (let j = 1; j <= 9; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.innerHTML = `${i}×${j}<br><span>${i*j}</span>`;
                table.appendChild(cell);
            }
        }

        function generateQuestion() {
            currentQ.a = Math.floor(Math.random() * 9) + 1;
            currentQ.b = Math.floor(Math.random() * 9) + 1;
            currentQ.ans = currentQ.a * currentQ.b;
            document.getElementById('question').innerText = `${currentQ.a} × ${currentQ.b}`;
            document.getElementById('answerInput').value = '';
            document.getElementById('answerInput').focus();
        }

        function checkAnswer() {
            const userAns = parseInt(document.getElementById('answerInput').value);
            const feedback = document.getElementById('feedback');
            
            if (userAns === currentQ.ans) {
                score += 10;
                feedback.innerText = "^^ 太厲害了！+10分";
                feedback.style.color = "#006266";
                updateRank();
                if (score > highScore) {
                    highScore = score;
                    localStorage.setItem('mathHighScore', highScore);
                    document.getElementById('highScore').innerText = highScore;
                }
                setTimeout(generateQuestion, 1000);
            } else {
                score = Math.max(0, score - 5); // 答錯扣 5 分，最低 0 分
                feedback.innerText = "❌ 差一點點，再想一下！";
                feedback.style.color = "#d63031";
            }
            document.getElementById('currentScore').innerText = score;
        }

        function updateRank() {
            const rankDisplay = document.getElementById('rank-display');
            if (score >= 200) rankDisplay.innerText = "目前稱號：乘法傳說 ★★★";
            else if (score >= 150) rankDisplay.innerText = "目前稱號：乘法英雄 ★★";
            else if (score >= 100) rankDisplay.innerText = "目前稱號：乘法大師 ★";
            else if (score >= 50) rankDisplay.innerText = "目前稱號：乘法戰士 ";
            else rankDisplay.innerText = "目前稱號：乘法小學徒 @@";
        }

        generateQuestion();