const $ = (selector) => document.querySelector(selector);
const escapeHTML = (value) => String(value ?? "").replace(
  /[&<>'"]/g,
  (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char],
);
const safeImagePath = (value) => {
  const path = String(value ?? "");
  return /^images\/[A-Za-z0-9._/-]+$/.test(path) && !path.includes("..") ? path : "";
};
const gmap = (point) => {
  const lat = Number(point.lat);
  const lng = Number(point.lng);
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
};
const nmap = (point) => `https://map.naver.com/p/search/${encodeURIComponent(point.ko || point.name)}`;

let DATA = TRIP;
try {
  const full = sessionStorage.getItem("tripFull");
  if (full) {
    const parsed = JSON.parse(full);
    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.days)) throw new Error("invalid trip data");
    DATA = parsed;
  }
} catch (_error) {
  sessionStorage.removeItem("tripFull");
}

const b64u8 = (value) => Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
async function decryptSecret(blob, password) {
  const material = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"],
  );
  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: b64u8(blob.salt), iterations: 200000, hash: "SHA-256" },
    material, { name: "AES-GCM", length: 256 }, false, ["decrypt"],
  );
  const plaintext = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: b64u8(blob.iv) }, key, b64u8(blob.ct),
  );
  return new TextDecoder().decode(plaintext);
}

async function unlockTrip() {
  const password = prompt("輸入密碼，顯示票價與訂位資訊 🔑");
  if (!password) return;
  try {
    const response = await fetch("secret.enc", { cache: "no-store" });
    if (!response.ok) throw new Error("missing encrypted data");
    const decrypted = await decryptSecret(await response.json(), password);
    const parsed = JSON.parse(decrypted);
    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.days)) throw new Error("invalid trip data");
    sessionStorage.setItem("tripFull", JSON.stringify(parsed));
    location.reload();
  } catch (_error) {
    alert("密碼不對，或這一版沒有加密資料 🥲");
  }
}

function lockTrip() {
  sessionStorage.removeItem("tripFull");
  location.reload();
}

$("#trip-title").textContent = DATA.title;
$("#trip-sub").textContent = `${DATA.dateRange}・${DATA.travelers.join("、")}`;
const lockArea = $("#lock-area");
const lockButton = document.createElement("button");
lockButton.type = "button";
lockButton.className = "link-button";
if (sessionStorage.getItem("tripFull")) {
  lockArea.append("🔓 完整資訊顯示中 ");
  lockButton.textContent = "（鎖回）";
  lockButton.addEventListener("click", lockTrip);
} else {
  lockButton.textContent = "🔒 輸入密碼看完整資訊";
  lockButton.addEventListener("click", unlockTrip);
}
lockArea.append(lockButton);

function flightCard(leg, direction) {
  return `
  <div class="card">
    <h2>${escapeHTML(direction)} <span class="badge">${escapeHTML(leg.flightNo)}</span></h2>
    <div class="muted">${escapeHTML(leg.date)}・${escapeHTML(leg.duration)}・${escapeHTML(leg.aircraft)}</div>
    <div class="flight-row">
      <div><div class="flight-time">${escapeHTML(leg.dep.time)}</div><div class="muted">${escapeHTML(leg.dep.airport)}</div></div>
      <div class="flight-arrow" aria-hidden="true">✈</div>
      <div><div class="flight-time">${escapeHTML(leg.arr.time)}</div><div class="muted">${escapeHTML(leg.arr.airport)}</div></div>
    </div>
    <div class="muted">座位：${escapeHTML(leg.seats)}</div>
  </div>`;
}

const flight = DATA.flight;
let overviewHTML = "";
if (DATA.notes?.length) {
  overviewHTML += `<div class="card warn"><h2>📌 注意事項</h2>${DATA.notes.map(
    (note) => `<div class="note-row">${escapeHTML(note)}</div>`,
  ).join("")}</div>`;
}
overviewHTML += `
  <div class="card">
    <h2>✈️ 機票資訊 <span class="badge">已確認</span></h2>
    <dl class="kv">
      <dt>航空公司</dt><dd>${escapeHTML(flight.airline)}</dd>
      <dt>訂位代號</dt><dd>${escapeHTML(flight.bookingRef)}</dd>
      <dt>總價</dt><dd>${escapeHTML(flight.totalPrice)}</dd>
      ${flight.tickets.map((ticket) => `<dt>票號（${escapeHTML(ticket.name)}）</dt><dd>${escapeHTML(ticket.number)}</dd>`).join("")}
    </dl>
  </div>
  ${flightCard(flight.outbound, "🛫 去程")}
  ${flightCard(flight.inbound, "🛬 回程")}`;

