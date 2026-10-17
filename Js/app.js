/**
 * Weather & Travel Planner Application
 * Bento Hybrid Edition - Pure Vanilla JS (ES6+)
 * Compliant with skill.md
 */

// ==========================================================================
// 1. DỮ LIỆU THỜI TIẾT MẪU (Weather Mock Data)
// ==========================================================================
const WEATHER_DATA = {
  dalat: {
    name: 'Đà Lạt',
    theme: 'sunny',
    icon: '🌤️',
    temp: '21°C',
    condition: 'Se lạnh & Nắng nhẹ',
    humidity: '72%',
    uv: '3 (Thấp)',
    rainProb: '15%',
    windSpeed: '12 km/h',
    tip: 'Tiết trời Đà Lạt đang se lạnh và nắng nhẹ. Thích hợp mặc áo cardigan, trench coat và săn hoàng hôn tại các quán cafe view đồi!'
  },
  bienhoa: {
    name: 'Biên Hòa',
    theme: 'rainy',
    icon: '🌧️',
    temp: '29°C',
    condition: 'Mưa rào rải rác',
    humidity: '88%',
    uv: '2 (Rất thấp)',
    rainProb: '80%',
    windSpeed: '18 km/h',
    tip: 'Biên Hòa dự báo có mưa rào về chiều. Hãy mang theo ô/dù, ưu tiên các địa điểm dừng chân trong nhà như cafe hoặc trung tâm thương mại.'
  },
  vungtau: {
    name: 'Vũng Tàu',
    theme: 'sunny',
    icon: '☀️',
    temp: '32°C',
    condition: 'Nắng ấm, sóng êm',
    humidity: '64%',
    uv: '8 (Rất cao)',
    rainProb: '5%',
    windSpeed: '22 km/h',
    tip: 'Thời tiết biển Vũng Tàu rực nắng! Nhớ thoa kem chống nắng kỹ, đeo kính râm và mũ rộng vành khi dạo Bãi Sau và Mũi Nghinh Phong.'
  },
  danang: {
    name: 'Đà Nẵng',
    theme: 'sunny',
    icon: '☀️',
    temp: '32°C',
    condition: 'Nắng ấm, sóng êm',
    humidity: '64%',
    uv: '8 (Rất cao)',
    rainProb: '5%',
    windSpeed: '22 km/h',
    tip: 'Thời tiết biển Vũng Tàu rực nắng! Nhớ thoa kem chống nắng kỹ, đeo kính râm và mũ rộng vành khi dạo Bãi Sau và Mũi Nghinh Phong.'
  }
};

// ==========================================================================
// 2. DỮ LIỆU GỢI Ý ĐIỂM ĐẾN (Destination Suggestions Data)
// ==========================================================================
const DESTINATIONS_DATA = [
  {
    id: 'dest-1',
    name: 'Tiệm Cà Phê Túi Mơ To',
    vibe: 'autumn',
    rating: '⭐ 4.8',
    hours: '07:30 - 21:30',
    bestTime: '08:30',
    thumb: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=300&q=80',
    desc: 'Không gian nhà gỗ ngắm thung lũng hoa cúc họa mi'
  },
  {
    id: 'dest-2',
    name: 'Đồi Chè Cầu Đất Farm',
    vibe: 'hot',
    rating: '⭐ 4.9',
    hours: '05:30 - 18:00',
    bestTime: '06:00',
    thumb: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=300&q=80',
    desc: 'Điểm săn mây và check-in cánh đồng điện gió nổi tiếng'
  },
  {
    id: 'dest-3',
    name: 'Lẩu Gà Lá É Tao Ngộ',
    vibe: 'food',
    rating: '⭐ 4.7',
    hours: '10:00 - 22:00',
    bestTime: '18:30',
    thumb: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=300&q=80',
    desc: 'Đặc sản làm ấm bụng trong tiết trời se lạnh'
  },
  {
    id: 'dest-4',
    name: 'Hồ Tuyền Lâm & Thiền Viện',
    vibe: 'relax',
    rating: '⭐ 4.9',
    hours: '06:00 - 17:30',
    bestTime: '14:30',
    thumb: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=300&q=80',
    desc: 'Chèo thuyền SUP thư giãn và không gian thiền tịnh'
  },
  {
    id: 'dest-5',
    name: 'Quảng Trường Lâm Viên',
    vibe: 'hot',
    rating: '⭐ 4.6',
    hours: 'Cả ngày',
    bestTime: '16:00',
    thumb: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80',
    desc: 'Biểu tượng hoa Dã Quỳ và Atiso khổng lồ bên Hồ Xuân Hương'
  },
  {
    id: 'dest-6',
    name: 'Chợ Đêm Đà Lạt (Phố Đi Bộ)',
    vibe: 'food',
    rating: '⭐ 4.5',
    hours: '18:00 - 02:00',
    bestTime: '19:30',
    thumb: 'https://images.unsplash.com/photo-1543083477-4f785aeafaa9?auto=format&fit=crop&w=300&q=80',
    desc: 'Thưởng thức bánh tráng nướng, sữa đậu nành nóng hổi'
  },
  {
    id: 'dest-7',
    name: 'Cầu Rồng (Đà Nẵng)',
    vibe: 'hot',
    rating: '⭐ 4.9',
    hours: 'Cả ngày (Phun lửa 21:00 cuối tuần)',
    bestTime: '20:30',
    thumb: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=300&q=80',
    desc: 'Biểu tượng sông Hàn, xem rồng phun lửa & nước rực rỡ'
  },
  {
    id: 'dest-8',
    name: 'Bãi Biển Mỹ Khê (Đà Nẵng)',
    vibe: 'relax',
    rating: '⭐ 4.8',
    hours: '05:00 - 19:00',
    bestTime: '06:00',
    thumb: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80',
    desc: 'Top bãi biển quyến rũ nhất hành tinh với cát trắng mịn'
  }
];

