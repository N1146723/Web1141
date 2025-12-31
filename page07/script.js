// N1146743 楊亦嵐 頁面#2
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('感謝您的預約！我們已收到您的資訊，將儘快由專人與您電話確認。');
    this.reset();
});

const dateInput = document.getElementById('booking-date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}