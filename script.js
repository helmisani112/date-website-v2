const noBtn = document.getElementById("noBtn");

noBtn.addEventListener("mouseover", () => {
  const maxX = window.innerWidth - 120;
  const maxY = window.innerHeight - 80;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
});

function goPage(pageNumber) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  document.getElementById("page" + pageNumber).classList.add("active");
}

let selectedFood = "";

function chooseFood(element, food) {
  document.querySelectorAll(".food").forEach((item) => {
    item.classList.remove("selected");
  });

  element.classList.add("selected");
  selectedFood = food;
}

function showResult() {
  const date = document.getElementById("dateInput").value;
  const time = document.getElementById("timeInput").value;

  if (!date || !time || !selectedFood) {
    alert("Please complete everything first ❤️");
    return;
  }

  document.getElementById("summary").innerHTML = `
    📅 <strong>Date:</strong> ${date}<br>
    ⏰ <strong>Time:</strong> ${time}<br>
    🍽️ <strong>Food:</strong> ${selectedFood}<br><br>
    Looking forward to it 💖
  `;

  goPage(4);
}

function copyPlan() {
  const text = document.getElementById("summary").innerText;

  navigator.clipboard.writeText(text);

  alert("Copied successfully 💕");
}