// ==========================================================================
// 3. STATE QUẢN LÝ ỨNG DỤNG
// ==========================================================================
let currentCity = localStorage.getItem('travel_city') || 'dalat';
let currentVibe = 'all';

// Danh sách lịch trình (khôi phục từ localStorage nếu có)
let itineraryItems = JSON.parse(localStorage.getItem('travel_itinerary')) || [
  { id: '1', title: 'Đồi Chè Cầu Đất (Săn mây)', time: '06:00', visited: true },
  { id: '2', title: 'Tiệm Cà Phê Túi Mơ To', time: '09:00', visited: false },
  { id: '3', title: 'Chèo SUP Hồ Tuyền Lâm', time: '14:30', visited: false },
  { id: '4', title: 'Lẩu Gà Lá É & Dạo Chợ Đêm', time: '19:00', visited: false }
];

let searchQuery = '';
let filterStatus = 'all';
let sortBy = 'time-asc';
let pageSize = '10';
let currentPage = 1;

// ==========================================================================
// 4. MODULE THỜI TIẾT (Weather Controller - Realtime API Integration)
// ==========================================================================
let currentWeatherData = null;

async function updateWeatherUI(cityKey) {
  const heroElement = document.querySelector('.weather-bento-hero');
  if (heroElement) heroElement.classList.add('loading-weather');

  currentCity = cityKey;
  localStorage.setItem('travel_city', cityKey);

  // Gọi API Open-Meteo thời gian thực từ weather.js
  const data = await fetchRealtimeWeather(cityKey);
  currentWeatherData = data;

  if (heroElement) heroElement.classList.remove('loading-weather');

  // Cập nhật theme màu động trên thẻ body (Nắng / Mưa / Mây)
  document.body.setAttribute('data-weather', data.theme);

  // Cập nhật các ô Bento với dữ liệu thực tế ngoài đời
  document.getElementById('weatherIcon').textContent = data.icon;
  document.getElementById('weatherTemp').textContent = data.temp;
  document.getElementById('weatherCondition').textContent = data.condition;
  document.getElementById('uvIndex').textContent = data.uv;
  document.getElementById('rainProb').textContent = data.rainProb;
  document.getElementById('windSpeed').textContent = data.windSpeed;
  document.getElementById('smartWeatherTip').innerHTML = data.tip;

  // Cập nhật dải thẻ cuộn ngang các khung giờ tiếp theo (Hourly Carousel)
  renderHourlyCarousel(data.hourly || []);

  // Đồng bộ lại select nếu cần
  document.getElementById('citySelect').value = cityKey;

  // Cập nhật cảnh báo mưa trên các thẻ lịch trình dựa trên xác suất mưa thực tế (> 40% hoặc theme rainy)
  renderItineraryList();
}

