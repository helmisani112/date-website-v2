const noBtn = document.getElementById("noBtn");
const form = document.getElementById("dateForm");

let selectedFood = "";

noBtn.addEventListener("mouseover", () => {
  const maxX = window.innerWidth - 120;
  const maxY = window.innerHeight - 80;

  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";
});

function goPage(pageNumber) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  document.getElementById("page" + pageNumber).classList.add("active");
}

function chooseFood(element, food) {
  document.querySelectorAll(".food").forEach((item) => {
    item.classList.remove("selected");
  });

  element.classList.add("selected");
  selectedFood = food;
  document.getElementById("foodInput").value = food;
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const date = document.getElementById("dateInput").value;
  const time = document.getElementById("timeInput").value;
  const food = document.getElementById("foodInput").value;

  if (!date || !time || !food) {
    alert("Please complete everything first ❤️");
    return;
  }

  await fetch("https://script.google.com/macros/s/AKfycbw5vCmnqzylKHUyLY46f55NhF1Z_isjdWvfNC1AuDsly76djKAgCLR9t7HZaGBpYsdn/exec", {
  method: "POST",
  body: JSON.stringify({
    date: date,
    time: time,
    food: food
  })
});

  const whatsappMessage =
`💖 New Date Plan

📅 Date: ${date}
⏰ Time: ${time}
🍽️ Food: ${food}

Sent from Date Website V2 💌`;

  const whatsappNumber = "60146745667";
  const whatsappLink =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  document.getElementById("summary").innerHTML = `
    📅 <strong>Date:</strong> ${date}<br>
    ⏰ <strong>Time:</strong> ${time}<br>
    🍽️ <strong>Food:</strong> ${food}<br><br>
    Email submitted successfully 💖<br>
    WhatsApp is opening now. Please press Send.
  `;

  goPage(4);

  setTimeout(() => {
    window.open(whatsappLink, "_blank");
  }, 800);
});