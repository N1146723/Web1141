// N1146723 鄭宜舫 (組長) 頁面#1
const mobileMenu = document.getElementById("mobileMenu");

function toggle(isOpen) {
    var classList = mobileMenu.classList;
    var openKey = "open";
    if (isOpen) {
        classList.toggle(openKey);
    } else {
        classList.remove(openKey);
    }
}

var click = "click"
// 漢堡按鈕開關
document.getElementById("menuBtn").addEventListener(click, () => {
    toggle(true);
});

// 點 X 關閉選單
document.getElementById("closeBtn").addEventListener(click, () => toggle(false));

// 點選單連結關閉
mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener(click, () => toggle(false));
});
