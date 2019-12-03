const svg = document.querySelector('svg');
const indicadores = document.getElementById('indicadores');
const camposAnalisis = document.getElementById('campos_analisis');
let touchstart = null;

const isFirefox = navigator.userAgent.includes('Firefox');
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
  let shift = (event.deltaY * ( isFirefox ? 10 :  1)) + minX;
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
  const touchmove = event.changedTouches[0].clientX;
  const delta = touchstart - touchmove;
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

if (indicadores) {
  indicadores.addEventListener('click', function (event) {
    location.assign(location.href + 'indicadores.html');
  });
}

if (camposAnalisis) {
  camposAnalisis.addEventListener('click', function () {
    location.assign('https://docs.google.com/spreadsheets/d/17fb3XmLCtv42gJj0lhYW43HYU0aqh_ZA77Vyrn6uTy4/edit#gid=157820198')
  })
}

window.onload = function () {
  resize();
  window.addEventListener('resize', resize);
  document.body.addEventListener('wheel', handleWheelEvent);
  document.body.addEventListener('touchstart', handleTouchStart);
  document.body.addEventListener('touchmove', handleTouchMove);
}