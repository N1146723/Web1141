// N1146707 張昀萱 頁面#2
$(function () {

    function getCreditSum(className) {
        let sum = 0;
        $(`.${className}:checked`).each(function () {
            sum += parseInt($(this).val(), 10) || 0;
        });
        return sum;
    }

    function updateCredits() {

        const sem1_total =
            getCreditSum('proRequired1') +
            getCreditSum('proElective1') +
            getCreditSum('Fou1') +
            getCreditSum('core1') +
            getCreditSum('interest1');

        const sem2_total =
            getCreditSum('proRequired2') +
            getCreditSum('proElective2') +
            getCreditSum('core2') +
            getCreditSum('interest2');

        const sem3_total =
            getCreditSum('proRequired3') +
            getCreditSum('proElective3') +
            getCreditSum('sport3');

        const sem4_total =
            getCreditSum('proRequired4') +
            getCreditSum('proElective4') +
            getCreditSum('sport4');

        $('#sem1-total').text(`本學期學分：${sem1_total}`);
        $('#sem2-total').text(`本學期學分：${sem2_total}`);
        $('#sem3-total').text(`本學期學分：${sem3_total}`);
        $('#sem4-total').text(`本學期學分：${sem4_total}`);

        const total = sem1_total + sem2_total + sem3_total + sem4_total;
        $('#total-credit').text(total);
    }

    window.calculate = function () {
        updateCredits();

        const totalCredit = parseInt($('#total-credit').text(), 10);
        const totalCore = getCreditSum('core1') + getCreditSum('core2');
        const totalInterest = getCreditSum('interest1') + getCreditSum('interest2');

        const passGenEd =
            totalCore >= 6 ||
            (totalCore >= 4 && totalInterest >= 2);

        const passTotal = totalCredit >= 72;

        $('#result').html(`
            <h3>🎓 畢業門檻判斷</h3>
            <p>總學分：${totalCredit} / 72 ${passTotal ? '✅' : '❌'}</p>
            <p>通識門檻：${passGenEd ? '✅ 通過' : '❌ 未通過'}</p>
            <hr>
            <p style="text-align:center;font-size:1.2em;">
                <strong>${passTotal && passGenEd ? '🎉 可畢業' : '⚠️ 尚未達標'}</strong>
            </p>
        `).show();
    };

    $('.semester-block').on('change', 'input[type="checkbox"]', updateCredits);
    updateCredits();
});
