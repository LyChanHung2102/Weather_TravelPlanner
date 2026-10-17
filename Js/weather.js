/**
 * Weather Service Module (Open-Meteo API Realtime Integration)
 * Pure Vanilla JS (ES6+) - Compliant with skill.md
 * No API Key required, high accuracy with coordinates in Vietnam
 */

// Tọa độ địa lý chuẩn của các thành phố
const CITY_COORDINATES = {
  dalat: {
    name: 'Đà Lạt',
    lat: 11.9404,
    lon: 108.4583,
    fallbackTip: 'Tiết trời Đà Lạt cao nguyên mát lạnh. Thích hợp mang áo ấm mỏng và ngắm cảnh view đồi!'
  },
  bienhoa: {
    name: 'Biên Hòa',
    lat: 10.9574,
    lon: 106.8427,
    fallbackTip: 'Khí hậu Biên Hòa nhiệt đới ấm áp. Thích hợp trang phục nhẹ nhàng, thoáng mát.'
  },
  vungtau: {
    name: 'Vũng Tàu',
    lat: 10.3460,
    lon: 107.0843,
    fallbackTip: 'Gió biển Vũng Tàu mát rượi. Đừng quên kính râm và kem chống nắng khi ra bãi biển!'
  },
  danang: {
    name: 'Đà Nẵng',
    lat: 16.0544,
    lon: 108.2022,
    fallbackTip: 'Khí hậu duyên hải miền Trung tuyệt đẹp. Rất lý tưởng dạo biển Mỹ Khê, ngắm Cầu Rồng và bán đảo Sơn Trà!'
  }
};

/**
 * Bảng ánh xạ mã thời tiết quốc tế WMO Weather Codes sang Icon, Mô tả & Theme
 * Tự động phân biệt Ngày / Đêm (18:00 -> 05:59 là ban đêm)
 */
function parseWmoCode(code, targetHour) {
  // Xác định ban đêm nếu giờ từ 18h tối đến 5h sáng
  const hour = (targetHour !== undefined) ? targetHour : new Date().getHours();
  const isNight = (hour >= 18 || hour < 6);

  // 0: Trời quang, trong xanh
  if (code === 0) {
    return {
      condition: isNight ? 'Đêm quang đãng, không mây' : 'Trời quang, nắng đẹp',
      icon: isNight ? '🌙' : '☀️',
      theme: isNight ? 'cloudy' : 'sunny'
    };
  }
  // 1, 2, 3: Ít mây, có mây, nhiều mây
  if (code >= 1 && code <= 3) {
    let desc = '';
    let icon = '';
    if (code === 1) {
      desc = isNight ? 'Đêm thoáng đãng, ít mây' : 'Nắng ráo, ít mây';
      icon = isNight ? '🌙' : '🌤️';
    } else if (code === 2) {
      desc = isNight ? 'Đêm có mây rải rác' : 'Có mây rải rác';
      icon = isNight ? '☁️' : '⛅';
    } else {
      desc = 'Nhiều mây bao phủ';
      icon = '☁️';
    }
    return {
      condition: desc,
      icon: icon,
      theme: 'cloudy'
    };
  }
  // 45, 48: Sương mù
  if (code === 45 || code === 48) {
    return {
      condition: isNight ? 'Đêm sương mù se lạnh' : 'Sương mù mờ ảo',
      icon: '🌫️',
      theme: 'cloudy'
    };
  }
  // 51 - 67: Mưa phùn, mưa rào nhẹ đến vừa
  if (code >= 51 && code <= 67) {
    return {
      condition: isNight ? 'Mưa đêm rả rích' : 'Mưa rào nhẹ',
      icon: isNight ? '🌧️' : '🌦️', // Ban đêm dùng đám mây mưa rơi thay vì mặt trời mưa
      theme: 'rainy'
    };
  }
  // 71 - 77: Rét / tuyết
  if (code >= 71 && code <= 77) {
    return {
      condition: 'Rét buốt',
      icon: '❄️',
      theme: 'cloudy'
    };
  }
  // 80 - 82: Mưa rào nặng hạt
  if (code >= 80 && code <= 82) {
    return {
      condition: isNight ? 'Mưa đêm nặng hạt' : 'Mưa rào xối xả',
      icon: '🌧️',
      theme: 'rainy'
    };
  }
  // 95 - 99: Dông bão, sấm chớp
  if (code >= 95) {
    return {
      condition: 'Dông sét, mưa lớn',
      icon: '⛈️',
      theme: 'rainy'
    };
  }

  return {
    condition: isNight ? 'Đêm có mây' : 'Có mây',
    icon: isNight ? '☁️' : '🌤️',
    theme: 'cloudy'
  };
}

