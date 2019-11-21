const svg = document.querySelector('svg');
const indicadores = document.getElementById('indicadores');

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
  let shiftX = event.deltaX + minX;
  if (shiftX < 0) {
    shiftX = 0;
  }
  if (shiftX > (width - window.innerWidth)) {
    shiftX = (width - window.innerWidth);
  }
  setViewBox([shiftX, minY, width, height]);
}

indicadores.addEventListener('click', function (event) {
  location.replace('/indicadores.svg');
});

window.addEventListener('resize', resize);
window.addEventListener('wheel', handleWheelEvent);

window.onload = function () {
  resize();
}