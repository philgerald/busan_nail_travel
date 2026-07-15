// ============================================================
// 釜山之旅 — 行程資料檔
// 之後要改行程、加景點，只要改這個檔案，不用動 index.html
// ============================================================

const TRIP = {
  title: "釜山之旅 ✈️",
  dateRange: "2026/8/18（二）～ 8/23（日）・6 天 5 夜",
  travelers: ["柏儒（先生）", "Phoebe（太太）"],

  // 全程注意事項（顯示在總覽最上方）
  notes: [
    "🥩 兩人都不吃牛！點餐、選餐廳都以豬肉／海鮮為主",
    "🚕 8/18 已買 Klook 機場接送（金海機場→Centum Premier Hotel），憑證待補",
    "🧭 韓國用 Google Maps 導航常不準，建議手機裝 Naver Map 或 Kakao Map",
  ],

  // ---------- 機票（中華航空，已確認）----------
  flight: {
    bookingRef: "（代號存於信箱）",
    airline: "中華航空 China Airlines",
    totalPrice: "🔒（2 人來回）",
    outbound: {
      flightNo: "CI 186",
      date: "2026/8/18（二）",
      dep: { time: "15:45", airport: "台北桃園 TPE 第一航廈" },
      arr: { time: "19:00", airport: "釜山金海 PUS 國際航廈" },
      duration: "2 小時 15 分・直飛",
      aircraft: "A321neo・經濟艙",
      seats: "尚未選位",
    },
    inbound: {
      flightNo: "CI 187",
      date: "2026/8/23（日）",
      dep: { time: "20:00", airport: "釜山金海 PUS 國際航廈" },
      arr: { time: "21:20", airport: "台北桃園 TPE 第一航廈" },
      duration: "2 小時 20 分・直飛",
      aircraft: "A321neo・經濟艙",
      seats: "🔒",
    },
    tickets: [
      { name: "柏儒", number: "（票號存於信箱）" },
      { name: "Phoebe", number: "（票號存於信箱）" },
    ],
  },

  // ---------- 住宿 ----------
  lodging: [
    {
      status: "active",
      badge: "確認信待補",
      name: "Centum Premier Hotel 센텀프리미어호텔",
      checkIn: "2026/8/18（二）",
      checkOut: "2026/8/20（四）・共 2 晚",
      address: "釜山廣域市海雲台區 Centum 1路 17（BEXCO 步行約 8-10 分鐘）",
      phone: "",
      confirmation: "（請把訂房確認信轉寄到 Gmail，我來補完整資料）",
      note: "2 樓有早餐 buffet（07:00–10:30），入住時要確認方案是否含早餐。8/19 太太 BEXCO 評審日就近步行上工。",
    },
    {
      status: "active",
      name: "海雲台 MS 飯店 MS Hotel Haeundae",
      checkIn: "2026/8/20（四）15:00 之後",
      checkOut: "2026/8/23（日）11:00 前",
      address: "271, Haeundaehaebyeon-ro, Haeundae-gu, Busan（해운대해변로 271）",
      phone: "+82 51-741-3838",
      confirmation: "Booking.com （確認碼存於信箱）",
      note: "海景豪華雙人房・3 晚・總價 🔒（含稅）。8/12 23:59（韓國時間）前可免費取消，8/11 自動扣款。",
    },
  ],

  // ---------- 交通指南（總覽頁卡片，按天分組）----------
  // 金額用 ₩ 符號（公開版的金額隱藏規則只針對個人花費 TWD/KRW，一般交通行情保留）
  transport: [
    {
      day: "Day 1・8/18（二）",
      items: [
        { leg: "金海機場 → Centum Premier Hotel", how: "✅ 已訂 Klook 接送，車程約 30-40 分" },
        { leg: "飯店 → 옥된장（晚餐）", how: "🚶 步行 5-7 分" },
      ],
    },
    {
      day: "Day 2・8/19（三）",
      items: [
        { leg: "飯店 → BEXCO", how: "🚶 步行 8-10 分" },
        { leg: "BEXCO ↔ 新世界百貨／電影殿堂", how: "🚶 步行 5-15 分，Centum City 區內都用走的" },
        { leg: "Centum City → 초일육（海雲台）", how: "🚇 地鐵 2 號線 3 站到 Haeundae 站＋步行，約 20-25 分；趕時間計程車 10 分 ₩7,000 上下" },
        { leg: "初一肉 → 回飯店", how: "🚇 地鐵原路回，或計程車 10 分" },
      ],
    },
    {
      day: "Day 3・8/20（四）",
      items: [
        { leg: "送行李 Centum Premier → MS 飯店", how: "🚕 計程車 15 分 ₩8,000-10,000（拖行李別搭地鐵）" },
        { leg: "Centum City → 嚴湧帛豬肉湯飯（水營）", how: "🚇 地鐵 2 號線 2 站到 Suyeong 站＋步行 10 分" },
        { leg: "嚴湧帛 → SEA LIFE 水族館", how: "🚕 計程車 10 分 ₩7,000-9,000 最順" },
        { leg: "SEA LIFE → MS 飯店", how: "🚶 沿海雲台海灘步行 10-15 分，順便看海 🌊" },
      ],
    },
    {
      day: "Day 4-5・8/21（五）-8/22（六）",
      items: [
        { leg: "待行程確定後補上", how: "海雲台出發：地鐵 2 號線往西面/南浦洞約 30-45 分；甘川洞、太宗台建議計程車或公車" },
      ],
    },
    {
      day: "Day 6・8/23（日）",
      items: [
        { leg: "MS 飯店 → 金海機場", how: "🚕 計程車 40-60 分 ₩35,000 上下（Kakao T 叫車）；省錢備案：地鐵 2 號線→沙上站轉輕軌約 85 分 ₩3,000/人。⚠️ 最晚 17:00 出發！" },
      ],
    },
    {
      day: "💳 通用",
      items: [
        { leg: "交通卡", how: "機場便利商店買 T-money（各儲 ₩20,000），地鐵公車都能刷" },
        { leg: "計程車", how: "用 Kakao T App 叫車，起跳約 ₩4,800，短程兩人分攤跟地鐵差不多" },
        { leg: "路線查詢", how: "以 Naver Map 即時查詢為準（每個景點都附了連結）" },
      ],
    },
  ],

  // ---------- 每日行程 ----------
  days: [
    {
      date: "8/18（二）",
      label: "Day 1・前往釜山",
      image: "images/0818.png",
      items: [
        { time: "上午", title: "先生台北上班／Phoebe 在家整理行李", note: "公公開車載 Phoebe 去機場（樹林出發）；先生中午下班搭機場捷運" },
        { time: "13:15", title: "桃園機場 T1 會合、華航櫃檯報到", note: "起飛前 2.5 小時" },
        { time: "15:45", title: "CI 186 起飛 → 釜山", note: "飛行 2 小時 15 分" },
        { time: "19:00", title: "抵達金海國際機場", note: "入境、領行李" },
        { time: "19:45", title: "Klook 機場接送 → Centum Premier Hotel", note: "🚐 車程約 30-40 分。憑證記得先下載到手機離線可看" },
        { time: "20:30", title: "飯店 Check-in、放行李" },
        { time: "21:00", title: "晚餐：옥된장 玉大醬 Centum City 店（首選）", note: "🚶 從飯店步行 5-7 分。備選①식당3선 Sikdang 3 Sun Centum 店 ②맛찬들왕소금구이 烤豬五花 Centum 店（❌不吃牛，備選牛肉店已剔除）" },
      ],
    },
    {
      date: "8/19（三）",
      label: "Day 2・BEXCO 評審工作日",
      image: "images/0819.png",
      items: [
        { time: "07:10", title: "飯店 2 樓早餐 buffet（07:00 開始）", note: "若不含早餐，備案：Blue Shaak BEXCO 店（約 07:30 開）" },
        { time: "07:40", title: "步行前往 BEXCO、報到準備", note: "🚶 從飯店走約 8-10 分" },
        { time: "08:00", title: "Phoebe 評審工作（～18:00）", note: "先生先拍工作照：報到、評審桌半身、專注側拍、BEXCO 招牌前形象照" },
        { time: "10:30", title: "先生自由活動：新世界百貨 Centum City", note: "教保文庫、4 樓溜冰場（平日約 10:30–18:00）、咖啡廳修照片；也可步行到釜山電影殿堂拍建築" },
        { time: "17:30", title: "先生回 BEXCO 會合" },
        { time: "18:10", title: "回飯店放工作用品、稍作休息" },
        { time: "18:45", title: "前往海雲台", note: "🚇 地鐵 2 號線 Centum City 站 → Haeundae 站 3 站，含步行約 20-25 分；累了就計程車 10 分 ₩7,000 上下" },
        { time: "19:30", title: "晚餐：초일육 初一肉 海雲台本店", note: "⚠️先生記得先用 Catch Table App 訂位 19:30！豬肉燒烤，點豬肉品項。營業 16:30–01:00" },
        { time: "21:00", title: "回飯店休息", note: "🚇 地鐵原路回 Centum City，或計程車 10 分。隔天上午還要授證，早點睡" },
      ],
    },
    {
      date: "8/20（四）",
      label: "Day 3・授證日→移動到海雲台",
      image: "images/0820.png",
      items: [
        { time: "上午", title: "Phoebe 與老師外出授證", note: "授證單位會派車送回 Centum Premier Hotel" },
        { time: "上午", title: "先生退房、把行李送到 MS 飯店寄放", note: "🚕 計程車 15 分 ₩8,000-10,000，拖行李別搭地鐵。早餐視出門時間決定" },
        { time: "12:00", title: "兩人在 Centum Premier Hotel 集合" },
        { time: "12:30", title: "午餐：엄용백돼지국밥 嚴湧帛豬肉湯飯 水營本店", note: "🚇 地鐵 2 號線 Centum City → Suyeong 2 站＋步行約 10 分。必點：豬肉湯飯＋豬肉冷麵。水營路 589 號，營業 09:00–21:30（最後點餐 21:00）" },
        { time: "14:00", title: "SEA LIFE 釜山水族館（海雲台）入場", note: "🚕 從湯飯店計程車約 10 分 ₩7,000-9,000 最順。手帳上的場次：14:10 企鵝餵食、15:00 水獺餵食、16:00 鯊魚餵食、17:00 美人魚表演、18:30 生態解說——入館時記得核對當日公告！" },
        { time: "17:30", title: "MS 飯店正式 Check-in", note: "🚶 沿海雲台海灘往東步行 10-15 分，順便看海 🌊 確認碼 （確認碼存於信箱），領寄放行李" },
        { time: "19:00", title: "晚餐：Puradak 炸雞", note: "🍗 玉米起司＋青陽辣椒美乃滋口味（分店待確認，海雲台附近找）" },
      ],
    },
    { date: "8/21（五）", label: "Day 4", items: [{ time: "--", title: "待安排", note: "等景點清單" }] },
    { date: "8/22（六）", label: "Day 5", items: [{ time: "--", title: "待安排", note: "等景點清單" }] },
    {
      date: "8/23（日）",
      label: "Day 6・回程",
      items: [
        { time: "11:00", title: "MS 飯店退房", note: "行李可寄放飯店櫃檯，繼續玩到傍晚" },
        { time: "17:00", title: "前往金海機場", note: "🚕 計程車 40-60 分 ₩35,000 上下（Kakao T 叫車）；省錢備案：地鐵 2 號線→沙上站轉輕軌約 85 分。⚠️傍晚會塞車，別晚於 17:00 出發" },
        { time: "20:00", title: "CI 187 起飛 → 台北", note: "座位 🔒" },
        { time: "21:20", title: "抵達桃園機場 T1", note: "" },
      ],
    },
  ],

  // ---------- 地圖景點 ----------
  // day: 0 = 候選（還沒排進行程）；1~6 = 排入該天，地圖會依天數上色
  // ⚠️ 餐廳與飯店座標為約略位置，出發前請用 Naver Map 搜韓文店名確認
  pois: [
    { name: "金海國際機場 PUS", ko: "김해국제공항", lat: 35.1795, lng: 128.9382, day: 1, note: "抵達/出發" },
    { name: "🏨 Centum Premier Hotel", ko: "센텀 프리미어 호텔", lat: 35.169, lng: 129.132, day: 1, note: "8/18-8/20 住宿・BEXCO 旁" },
    { name: "🍲 옥된장 玉大醬 Centum 店", ko: "옥된장 부산센텀시티점", lat: 35.1705, lng: 129.131, day: 1, note: "Day1 晚餐首選・豬肉鍋物湯品" },
    { name: "BEXCO 會展中心", ko: "벡스코", lat: 35.1691, lng: 129.136, day: 2, note: "8/19 美甲評審 8:00-18:00" },
    { name: "新世界百貨 Centum City", ko: "신세계백화점 센텀시티점", lat: 35.1687, lng: 129.1295, day: 2, note: "先生自由活動：教保文庫、溜冰場" },
    { name: "釜山電影殿堂", ko: "영화의전당", lat: 35.1717, lng: 129.1275, day: 2, note: "特殊建築拍照點" },
    { name: "🍖 초일육 初一肉 海雲台本店", ko: "초일육 해운대본점", lat: 35.162, lng: 129.159, day: 2, note: "Day2 晚餐 19:30・Catch Table 訂位・點豬肉" },
    { name: "🍜 嚴湧帛豬肉湯飯 水營本店", ko: "엄용백돼지국밥 수영본점", lat: 35.153, lng: 129.115, day: 3, note: "Day3 午餐・豬肉湯飯+豬肉冷麵" },
    { name: "🐠 SEA LIFE 釜山水族館", ko: "씨라이프 부산아쿠아리움", lat: 35.1591, lng: 129.1606, day: 3, note: "Day3 下午・看所有下午場表演" },
    { name: "🏨 海雲台 MS 飯店", ko: "MS호텔 해운대", lat: 35.1594, lng: 129.1665, day: 3, note: "8/20-8/23 住宿・+82 51-741-3838" },
    { name: "海雲台海水浴場", ko: "해운대해수욕장", lat: 35.1587, lng: 129.1604, day: 0, note: "釜山最有名的海灘" },
    { name: "廣安里海灘・廣安大橋夜景", ko: "광안리해수욕장", lat: 35.1532, lng: 129.1189, day: 0, note: "晚上看橋亮燈最美" },
    { name: "甘川洞文化村", ko: "감천문화마을", lat: 35.0975, lng: 129.0106, day: 0, note: "彩色山城、小王子拍照點" },
    { name: "札嘎其市場", ko: "자갈치시장", lat: 35.0966, lng: 129.0306, day: 0, note: "海鮮市場，可現點現吃" },
    { name: "BIFF 廣場・南浦洞", ko: "BIFF광장", lat: 35.0988, lng: 129.0287, day: 0, note: "逛街+堅果糖餅" },
    { name: "龍頭山公園・釜山塔", ko: "용두산공원", lat: 35.1008, lng: 129.0323, day: 0, note: "市區展望" },
    { name: "太宗台", ko: "태종대", lat: 35.0533, lng: 129.0873, day: 0, note: "海岸峭壁步道" },
    { name: "海東龍宮寺", ko: "해동용궁사", lat: 35.1884, lng: 129.2233, day: 0, note: "海邊的寺廟，建議早上去" },
    { name: "西面・田浦咖啡街", ko: "전포카페거리", lat: 35.1578, lng: 129.0594, day: 0, note: "美食購物一級戰區" },
  ],
};
