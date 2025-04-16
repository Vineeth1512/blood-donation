const track = document.getElementById("carouselTrack");
const cards = track.querySelectorAll(".carousel-card");
const totalCards = cards.length;
const visibleCards = 3;

let currentIndex = 0;
let direction = 1;

function getCardFullWidth() {
  const card = cards[0];
  const cardStyles = window.getComputedStyle(card);
  const width = card.getBoundingClientRect().width;
  const gap = parseFloat(window.getComputedStyle(track).gap);
  return width + gap;
}

setInterval(() => {
  const cardFullWidth = getCardFullWidth();

  currentIndex += direction;

  if (currentIndex > totalCards - visibleCards) {
    direction = -1;
    currentIndex = totalCards - visibleCards;
  } else if (currentIndex < 0) {
    direction = 1;
    currentIndex = 0;
  }

  track.style.transform = `translateX(-${currentIndex * cardFullWidth}px)`;
}, 2000);
