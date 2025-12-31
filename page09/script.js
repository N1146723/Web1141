// N1116445 呂宜蓁 頁面#1
var cafes = [
    { name: 'Tropo Coffee', lat: 25.0330, lng: 121.5654, district: '信義區', desc: '摩登復古的迷人空間' },
    { name: '汩咖啡', lat: 25.0590, lng: 121.5570, district: '松山區', desc: '鐵皮屋裡的日式侘寂空間' },
    { name: '真拾生活', lat: 25.0600, lng: 121.5580, district: '松山區', desc: '北歐鄉村風Brunch Cafe' },
    { name: 'PECKISH Bakery', lat: 25.0605, lng: 121.5590, district: '松山區', desc: '設計感可頌專賣Cafe' },
    { name: 'PAUSE studio', lat: 25.0595, lng: 121.5598, district: '松山區', desc: '民生社區純白韓系咖啡廳' },
    { name: 'ALL DAY ROASTING', lat: 25.0585, lng: 121.5575, district: '松山區', desc: '工業風自家烘焙咖啡' },
    { name: 'CAFEAO', lat: 25.0610, lng: 121.5595, district: '松山區', desc: '陳冠希創立咖啡新品牌' },
    { name: '好日子咖啡', lat: 25.0620, lng: 121.5600, district: '松山區', desc: '感受延壽街日常氛圍' },
    { name: '春秋書店', lat: 25.0539, lng: 121.5246, district: '中山區', desc: '赤峰街老宅的文青咖啡' },
    { name: 'Hoto Cafe', lat: 25.0630, lng: 121.5280, district: '中山區', desc: '公園旁日系咖啡甜點店' },
    { name: 'Keystone Coffee', lat: 25.0640, lng: 121.5290, district: '中山區', desc: '職人烘焙咖啡' },
    { name: '時差 Jetlag', lat: 25.0545, lng: 121.5250, district: '中山區', desc: '香港空少打造的咖啡角落' },
    { name: '好物 Spirit', lat: 25.0340, lng: 121.5440, district: '大安區', desc: '復古歐風老宅' },
    { name: 'Tamed Fox', lat: 25.0360, lng: 121.5450, district: '大安區', desc: '舒心美式Cafe健康蔬食' },
    { name: '幻猻家咖啡', lat: 25.0539, lng: 121.5195, district: '大同區', desc: '踏進去穿越到京都' },
    { name: '黑露咖啡', lat: 25.0550, lng: 121.5200, district: '大同區', desc: '營業至深夜的京都古風咖啡廳' },
    { name: 'Modern Mode', lat: 25.0560, lng: 121.5100, district: '大同區', desc: '大稻埕裡的巴黎復古咖啡廳' },
    { name: '羊毛與花 光點', lat: 25.0520, lng: 121.5230, district: '大同區', desc: '比鄰城市電影院的採光咖啡廳' },
    { name: '直物文具Cafe', lat: 25.0420, lng: 121.5180, district: '中正區', desc: '台灣首間文具咖啡廳' },
    { name: 'MKCR 山小孩咖啡', lat: 25.0490, lng: 121.5140, district: '中正區', desc: '北門旁品質自烘咖啡' },
    { name: '野人花園', lat: 25.1019, lng: 121.5512, district: '士林區', desc: '沈浸在山中森林的無限時祕境' },
    { name: '豆留森林', lat: 25.1280, lng: 121.5450, district: '士林區', desc: '陽明山下CAMA竹林老宅特別店' },
    { name: '好樣秘境', lat: 25.1369, lng: 121.5473, district: '士林區', desc: '菁山路上的純白靜謐花園' },
    { name: '文心藝所', lat: 25.0820, lng: 121.5880, district: '內湖區', desc: '最美書店裡閱讀和喝咖啡' },
    { name: '穠咖啡', lat: 25.1370, lng: 121.5010, district: '北投區', desc: '必嚐酒香提拉米蘇、創意調酒咖啡' },
    { name: '山上聊', lat: 25.1520, lng: 121.5150, district: '北投區', desc: '呼吸芬多精擼貓的祕密花園' }
];

var myMap;
var allMarkers = [];