function renderHourlyCarousel(hourlyList) {
  const carousel = document.getElementById('hourlyCarousel');
  if (!carousel) return;

  if (hourlyList.length === 0) {
    carousel.innerHTML = `<span style="font-size:0.8rem; color:var(--text-dim); padding:10px;">Chưa có dữ liệu dự báo theo giờ.</span>`;
    return;
  }

  carousel.innerHTML = hourlyList.map(item => `
    <div class="hourly-card ${item.isCurrent ? 'active-hour' : ''}">
      <span class="hourly-time">${item.timeLabel}</span>
      <span class="hourly-icon">${item.icon}</span>
      <span class="hourly-temp">${item.temp}</span>
      ${item.rainProb > 0 ? `<span class="hourly-rain">💧${item.rainProb}%</span>` : ''}
    </div>
  `).join('');
}

// ==========================================================================
// 5. MODULE GỢI Ý ĐIỂM ĐẾN (Suggestions Controller)
// ==========================================================================
function renderSuggestions() {
  const container = document.getElementById('suggestionsGrid');
  const filtered = currentVibe === 'all'
    ? DESTINATIONS_DATA
    : DESTINATIONS_DATA.filter(item => item.vibe === currentVibe);

  container.innerHTML = filtered.map(item => `
    <div class="dest-card">
      <img src="${item.thumb}" alt="${item.name}" class="dest-thumb" loading="lazy">
      <div class="dest-info">
        <div class="dest-header">
          <div class="dest-title">${item.name}</div>
          <div class="dest-rating">${item.rating}</div>
        </div>
        <div class="dest-meta">
          <span>⏰ ${item.hours}</span>
        </div>
        <button class="btn-add-plan" onclick="addFromSuggestion('${item.id}')">
          <span>+</span> Thêm vào Plan
        </button>
      </div>
    </div>
  `).join('');
}

// Thêm địa điểm từ khối Gợi ý sang Lịch trình
window.addFromSuggestion = function(destId) {
  const dest = DESTINATIONS_DATA.find(d => d.id === destId);
  if (!dest) return;

  const newItem = {
    id: Date.now().toString(),
    title: dest.name,
    time: dest.bestTime || '09:00',
    visited: false
  };

  itineraryItems.push(newItem);
  saveItinerary();
  renderItineraryList();

  // Scroll nhẹ tới khối Lịch trình
  const itnModule = document.querySelector('.itinerary-module');
  itnModule.classList.add('animate-transfer');
  setTimeout(() => itnModule.classList.remove('animate-transfer'), 500);
};

// ==========================================================================
// 6. MODULE LỊCH TRÌNH (Itinerary Controller & 4-Feature Standards)
// ==========================================================================
function saveItinerary() {
  localStorage.setItem('travel_itinerary', JSON.stringify(itineraryItems));
}

// Phân nhóm Sáng / Chiều / Tối
function getTimeGroup(timeStr) {
  const hour = parseInt(timeStr.split(':')[0], 10);
  if (hour < 12) return 'Sáng (00:00 - 11:59)';
  if (hour < 18) return 'Chiều (12:00 - 17:59)';
  return 'Tối (18:00 - 23:59)';
}

// Lọc, tìm kiếm, sắp xếp và phân trang
function getProcessedItems() {
  let list = [...itineraryItems];

  // 1. Search
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(item => item.title.toLowerCase().includes(q));
  }

  // 2. Filter Status
  if (filterStatus === 'visited') {
    list = list.filter(item => item.visited);
  } else if (filterStatus === 'unvisited') {
    list = list.filter(item => !item.visited);
  }

  // 3. Sort
  list.sort((a, b) => {
    if (sortBy === 'time-asc') return a.time.localeCompare(b.time);
    if (sortBy === 'time-desc') return b.time.localeCompare(a.time);
    if (sortBy === 'name-asc') return a.title.localeCompare(b.title, 'vi');
    if (sortBy === 'name-desc') return b.title.localeCompare(a.title, 'vi');
    return 0;
  });

  return list;
}

