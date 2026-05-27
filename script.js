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

  const formData = new FormData(form);

  await fetch(form.action, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json"
    }
  });

  document.getElementById("summary").innerHTML = `
    📅 <strong>Date:</strong> ${date}<br>
    ⏰ <strong>Time:</strong> ${time}<br>
    🍽️ <strong>Food:</strong> ${food}<br><br>
    Sent successfully 💖
  `;

  goPage(4);
});