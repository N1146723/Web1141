// 咖啡廳資料（26間）
const cafes = [
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

// 初始化地圖
let map;
let markers = [];

window.addEventListener('load', function() {
    // 初始化地圖（台北市中心）
    map = L.map('map').setView([25.0478, 121.5318], 12);
    
    // 添加地圖圖層（使用 OpenStreetMap）
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    // 添加咖啡廳標記
    cafes.forEach((cafe, index) => {
        // 創建自定義圖標
        const coffeeIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div class="marker-pin"><span class="marker-icon">☕</span></div>`,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        });
        
        // 添加標記
        const marker = L.marker([cafe.lat, cafe.lng], { icon: coffeeIcon })
            .addTo(map)
            .bindPopup(`
                <div style="text-align: center; min-width: 180px;">
                    <strong style="font-size: 1.1rem; color: #5d4037; display: block; margin-bottom: 8px;">${cafe.name}</strong>
                    <span style="font-size: 0.85rem; color: #8d6e63; display: block; margin-bottom: 5px;">📍 ${cafe.district}</span>
                    <span style="font-size: 0.85rem; color: #666; display: block; margin-bottom: 10px;">${cafe.desc}</span>
                    <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cafe.name + ' ' + cafe.district + ' 台北')}" 
                    target="_blank" 
                    style="color: #d4a574; text-decoration: none; font-weight: bold; font-size: 0.85rem;">
                    🗺️ 在 Google 地圖中查看
                    </a>
                </div>
            `);
        
        markers.push(marker);
    });
    
});

// 咖啡廳卡片點擊互動
const cards = document.querySelectorAll('.cafe-card');

cards.forEach((card, index) => {
    card.addEventListener('click', function() {
        // 移除所有active狀態
        cards.forEach(c => c.classList.remove('active'));
        
        // 添加當前active狀態
        this.classList.add('active');
        
        // 獲取位置資料
        const location = this.getAttribute('data-location');
        const name = this.getAttribute('data-name');
        
        // 更新地圖到對應位置
        if (location && map) {
            const [lat, lng] = location.split(',');
            map.setView([parseFloat(lat), parseFloat(lng)], 16, {
                animate: true,
                duration: 1
            });
            
            // 找到並打開對應的標記彈出視窗
            const markerIndex = cafes.findIndex(cafe => cafe.name === name);
            if (markerIndex !== -1 && markers[markerIndex]) {
                markers[markerIndex].openPopup();
            }
        }

        // 手機/平板版：滾動到地圖區域
        if (window.innerWidth <= 1200) {
            const mapSection = document.querySelector('.map-section');
            const navbar = document.querySelector('.navbar');
            if (mapSection) {
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetTop = mapSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 10;
                window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
                // Leaflet 在尺寸/位置變動後偶爾需要重算，避免出現空白或裁切
                if (map) {
                    setTimeout(() => map.invalidateSize(), 400);
                }
            }
        }
    });
});

// 區域篩選功能
const filterBtns = document.querySelectorAll('.filter-btn');
const currentCount = document.getElementById('currentCount');
const filterHeader = document.getElementById('filterHeader');
const filterContent = document.getElementById('filterContent');
const filterToggle = filterHeader.querySelector('.filter-toggle');

// 摺疊/展開功能
filterHeader.addEventListener('click', function() {
    filterContent.classList.toggle('collapsed');
    filterToggle.classList.toggle('collapsed');
});

// 篩選按鈕功能
filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // 移除所有按鈕的 active 狀態
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // 添加當前按鈕的 active 狀態
        this.classList.add('active');
        
        // 獲取篩選的區域
        const district = this.getAttribute('data-district');
        
        let visibleCount = 0;
        
        // 篩選咖啡廳卡片
        cards.forEach((card, index) => {
            const cardDistrict = card.getAttribute('data-district');
            
            if (district === 'all' || cardDistrict === district) {
                card.style.display = 'block';
                visibleCount++;
                
                // 顯示對應的地圖標記
                if (markers[index]) {
                    markers[index].addTo(map);
                }
            } else {
                card.style.display = 'none';
                
                // 隱藏對應的地圖標記
                if (markers[index]) {
                    markers[index].remove();
                }
            }
        });
        
        // 更新計數
        currentCount.textContent = visibleCount;
        
        // 調整地圖視角以顯示所有可見標記
        if (district !== 'all' && visibleCount > 0) {
            // 創建包含所有可見標記的邊界
            const visibleMarkers = [];
            cards.forEach((card, index) => {
                const cardDistrict = card.getAttribute('data-district');
                if (cardDistrict === district && markers[index]) {
                    visibleMarkers.push(markers[index]);
                }
            });
            
            if (visibleMarkers.length > 0) {
                const group = L.featureGroup(visibleMarkers);
                map.fitBounds(group.getBounds(), { padding: [50, 50] });
            }
        } else if (district === 'all') {
            // 重置到台北市中心視角
            map.setView([25.0478, 121.5318], 12);
        }
    });
});

// 浮動按鈕功能
const floatingBtn = document.querySelector('.floating-btn');
floatingBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 滾動時顯示/隱藏浮動按鈕
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        floatingBtn.style.opacity = '1';
        floatingBtn.style.pointerEvents = 'auto';
    } else {
        floatingBtn.style.opacity = '0';
        floatingBtn.style.pointerEvents = 'none';
    }
});