/**
 * Tạo gợi ý trang phục theo nhiệt độ (Smart Suggestion) & Hoạt động phù hợp
 * Phân loại chuẩn theo nhiệt độ thực tế của thành phố
 */
function getSmartOutfitSuggestion(tempNum, isRainy) {
  let outfit = '';
  let icon = '👕';

  if (tempNum < 20) {
    outfit = 'Nên mang theo áo khoác dày, khăn choàng hoặc áo len để giữ ấm.';
    icon = '🧥';
  } else if (tempNum <= 25) {
    outfit = 'Nên mang áo khoác mỏng, cardigan hoặc áo hoodie nhẹ.';
    icon = '🧣';
  } else if (tempNum <= 30) {
    outfit = 'Trang phục thoáng mát, áo thun cotton năng động, đồ lanh dạo phố.';
    icon = '👕';
  } else {
    outfit = 'Nên mang theo kem chống nắng, kính râm, mũ rộng vành và quần áo mỏng nhẹ thấm hút mồ hôi.';
    icon = '🧢';
  }

  if (isRainy) {
    outfit += ' ☔ Hãy mang thêm ô/dù hoặc áo mưa tiện lợi đề phòng mưa bất chợt.';
  }

  return { outfit, icon };
}

function generateSmartTip(cityName, tempNum, theme, uvNum, rainProbNum) {
  const isRainy = (theme === 'rainy' || rainProbNum >= 40);
  const { outfit, icon } = getSmartOutfitSuggestion(tempNum, isRainy);

  let activity = '';
  if (isRainy) {
    activity = 'Ưu tiên các quán cà phê acoustic có mái che ấm cúng, bảo tàng hoặc không gian triển lãm nghệ thuật trong nhà.';
  } else if (uvNum >= 7) {
    activity = 'Thời tiết nắng rực rỡ, thích hợp tắm biển hoặc dạo phố buổi sáng sớm và chiều tà mát mẻ.';
  } else {
    activity = 'Khí hậu cực kỳ ủng hộ cho việc dạo cảnh, chụp ảnh check-in và khám phá ẩm thực đường phố!';
  }

  return `
    <div class="tip-row outfit-row">
      <span class="tip-badge">${icon} Trang phục khuyên dùng:</span>
      <span class="tip-text outfit-highlight">${outfit}</span>
    </div>
    <div class="tip-row activity-row">
      <span class="tip-badge">📍 Hoạt động lý tưởng:</span>
      <span class="tip-text">${activity}</span>
    </div>
  `;
}

/**
 * Hàm gọi API Open-Meteo thời gian thực
 * @param {string} cityKey 'dalat' | 'bienhoa' | 'vungtau'
 * @returns {Promise<object>} Dữ liệu thời tiết đã chuẩn hóa
 */
