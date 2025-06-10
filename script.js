document.getElementById("input-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const weather = document.getElementById("weather").value;
  const mood = document.getElementById("mood").value;
  const meal = document.getElementById("meal").value;

  // 데이터 로드
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const key = `${weather}_${mood}_${meal}`;
      const menuList = data[key];

      if (menuList && menuList.length > 0) {
        const randomIndex = Math.floor(Math.random() * menuList.length);
        const menu = menuList[randomIndex];

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
