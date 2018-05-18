document.addEventListener('DOMContentLoaded', function () {
  particleground(document.getElementById('about'), {
    dotColor: '#b2ff59',
    lineColor: '#757575',
      directionX:'rigth',
      density:'8000',
      lineWidth:'0.5',
      parallax:false
  });
  var intro = document.getElementById('intro');
  intro.style.marginTop = - intro.offsetHeight / 2 + 'px';
}, false);