async function fetchRealtimeWeather(cityKey) {
  const city = CITY_COORDINATES[cityKey] || CITY_COORDINATES['dalat'];

  // Endpoint Open-Meteo v1 lấy thời tiết hiện tại & dự báo 24 giờ tiếp theo
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,precipitation_probability,weather_code,uv_index&timezone=Asia%2FBangkok&forecast_days=2`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Lỗi kết nối máy chủ thời tiết: ${response.status}`);
    }

    const data = await response.json();
    const current = data.current;

    // Lấy chỉ số UV và xác suất mưa tại giờ hiện tại
    const currentHourIndex = new Date().getHours();
    const rainProbability = data.hourly?.precipitation_probability?.[currentHourIndex] ?? Math.round((current.precipitation || 0) * 20);
    const uvIndexVal = data.hourly?.uv_index?.[currentHourIndex] ?? 4.0;

    const wmoInfo = parseWmoCode(current.weather_code);
    const tempRounded = Math.round(current.temperature_2m);
    const windRounded = Math.round(current.wind_speed_10m);

    // Xếp loại UV
    let uvLabel = `${Math.round(uvIndexVal)}`;
    if (uvIndexVal <= 2) uvLabel += ' (Rất thấp)';
    else if (uvIndexVal <= 5) uvLabel += ' (Trung bình)';
    else if (uvIndexVal <= 7) uvLabel += ' (Cao)';
    else uvLabel += ' (Rất cao)';

    // Trích xuất 7 mốc giờ tiếp theo trong ngày
    const hourlyTimes = data.hourly?.time || [];
    const hourlyTemps = data.hourly?.temperature_2m || [];
    const hourlyCodes = data.hourly?.weather_code || [];
    const hourlyRains = data.hourly?.precipitation_probability || [];

    const hourlyForecast = [];
    // Lấy 8 mốc tiếp theo (cách nhau 2 tiếng)
    for (let step = 0; step < 8; step++) {
      const targetIdx = currentHourIndex + (step === 0 ? 0 : step * 2);
      if (targetIdx < hourlyTimes.length) {
        const timeStr = hourlyTimes[targetIdx];
        const hourOnly = timeStr.split('T')[1].substring(0, 5);
        const parsedHour = parseInt(hourOnly.split(':')[0], 10);
        
        // Truyền parsedHour để tự động chọn icon Ngày hoặc Đêm chính xác
        const wmo = parseWmoCode(hourlyCodes[targetIdx], parsedHour);
        const rainProb = hourlyRains[targetIdx] || 0;

        hourlyForecast.push({
          timeLabel: step === 0 ? 'Hiện tại' : hourOnly,
          temp: `${Math.round(hourlyTemps[targetIdx])}°C`,
          icon: wmo.icon,
          condition: wmo.condition,
          rainProb: rainProb,
          isCurrent: step === 0
        });
      }
    }

    const result = {
      name: city.name,
      theme: wmoInfo.theme,
      icon: wmoInfo.icon,
      temp: `${tempRounded}°C`,
      tempRaw: tempRounded,
      condition: wmoInfo.condition,
      humidity: `${current.relative_humidity_2m}%`,
      uv: uvLabel,
      uvRaw: uvIndexVal,
      rainProb: `${rainProbability}%`,
      rainProbRaw: rainProbability,
      windSpeed: `${windRounded} km/h`,
      tip: generateSmartTip(city.name, tempRounded, wmoInfo.theme, uvIndexVal, rainProbability),
      hourly: hourlyForecast
    };

    // Cache kết quả vào localStorage để dự phòng offline
    localStorage.setItem(`weather_cache_${cityKey}`, JSON.stringify(result));
    return result;

  } catch (error) {
    console.warn(`[Open-Meteo API Warning] Không thể lấy dữ liệu online cho ${city.name}, sử dụng dữ liệu bộ nhớ đệm:`, error);
    
    // Khôi phục từ cache nếu có
    const cached = localStorage.getItem(`weather_cache_${cityKey}`);
    if (cached) {
      return JSON.parse(cached);
    }

    // Dự phòng mặc định nếu mất mạng hoàn toàn
    return {
      name: city.name,
      theme: 'sunny',
      icon: '🌤️',
      temp: '25°C',
      tempRaw: 25,
      condition: 'Chế độ ngoại tuyến',
      humidity: '70%',
      uv: '4 (TB)',
      uvRaw: 4,
      rainProb: '10%',
      rainProbRaw: 10,
      windSpeed: '12 km/h',
      tip: city.fallbackTip
    };
  }
}