for (const lodging of DATA.lodging) {
  if (lodging.status === "todo" || lodging.status === "cancelled") {
    overviewHTML += `<div class="card warn"><h2>🏨 住宿：${escapeHTML(lodging.name)}</h2><div>${escapeHTML(lodging.note)}</div></div>`;
  } else {
    overviewHTML += `
    <div class="card">
      <h2>🏨 ${escapeHTML(lodging.name)} <span class="badge">${escapeHTML(lodging.badge || "已確認")}</span></h2>
      <dl class="kv">
        <dt>入住</dt><dd>${escapeHTML(lodging.checkIn)}</dd>
        <dt>退房</dt><dd>${escapeHTML(lodging.checkOut)}</dd>
        <dt>地址</dt><dd>${escapeHTML(lodging.address)}</dd>
        <dt>電話</dt><dd>${escapeHTML(lodging.phone)}</dd>
        <dt>確認碼</dt><dd>${escapeHTML(lodging.confirmation)}</dd>
      </dl>
      ${lodging.note ? `<div class="muted card-note">${escapeHTML(lodging.note)}</div>` : ""}
    </div>`;
  }
}
if (DATA.transport?.length) {
  overviewHTML += `
  <div class="card"><h2>🚇 交通指南</h2>
    ${DATA.transport.map((group) => `
      <div class="transport-day"><span class="badge">${escapeHTML(group.day)}</span></div>
      ${group.items.map((item) => `
        <div class="transport-item"><div class="transport-leg">${escapeHTML(item.leg)}</div>
        <div class="muted">${escapeHTML(item.how)}</div></div>`).join("")}`).join("")}
  </div>`;
}
$("#tab-overview").innerHTML = overviewHTML;

const dayTabs = $("#day-tabs");
DATA.days.forEach((day, index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = `${day.label.split("・")[0]} ${day.date}`;
  button.setAttribute("role", "tab");
  button.setAttribute("aria-controls", "day-content");
  button.addEventListener("click", () => showDay(index));
  dayTabs.appendChild(button);
});

function showDay(index) {
  dayTabs.querySelectorAll("button").forEach((button, itemIndex) => {
    const active = index === itemIndex;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
  });
  const day = DATA.days[index];
  const image = safeImagePath(day.image);
  const handout = image ? `
    <div class="handout">
      <a href="${escapeHTML(image)}" target="_blank" rel="noopener noreferrer"><img src="${escapeHTML(image)}" alt="${escapeHTML(day.label)} 手帳圖" loading="lazy" decoding="async"></a>
      <div class="cap">🎨 Phoebe 設計的行程手帳（點圖放大）</div>
    </div>` : "";
  $("#day-content").innerHTML = `
    ${handout}<div class="card"><h2>${escapeHTML(day.label)}<span class="badge">${escapeHTML(day.date)}</span></h2>
      <ul class="timeline">${day.items.map((item) => `
        <li><span class="t">${escapeHTML(item.time)}</span><span><span>${escapeHTML(item.title)}</span>
        ${item.note ? `<span class="n">${escapeHTML(item.note)}</span>` : ""}</span></li>`).join("")}</ul>
    </div>`;
}
showDay(0);

const DAY_COLORS = ["#9ca3af", "#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"];
let map;
let mapReady = false;
function initMap() {
  if (mapReady) return;
  mapReady = true;
  map = L.map("map");
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
  }).addTo(map);
  const bounds = [];
  for (const point of DATA.pois) {
    const color = DAY_COLORS[point.day] || DAY_COLORS[0];
    const marker = L.circleMarker([point.lat, point.lng], {
      radius: 9, color, fillColor: color, fillOpacity: 0.85, weight: 2,
    }).addTo(map);
    marker.bindPopup(`<b>${escapeHTML(point.name)}</b><br>${escapeHTML(point.note)}<br>${point.day ? `Day ${Number(point.day)}` : "候選景點"}<br><a href="${nmap(point)}" target="_blank" rel="noopener noreferrer">🟢 Naver 地圖</a>　<a href="${gmap(point)}" target="_blank" rel="noopener noreferrer">🧭 Google</a>`);
    bounds.push([point.lat, point.lng]);
  }
  if (bounds.length) map.fitBounds(bounds, { padding: [30, 30] });
  else map.setView([35.1796, 129.0756], 11);
}

$("#poi-list").innerHTML = DATA.pois.map((point) => `
  <div class="poi-item"><span><b style="color:${DAY_COLORS[point.day] || DAY_COLORS[0]}">●</b> ${escapeHTML(point.name)} <span class="muted">${escapeHTML(point.note)}</span></span>
  <span><a href="${nmap(point)}" target="_blank" rel="noopener noreferrer">Naver →</a>　<a href="${gmap(point)}" target="_blank" rel="noopener noreferrer">Google →</a></span></div>`).join("");

document.querySelectorAll("nav button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("nav button").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
    });
    document.querySelectorAll("section.tab").forEach((section) => section.classList.remove("active"));
    $("#tab-" + button.dataset.tab).classList.add("active");
    if (button.dataset.tab === "map") {
      initMap();
      setTimeout(() => map.invalidateSize(), 100);
    }
  });
});
