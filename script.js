// Large dataset of animals
const animals = [
  // ---- Land Animals ----
  { name: "Dog", habitat: "land", img: "dog.jpg" },
  { name: "Cat", habitat: "land", img: "cat.jpeg" },
  { name: "Elephant", habitat: "land", img: "elephant.webp" },
  { name: "Tiger", habitat: "land", img: "tiger.jpg" },
  { name: "Lion", habitat: "land", img: "lion.webp" },
  { name: "Horse", habitat: "land", img: "horse.jpeg" },
  { name: "Giraffe", habitat: "land", img: "giraffee.jpg" },
  { name: "Zebra", habitat: "land", img: "zebra.jpg" },
  { name: "Rabbit", habitat: "land", img: "rabbit.jpg" },
  { name: "Kangaroo", habitat: "land", img: "kangaroo.jpg" },
  { name: "Bear", habitat: "land", img: "bear.jpg" },
  { name: "Panda", habitat: "land", img: "panda.webp" },
  { name: "Wolf", habitat: "land", img: "wolf.jpg" },
  { name: "Deer", habitat: "land", img: "deer.jpg" },
  { name: "Camel", habitat: "land", img: "camel.jpg" },

  // ---- Water Animals ----
  { name: "Fish", habitat: "water", img: "fish.webp" },
  { name: "Shark", habitat: "water", img: "shark.jpg" },
  { name: "Whale", habitat: "water", img: "whale.jpg" },
  { name: "Dolphin", habitat: "water", img: "dolphin.jpg" },
  { name: "Octopus", habitat: "water", img: "octopus.jpg" },
  { name: "Seal", habitat: "water", img: "seal.jpg" },
  { name: "Jellyfish", habitat: "water", img: "jellyfish.jpg" },
  { name: "Starfish", habitat: "water", img: "starfish.jpeg" },
  { name: "Crab", habitat: "water", img: "crab.png" },
  { name: "Lobster", habitat: "water", img: "lobster.jpg" },
  { name: "Squid", habitat: "water", img: "squid.jpeg" },
  { name: "Eel", habitat: "water", img: "eel.webp" },
  { name: "Seahorse", habitat: "water", img: "seahorse.jpg" },

  // ---- Both (Amphibians & Mixed) ----
  { name: "Duck", habitat: "both", img: "duck.jpg" },
  { name: "Frog", habitat: "both", img: "frog.webp" },
  { name: "Crocodile", habitat: "both", img: "crocodile.jpg" },
  { name: "Turtle", habitat: "both", img: "turtle.jpg" },
  { name: "Penguin", habitat: "both", img: "penguin.webp" },
  { name: "Beaver", habitat: "both", img: "beaver.jpeg" },
  { name: "Otter", habitat: "both", img: "otter.jpg" },
  { name: "Platypus", habitat: "both", img: "platypus.webp" },
  { name: "Alligator", habitat: "both", img: "aligator.jpg" },
  { name: "Salamander", habitat: "both", img: "salamender.jpg" }
];
// Utility: shuffle array
function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// Select random 10
const selectedAnimals = shuffleArray([...animals]).slice(0, 10);
const animalArea = document.getElementById("animal-area");
let answers = {}; // store user answers

// Load animals dynamically
selectedAnimals.forEach(animal => {
  let img = document.createElement("img");
  img.src = animal.img;
  img.alt = animal.name;
  img.classList.add("animal");
  img.draggable = true;

  // Give safe id
  img.id = "animal-" + animal.name.replace(/\s+/g, "-").toLowerCase();

  // --- Desktop drag ---
  img.addEventListener("dragstart", e => {
    e.dataTransfer.setData("animal", animal.name);
    e.dataTransfer.setData("id", e.target.id);
  });

  // --- Mobile touch support ---
  img.addEventListener("touchstart", e => {
    img.classList.add("dragging");
  });

  img.addEventListener("touchend", e => {
    const touch = e.changedTouches[0];
    const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);

    if (dropTarget && dropTarget.classList.contains("drop-zone")) {
      answers[animal.name] = dropTarget.dataset.habitat;
      dropTarget.appendChild(img);
    }

    img.classList.remove("dragging");
  });

  animalArea.appendChild(img);
});

// Drop zones logic
const dropZones = document.querySelectorAll(".drop-zone");
dropZones.forEach(zone => {
  zone.addEventListener("dragover", e => {
    e.preventDefault();
    zone.classList.add("over");
  });

  zone.addEventListener("dragleave", () => {
    zone.classList.remove("over");
  });

  zone.addEventListener("drop", e => {
    e.preventDefault();
    const animalName = e.dataTransfer.getData("animal");
    const animalId = e.dataTransfer.getData("id");
    zone.classList.remove("over");

    // Save user answer
    answers[animalName] = zone.dataset.habitat;

    // Move actual image
    const draggedImg = document.getElementById(animalId);
    if (draggedImg) {
      zone.appendChild(draggedImg);
    }
  });
});

// Submit & Score
document.getElementById("submit-btn").addEventListener("click", () => {
  let score = 0;
  selectedAnimals.forEach(animal => {
    if (answers[animal.name] === animal.habitat) score++;
  });
  document.getElementById("result").textContent = `✅ You scored ${score}/10`;
});