function renderItineraryList() {
  const container = document.getElementById('timelineContainer');
  const allProcessed = getProcessedItems();

  if (allProcessed.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>📭 Chưa có địa điểm nào phù hợp. Hãy tìm kiếm khác hoặc thêm địa điểm mới!</p>
      </div>
    `;
    renderPagination(0);
    return;
  }

  // 4. Pagination
  let displayedItems = allProcessed;
  const totalItems = allProcessed.length;

  if (pageSize !== 'all') {
    const limit = parseInt(pageSize, 10);
    const totalPages = Math.ceil(totalItems / limit) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    const startIndex = (currentPage - 1) * limit;
    displayedItems = allProcessed.slice(startIndex, startIndex + limit);
    renderPagination(totalPages);
  } else {
    currentPage = 1;
    renderPagination(1);
  }

  // Phân nhóm hiển thị theo Sáng / Chiều / Tối
  const groups = {
    'Sáng (00:00 - 11:59)': [],
    'Chiều (12:00 - 17:59)': [],
    'Tối (18:00 - 23:59)': []
  };

  displayedItems.forEach(item => {
    const grp = getTimeGroup(item.time);
    if (!groups[grp]) groups[grp] = [];
    groups[grp].push(item);
  });

  // Kiểm tra thời tiết thực tế có mưa hoặc xác suất mưa cao không
  const isRainy = currentWeatherData 
    ? (currentWeatherData.theme === 'rainy' || currentWeatherData.rainProbRaw >= 40)
    : false;

  let html = '';
  for (const [groupName, items] of Object.entries(groups)) {
    if (items.length === 0) continue;

    html += `
      <div class="time-group">
        <div class="group-badge">
          <span>${groupName.startsWith('Sáng') ? '🌅' : groupName.startsWith('Chiều') ? '☀️' : '🌙'}</span>
          <span>${groupName}</span>
          <span style="font-weight:400; opacity:0.8;">(${items.length})</span>
        </div>
        <ul class="itinerary-list">
          ${items.map(item => `
            <li class="itinerary-item ${item.visited ? 'visited' : ''}" data-id="${item.id}">
              <div class="item-left">
                <span class="item-title">${item.title}</span>
                <div class="item-time-row">
                  <span class="item-time">⏰ ${item.time}</span>
                  ${isRainy ? '<span class="rain-warning">⚠️ Dự báo mưa</span>' : ''}
                </div>
              </div>
              <div class="item-actions">
                <span class="badge-status">${item.visited ? 'Đã đến' : 'Chưa đến'}</span>
                <button class="btn-icon" onclick="toggleItemStatus('${item.id}')" title="${item.visited ? 'Đánh dấu chưa đến' : 'Đánh dấu đã đến'}">
                  ${item.visited ? '↩️' : '✔️'}
                </button>
                <button class="btn-icon btn-delete" onclick="deleteItem('${item.id}')" title="Xóa">
                  🗑️
                </button>
              </div>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }

  container.innerHTML = html;
}

function renderPagination(totalPages) {
  const pagesContainer = document.getElementById('paginationPages');
  const prevBtn = document.getElementById('prevPageBtn');
  const nextBtn = document.getElementById('nextPageBtn');

  if (totalPages <= 1 || pageSize === 'all') {
    pagesContainer.innerHTML = `<button class="page-btn active">1</button>`;
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    prevBtn.style.opacity = '0.5';
    nextBtn.style.opacity = '0.5';
    return;
  }

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
  prevBtn.style.opacity = currentPage === 1 ? '0.5' : '1';
  nextBtn.style.opacity = currentPage === totalPages ? '0.5' : '1';

  let btns = '';
  for (let i = 1; i <= totalPages; i++) {
    btns += `
      <button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">
        ${i}
      </button>
    `;
  }
  pagesContainer.innerHTML = btns;
}

window.goToPage = function(page) {
  currentPage = page;
  renderItineraryList();
};

window.toggleItemStatus = function(id) {
  const item = itineraryItems.find(i => i.id === id);
  if (item) {
    item.visited = !item.visited;
    saveItinerary();
    renderItineraryList();
  }
};

window.deleteItem = function(id) {
  itineraryItems = itineraryItems.filter(i => i.id !== id);
  saveItinerary();
  renderItineraryList();
};

// ==========================================================================
// 7. SỰ KIỆN KHỞI TẠO (Event Listeners & Init)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Đồng hồ thời gian thực
  const dateEl = document.getElementById('currentDateDisplay');
  const updateClock = () => {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  updateClock();

  // 2. City Selector
  const citySelect = document.getElementById('citySelect');
  citySelect.value = currentCity;
  citySelect.addEventListener('change', (e) => {
    updateWeatherUI(e.target.value);
  });
  updateWeatherUI(currentCity);

  // 3. Vibe Filter Chips
  const vibeButtons = document.querySelectorAll('.vibe-chip');
  vibeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      vibeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentVibe = btn.getAttribute('data-vibe');
      renderSuggestions();
    });
  });
  renderSuggestions();

  // 4. Form thêm lịch trình
  const form = document.getElementById('itineraryForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const placeInput = document.getElementById('placeInput');
    const timeInput = document.getElementById('timeInput');

    if (!placeInput.value.trim()) return;

    itineraryItems.push({
      id: Date.now().toString(),
      title: placeInput.value.trim(),
      time: timeInput.value || '08:00',
      visited: false
    });

    saveItinerary();
    renderItineraryList();
    placeInput.value = '';
    placeInput.focus();
  });

  // ==========================================================================
  // KHỞI TẠO BẢNG CHỌN GIỜ KÍNH MỜ (Glass Popover Dual-Wheel Controller)
  // ==========================================================================
  const timeInput = document.getElementById('timeInput');
  const popover = document.getElementById('glassTimePopover');
  const hourList = document.getElementById('wheelHourList');
  const minuteList = document.getElementById('wheelMinuteList');
  const btnDone = document.getElementById('btnTimeDone');
  const periodTabs = document.querySelectorAll('.period-tab-btn');

  let selectedHour = '08';
  let selectedMinute = '00';

  // Render danh sách Giờ (00 -> 23)
  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  hourList.innerHTML = hours.map(h => `
    <div class="time-num-item ${h === selectedHour ? 'selected' : ''}" data-hour="${h}">
      ${h}
    </div>
  `).join('');

  // Render danh sách Phút (00, 15, 30, 45, và 05, 10, 20...)
  const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
  minuteList.innerHTML = minutes.map(m => `
    <div class="time-num-item ${m === selectedMinute ? 'selected' : ''}" data-minute="${m}">
      ${m}
    </div>
  `).join('');

  // Bật/tắt popover khi click vào ô timeInput
  timeInput.addEventListener('click', (e) => {
    e.stopPropagation();
    popover.classList.toggle('show');
  });

  // Chọn giờ
  hourList.addEventListener('click', (e) => {
    const item = e.target.closest('.time-num-item');
    if (!item) return;
    hourList.querySelectorAll('.time-num-item').forEach(el => el.classList.remove('selected'));
    item.classList.add('selected');
    selectedHour = item.getAttribute('data-hour');
    timeInput.value = `${selectedHour}:${selectedMinute}`;
  });

  // Chọn phút
  minuteList.addEventListener('click', (e) => {
    const item = e.target.closest('.time-num-item');
    if (!item) return;
    minuteList.querySelectorAll('.time-num-item').forEach(el => el.classList.remove('selected'));
    item.classList.add('selected');
    selectedMinute = item.getAttribute('data-minute');
    timeInput.value = `${selectedHour}:${selectedMinute}`;
  });

  // Chuyển nhanh buổi (Sáng: 08:00, Chiều: 14:00, Tối: 19:00)
  periodTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.stopPropagation();
      periodTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const period = tab.getAttribute('data-period');
      if (period === 'morning') selectedHour = '08';
      else if (period === 'afternoon') selectedHour = '14';
      else if (period === 'evening') selectedHour = '19';

      hourList.querySelectorAll('.time-num-item').forEach(el => {
        el.classList.toggle('selected', el.getAttribute('data-hour') === selectedHour);
        if (el.getAttribute('data-hour') === selectedHour) {
          el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      });
      timeInput.value = `${selectedHour}:${selectedMinute}`;
    });
  });

  // Nút Xong đóng popover
  btnDone.addEventListener('click', (e) => {
    e.stopPropagation();
    popover.classList.remove('show');
  });

  // Đóng popover khi click ra ngoài
  document.addEventListener('click', (e) => {
    if (!popover.contains(e.target) && e.target !== timeInput) {
      popover.classList.remove('show');
    }
  });

  // 5. Controls: Search, Filter, Sort, PageSize
  document.getElementById('searchInput').addEventListener('input', (e) => {
    searchQuery = e.target.value;
    currentPage = 1;
    renderItineraryList();
  });

  document.getElementById('filterStatus').addEventListener('change', (e) => {
    filterStatus = e.target.value;
    currentPage = 1;
    renderItineraryList();
  });

  document.getElementById('sortBy').addEventListener('change', (e) => {
    sortBy = e.target.value;
    renderItineraryList();
  });

  document.getElementById('pageSizeSelect').addEventListener('change', (e) => {
    pageSize = e.target.value;
    currentPage = 1;
    renderItineraryList();
  });

  // Nút phân trang Prev / Next
  document.getElementById('prevPageBtn').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderItineraryList();
    }
  });

  document.getElementById('nextPageBtn').addEventListener('click', () => {
    currentPage++;
    renderItineraryList();
  });
});
