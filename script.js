document.getElementById("input-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const weather = document.getElementById("weather").value;
  const mood = document.getElementById("mood").value;
  const meal = document.getElementById("meal").value;

  fetch("https://joeunseonn.github.io/bigdata_bentomood1/data.json")
    .then((response) => response.json())
    .then((data) => {
      const key = `${weather}_${mood}_${meal}`;
      const menuList = data[key];

      console.log("선택된 키:", key);
      console.log("메뉴 목록:", menuList);

      if (menuList && menuList.length > 0) {
        const randomIndex = Math.floor(Math.random() * menuList.length);
        const menu = menuList[randomIndex];

        // ✅ 추천된 메뉴 저장 (localStorage)
        const popularityKey = `${key}:${menu.main}`;
        const currentCount = localStorage.getItem(popularityKey);
        localStorage.setItem(popularityKey, currentCount ? parseInt(currentCount) + 1 : 1);

        // 출력
        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = `
          <h2>오늘의 추천 도시락 🍱</h2>
          <p><strong>메인:</strong> ${menu.main}</p>
          <p><strong>반찬:</strong> ${menu.sides.join(", ")}</p>
          <p><strong>총 칼로리:</strong> ${menu.calories} kcal</p>
        `;
      } else {
        alert("추천 가능한 도시락이 없습니다. 😢");
      }
    });
});

// ✅ 인기 도시락 보기 기능 추가
function showPopularMenus() {
  const keys = Object.keys(localStorage);
  const popularityList = keys
    .map((k) => ({
      key: k,
      count: parseInt(localStorage.getItem(k)),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // 상위 5개 출력

  let resultHtml = `<h2>🔥 인기 도시락 TOP 5</h2>`;
  if (popularityList.length === 0) {
    resultHtml += `<p>아직 추천 기록이 없습니다.</p>`;
  } else {
    popularityList.forEach((item, index) => {
      resultHtml += `<p>${index + 1}. ${item.key} (${item.count}회)</p>`;
    });
  }

  document.getElementById("result").innerHTML = resultHtml;
}