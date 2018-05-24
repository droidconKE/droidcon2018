(function() {

    var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;

    // Main
    initHeader();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: 0, y: height};

        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('circle-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create particles
        circles = [];
        for(var x = 0; x < width*0.5; x++) {
            var c = new Circle();
            circles.push(c);
        }
        animate();
    }

    // Event handling
    function addListeners() {
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in circles) {
                circles[i].draw();
            }
        }
        requestAnimationFrame(animate);
    }

    // Canvas manipulation
    function Circle() {
        var _this = this;

        // constructor
        (function() {
            _this.pos = {};
            init();
            console.log(_this);
        })();

        function init() {
            _this.pos.x = Math.random()*width;
            _this.pos.y = height+Math.random()*100;
            _this.alpha = 0.1+Math.random()*0.3;
            _this.scale = 0.1+Math.random()*0.3;
            _this.velocity = Math.random();
        }

        this.draw = function() {
            if(_this.alpha <= 0) {
                init();
            }
            _this.pos.y -= _this.velocity;
            _this.alpha -= 0.0005;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
//            ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
            ctx.fillStyle="#863B96";
            ctx.fill();
        };
    }

})();

//Adding Countdown
function updateTimer(deadline){
  var time = deadline - new Date();
  return {
    'days': Math.floor( time/(1000*60*60*24) ),
    'hours': Math.floor( (time/(1000*60*60)) % 24 ),
    'minutes': Math.floor( (time/1000/60) % 60 ),
    'seconds': Math.floor( (time/1000) % 60 ),
    'total' : time
  };
}


function animateClock(span){
  span.className = "turn";
  setTimeout(function(){
    span.className = "";
  },700);
}

function startTimer(id, deadline){
  var timerInterval = setInterval(function(){
    var clock = document.getElementById(id);
    var timer = updateTimer(deadline);

    clock.innerHTML = '<span>' + timer.days + '</span>'
                    + '<span>' + timer.hours + '</span>'
                    + '<span>' + timer.minutes + '</span>'
                    + '<span>' + timer.seconds + '</span>';

    //animations
    var spans = clock.getElementsByTagName("span");
    animateClock(spans[3]);
    if(timer.seconds == 59) animateClock(spans[2]);
    if(timer.minutes == 59 && timer.seconds == 59) animateClock(spans[1]);
    if(timer.hours == 23 && timer.minutes == 59 && timer.seconds == 59) animateClock(spans[0]);

    //check for end of timer
    if(timer.total < 1){
      clearInterval(timerInterval);
      clock.innerHTML = '<span>0</span><span>0</span><span>0</span><span>0</span>';
    }


  }, 1000);
}


window.onload = function(){
  var deadline = new Date("October 4, 2018 11:59:00");
  startTimer("clock", deadline);
};
