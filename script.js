const noBtn = document.getElementById("noBtn");
const form = document.getElementById("dateForm");

const TELEGRAM_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbw5vCmnqzylKHUyLY46f55NhF1Z_isjdWvfNC1AuDsly76djKAgCLR9t7HZaGBpYsdn/exec";

let selectedLocations = [];
let selectedRestaurants = [];

const data = {
  "IOI City Mall": [
    ["4Fingers Crispy Chicken", "https://www.4fingers.com.my/menu/"],
    ["Fuel Shack", "https://my.food-menu.org/viewmenu/fuel-shack"],
    ["Dolly Dim Sum", "https://www.dollydimsum.com/menu"],
    ["Madam Kwan", "https://www.madamkwans.com.my/menu"],
    ["Oriental Kopi", "https://www.orientalkopi.asia/menu/"],
    ["Sushi King", "https://sushi-king.com/all-menu/"],
    ["Awagyu Yakiniku", "https://www.awagyuonline.com/pages/awagyu-kl-menu-1"]
  ],

  "Putrajaya": [
    ["Umai Cafe", "https://nearbyrestaurantsnearme.my/putrajaya/restaurants-putrajaya/umai-cafe/"],
    ["Inara Kafe", ""],
    ["Padi House", "https://padihouse.com/menu/"],
    ["Dapur Jiran", "https://chickenricenearme.my/restoran-dapur-jiran/"],
    ["Medan Selera Presint 9", "https://tempatmakannearme.my/putrajaya/putrajaya/medan-selera-presint-9/"]
  ],

  "IOI Puchong Mall": [
    ["Auntie Anne's", "https://auntieannes.com.my/menu"],
    ["Boost Juice", "https://www.boostjuicebars.com.my/drinks/"],
    ["Bungkus Kaw Kaw", "https://bungkuskawkaw.com/menu/"],
    ["Roti Boy", ""],
    ["Kenny Rogers Roasters", ""],
    ["The Chicken Rice Shop", "https://www.thechickenriceshop.com/menu/"],
    ["Tealive", "https://www.tealive.com.my/menu"],
    ["Zus Coffee", "https://zuscoffee.com/category/food/local-menu/"],
    ["Serai", "https://seraigroup.com.my/wp-content/uploads/2025/07/Serai-menu.min_.pdf"]
  ],

  "Puchong": [
    ["Kekwa Cafe", ""],
    ["Sams Cafe", "https://www.malaymenu.com/sams-caffe-menu/"],
    ["4Fingers Crispy Chicken", "https://www.4fingers.com.my/menu/"],
    ["Secret Recipe", "https://www.secretrecipe.com.my/menu"]
  ],

  "Alamanda Mall": [
    ["Oriental Kopi", "https://www.orientalkopi.asia/menu/"],
    ["Bungkus Kaw Kaw", "https://bungkuskawkaw.com/menu/"],
    ["Cili Kampung", "https://cilikampung.com/menu/"],
    ["Padi House", "https://padihouse.com/menu/"],
    ["The Chicken Rice Shop", "https://www.thechickenriceshop.com/menu/"],
    ["Zus Coffee", "https://zuscoffee.com/category/food/local-menu/"],
    ["Sushi King", "https://sushi-king.com/all-menu/"],
    ["Tealive", "https://www.tealive.com.my/menu"],
    ["Boost Juice", "https://www.boostjuicebars.com.my/drinks/"],
    ["Secret Recipe", "https://www.secretrecipe.com.my/menu"]
  ],

  "Pavilion Bukit Jalil Mall": [
    ["Dome Cafe", "https://domecafe.com.my/menu/"],
    ["Madam Kwan", "https://www.madamkwans.com.my/menu"],
    ["Oriental Kopi", "https://www.orientalkopi.asia/menu/"],
    ["Roti Boy", ""],
    ["Seniman", "https://www.instagram.com/seniman_bukitjalil/"],
    ["The Chicken Rice Shop", "https://www.thechickenriceshop.com/menu/"]
  ],

  "Suria KLCC Mall": [
    ["Bungkus Kaw Kaw", "https://bungkuskawkaw.com/menu/"],
    ["Cili Kampung", "https://cilikampung.com/menu/"],
    ["Dome Cafe", "https://domecafe.com.my/menu/"],
    ["Madam Kwan", "https://www.madamkwans.com.my/menu"],
    ["Dotty's", "https://cdn.shopify.com/s/files/1/0645/8920/1664/files/Dottys_A3_Menu_AUGUST_2025.pdf?v=1754011948"],
    ["K Fry", "https://www.kfry.my/menu/#food-chicken-cheesy"],
    ["Oriental Kopi", "https://www.orientalkopi.asia/menu/"],
    ["Serai", "https://seraigroup.com.my/wp-content/uploads/2025/07/Serai-menu.min_.pdf"],
    ["Zus Coffee", "https://zuscoffee.com/category/food/local-menu/"],
    ["Boost Juice", "https://www.boostjuicebars.com.my/drinks/"],
    ["Fuel Shack", "https://my.food-menu.org/viewmenu/fuel-shack"]
  ]
};