window.addEventListener('load', function () {
    // 初始化地圖 (中心點設在台北市中心)
    myMap = L.map('map').setView([25.0478, 121.5318], 12);

    // 載入地圖圖層
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(myMap);

    // 在地圖上加標記
    for (var i = 0; i < cafes.length; i++) {
        var cafe = cafes[i];
        var icon = L.divIcon({
            className: 'custom-marker',
            html: '<div class="marker-pin"><span class="marker-icon">☕</span></div>',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        });

        var m = L.marker([cafe.lat, cafe.lng], { icon: icon })
            .addTo(myMap)
            .bindPopup(
                '<div style="text-align: center; min-width: 180px;">' +
                '<strong style="font-size: 1.1rem; color: #5d4037; display: block; margin-bottom: 8px;">' + cafe.name + '</strong>' +
                '<span style="font-size: 0.85rem; color: #8d6e63; display: block; margin-bottom: 5px;">📍 ' + cafe.district + '</span>' +
                '<span style="font-size: 0.85rem; color: #666; display: block; margin-bottom: 10px;">' + cafe.desc + '</span>' +
                '<a href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(cafe.name + ' ' + cafe.district + ' 台北') + '" ' +
                'target="_blank" ' +
                'style="color: #d4a574; text-decoration: none; font-weight: bold; font-size: 0.85rem;">' +
                '🗺️ 在 Google 地圖中查看' +
                '</a>' +
                '</div>'
            );

        allMarkers.push(m);
    }

    // 點擊卡片(地圖會移動到對應位置)
    var cards = document.querySelectorAll('.cafe-card');
    for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function () {
            // 清除其他卡片的 active
            for (var j = 0; j < cards.length; j++) {
                cards[j].classList.remove('active');
            }
            this.classList.add('active');

            var loc = this.getAttribute('data-location');
            var name = this.getAttribute('data-name');

            if (loc && myMap) {
                var coords = loc.split(',');
                var lat = parseFloat(coords[0]);
                var lng = parseFloat(coords[1]);

                // 地圖移動到所選卡片位置並放大
                myMap.setView([lat, lng], 16, {
                    animate: true,
                    duration: 1
                });

                // 打開對應卡片標記的popup
                for (var k = 0; k < cafes.length; k++) {
                    if (cafes[k].name === name) {
                        allMarkers[k].openPopup();
                        break;
                    }
                }
            }

            // 手機版自動跳到地圖
            if (window.innerWidth <= 1200) {
                var mapSection = document.querySelector('.map-section');
                var navbar = document.querySelector('.navbar');
                if (mapSection && navbar) {
                    var targetTop = mapSection.getBoundingClientRect().top + window.pageYOffset - navbar.offsetHeight - 10;
                    window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
                    setTimeout(function () {
                        myMap.invalidateSize();
                    }, 400);
                }
            }
        });
    }

    // 篩選按鈕功能
    var filterBtns = document.querySelectorAll('.filter-btn');
    var countDisplay = document.getElementById('currentCount');
    var filterHead = document.getElementById('filterHeader');
    var filterBody = document.getElementById('filterContent');
    var toggleIcon = filterHead.querySelector('.filter-toggle');

    // 篩選器展開收合
    filterHead.addEventListener('click', function () {
        filterBody.classList.toggle('collapsed');
        toggleIcon.classList.toggle('collapsed');
    });

    // 行政區篩選
    for (var i = 0; i < filterBtns.length; i++) {
        filterBtns[i].addEventListener('click', function () {
            // 更新active狀態
            for (var j = 0; j < filterBtns.length; j++) {
                filterBtns[j].classList.remove('active');
            }
            this.classList.add('active');

            var dist = this.getAttribute('data-district');
            var count = 0;

            // 顯示或隱藏卡片和標記
            for (var k = 0; k < cards.length; k++) {
                var cardDist = cards[k].getAttribute('data-district');

                if (dist === 'all' || cardDist === dist) {
                    cards[k].style.display = 'block';
                    count++;
                    if (allMarkers[k]) allMarkers[k].addTo(myMap);
                } else {
                    cards[k].style.display = 'none';
                    if (allMarkers[k]) allMarkers[k].remove();
                }
            }

            countDisplay.textContent = count;

            // 調整地圖顯示範圍
            if (dist !== 'all' && count > 0) {
                var visibleMarkers = [];
                for (var m = 0; m < cards.length; m++) {
                    if (cards[m].getAttribute('data-district') === dist && allMarkers[m]) {
                        visibleMarkers.push(allMarkers[m]);
                    }
                }

                if (visibleMarkers.length > 0) {
                    var group = L.featureGroup(visibleMarkers);
                    myMap.fitBounds(group.getBounds(), { padding: [50, 50] });
                }
            } else if (dist === 'all') {
                myMap.setView([25.0478, 121.5318], 12);
            }
        });
    }

    // 回到頂部按鈕
    var backToTop = document.querySelector('.floating-btn');
    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// 滾動一段距離顯示回到頂部按鈕
window.addEventListener('scroll', function () {
    var btn = document.querySelector('.floating-btn');
    if (btn) {
        if (window.pageYOffset > 300) {
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
        } else {
            btn.style.opacity = '0';
            btn.style.pointerEvents = 'none';
        }
    }
});