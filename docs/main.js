const svg = document.querySelector('svg');
const indicadores = document.getElementById('indicadores');
let touchstart = null;

function resize() {
  svg.setAttribute('width', window.innerWidth);
  svg.setAttribute('height', window.innerHeight);
}

function getViewBox() {
  const viewBox = svg.getAttribute('viewBox').split(/\s/g).map((v) => parseInt(v, 10));
  return viewBox;
}

function setViewBox(values) {
  const viewBox = values.join(' ');
  svg.setAttribute('viewBox', viewBox)
}

function handleWheelEvent(event) {
  const [minX, minY, width, height] = getViewBox();
  let shift = event.deltaY + minX;
  if (shift < 0) {
    shift = 0;
  }
  if (shift > (width - window.innerWidth)) {
    shift = (width - window.innerWidth);
  }
  setViewBox([shift, minY, width, height]);
}

function handleTouchStart(event) {
  touchstart = event.touches[0].clientX;
}

function handleTouchMove(event) {
  console.log(event.touches[0].pageX);
  var touchmove = event.changedTouches[0].clientX;
  var delta = touchstart - touchmove;
  const [minX, minY, width, height] = getViewBox();
  let shift = minX + (delta < 0 ? -50 : 50);
  if (shift < 0) {
    shift = 0;
  }
  if (shift > (width - window.innerWidth)) {
    shift = (width - window.innerWidth);
  }
  setViewBox([shift, minY, width, height]);
}

indicadores.addEventListener('click', function (event) {
  location.replace('/indicadores.svg');
});

window.onload = function () {
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('wheel', handleWheelEvent);
  window.addEventListener('touchstart', handleTouchStart);
  window.addEventListener('touchmove', handleTouchMove);
}