noBtn.addEventListener("mouseover", () => {
  noBtn.style.left = Math.random() * (window.innerWidth - 120) + "px";
  noBtn.style.top = Math.random() * (window.innerHeight - 80) + "px";
});

function goPage(pageNumber) {
  document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
  document.getElementById("page" + pageNumber).classList.add("active");
}

function toggleLocation(location, element) {
  if (selectedLocations.includes(location)) {
    selectedLocations = selectedLocations.filter(item => item !== location);
    element.classList.remove("selected");
    selectedRestaurants = selectedRestaurants.filter(item => item.location !== location);
  } else {
    selectedLocations.push(location);
    element.classList.add("selected");
  }
}

function toggleRestaurant(location, name, link, element) {
  const key = location + " - " + name;
  const exists = selectedRestaurants.some(item => item.key === key);

  if (exists) {
    selectedRestaurants = selectedRestaurants.filter(item => item.key !== key);
    element.classList.remove("selected");
  } else {
    selectedRestaurants.push({ key, location, name, link });
    element.classList.add("selected");
  }
}

function loadLocations() {
  const grid = document.getElementById("locationGrid");
  grid.innerHTML = "";

  Object.keys(data).forEach(location => {
    const div = document.createElement("div");
    div.className = "food";
    div.innerHTML = `📍<span>${location}</span>`;
    div.onclick = () => toggleLocation(location, div);
    grid.appendChild(div);
  });
}

function showRestaurants() {
  if (selectedLocations.length === 0) {
    alert("Please choose at least one place 💖");
    return;
  }

  const grid = document.getElementById("restaurantGrid");
  grid.innerHTML = "";

  selectedLocations.forEach(location => {
    const title = document.createElement("h2");
    title.innerText = location;
    grid.appendChild(title);

    data[location].forEach(([name, link]) => {
      const key = location + " - " + name;
      const selected = selectedRestaurants.some(item => item.key === key);

      const div = document.createElement("div");
      div.className = selected ? "food selected" : "food";
      div.innerHTML = `🍽️<span>${name}</span>`;
      div.onclick = () => toggleRestaurant(location, name, link, div);
      grid.appendChild(div);
    });
  });

  goPage(4);
}

function showMenuReview() {
  if (selectedRestaurants.length === 0) {
    alert("Please choose at least one restaurant 💕");
    return;
  }

  const review = document.getElementById("menuReview");
  review.innerHTML = "";

  selectedRestaurants.forEach(item => {
    const box = document.createElement("div");
    box.className = "menu-item";

    box.innerHTML = `
      <label class="menu-check">
        <input type="checkbox" checked onchange="removeRestaurantFromReview('${item.key}')">
        <span>
          <strong>📍 ${item.location}</strong><br>
          🍽️ ${item.name}
        </span>
      </label>

      ${
        item.link
          ? `<a href="${item.link}" target="_blank">
              <button type="button" class="primary wide">View Menu 🍽️</button>
            </a>`
          : `<p class="small">Menu not available</p>`
      }
    `;

    review.appendChild(box);
  });

  goPage(5);
}

function removeRestaurantFromReview(key) {
  selectedRestaurants = selectedRestaurants.filter(item => item.key !== key);
  showMenuReview();
}

function showFinalSummary() {
  const date = document.getElementById("dateInput").value;
  const time = document.getElementById("timeInput").value;

  if (!date || !time) {
    alert("Please select date and time first 💖");
    goPage(2);
    return;
  }

  if (selectedRestaurants.length === 0) {
    alert("Please keep at least one restaurant selected 💕");
    goPage(4);
    return;
  }

  document.getElementById("summary").innerHTML = `
    📅 <strong>Date:</strong> ${date}<br>
    ⏰ <strong>Time:</strong> ${time}<br><br>

    📍 <strong>Places:</strong><br>
    ${selectedLocations.map(x => "• " + x).join("<br>")}<br><br>

    🍽️ <strong>Restaurants:</strong><br>
    ${selectedRestaurants.map(x => "• " + x.name + " (" + x.location + ")").join("<br>")}
  `;

  goPage(6);
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const date = document.getElementById("dateInput").value;
  const time = document.getElementById("timeInput").value;

  const wishlistText =
`📍 Places:
${selectedLocations.map(x => "• " + x).join("\n")}

🍽️ Restaurants:
${selectedRestaurants.map(x => "• " + x.name + " (" + x.location + ")").join("\n")}`;

  await fetch(TELEGRAM_WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({
      date: date,
      time: time,
      food: wishlistText
    })
  });

  goPage(7);
});

loadLocations();