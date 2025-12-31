// N1146707 張昀萱 頁面#1
$(document).ready(function () {

    var navHeight = $(".horizontal-nav").outerHeight() || 60;

    $(".nav-link").on('click', function (event) {

        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top - navHeight - 15
            }, 800);
        }
    });

    $(".info-button").on('click', function () {

        var dinoName = $(this).data('dino');
        var infoContent = "";

        switch (dinoName) {
            case "Diplodocus":
                infoContent = "<strong>梁龍 (Diplodocus) 生態：</strong> 牠們的牙齒像釘子，只適合刮食葉片。長尾巴不僅用於防禦，最新的研究認為也可能用於平衡龐大的身軀。成年梁龍幾乎沒有天敵。";
                break;
            case "Brachiosaurus":
                infoContent = "<strong>腕龍 (Brachiosaurus) 生態：</strong> 牠們的鼻孔長在頭頂，不像其他蜥腳類。由於前腿較長，牠們可能可以抬頭夠到 15 米高的樹葉，像移動的『樹冠剪刀』。";
                break;
            case "Apatosaurus":
                infoContent = "<strong>迷惑龍 (Apatosaurus) 生態：</strong> 過去曾與另一種恐龍（布朗托龍）混淆。牠們體型粗壯，為了支撐體重，脊椎骨非常強大。幼年時期的迷惑龍可能是獸腳類的主要獵物。";
                break;
            case "Allosaurus":
                infoContent = "<strong>異特龍 (Allosaurus) 生態：</strong> 牠們的頭骨結構較輕盈，可能採取『斧頭式攻擊』，用上顎撞擊獵物，造成大量失血。化石證據顯示，異特龍會捕食劍龍和幼年蜥腳類恐龍。";
                break;
            case "Ceratosaurus":
                infoContent = "<strong>角鼻龍 (Ceratosaurus) 生態：</strong> 牠們最具特色的就是鼻子上的短角，其用途仍在爭論中，可能是用於爭奪配偶或種內威嚇。其體型小於異特龍，生態位可能類似『清道夫』或捕食較小的動物。";
                break;
            case "Stegosaurus":
                infoContent = "<strong>劍龍 (Stegosaurus) 生態：</strong> 背上的骨板用途仍在爭論，可能是用來調節體溫（散熱或吸收熱量），也可能用來吸引配偶或威嚇敵人。尾刺（稱為Thagomizer）是其主要的防禦武器。";
                break;
            case "Kentrosaurus":
                infoContent = "<strong>肯龍 (Kentrosaurus) 生態：</strong> 牠們的背部後半部和尾巴佈滿尖刺，是其最明顯的特徵。相較於劍龍，牠們的防禦性更強。牠們通常成群活動，以保護彼此免受掠食者的侵害。";
                break;
            default:
                infoContent = "未找到該恐龍的生態資訊。";
        }

        var $infoBox = $("#" + dinoName + "-info");
        $infoBox.html(infoContent);
        $infoBox.slideToggle(400);
    });

});