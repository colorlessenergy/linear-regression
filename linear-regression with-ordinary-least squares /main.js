let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');

let data = [];

// y = mx + b
let m = 1;
let b = 0;

function setup () {
  canvas.width = 400;
  canvas.height = 400;

  canvas.addEventListener('click', mousePressed)
}

function linearRegression() {
  let xsum = 0;
  let ysum = 0;
  for (let i = 0; i < data.length; i++) {
    xsum += data[i].x;
    ysum += data[i].y;
  }
  let xmean = xsum / data.length;
  let ymean = ysum / data.length;

  // get m of the slope
  let num = 0;
  let den = 0;
  for (let i = 0; i < data.length; i++) {
    let x = data[i].x;
    let y = data[i].y;
    num += (x - xmean) * (y - ymean);
    den += (x - xmean) * (x - xmean);
  }

  m = num / den;

  // b of slope
  b = ymean - m * xmean

}

function drawLine() {
  let x1 = 0;
  let y1 = m * x1 + b;
  let x2 = 1;
  let y2 = m * x2 + b;

  // map the values to the canvas width and height
  x1 = mapValues(x1, 0, 1, 0, canvas.width);
  y1 = mapValues(y1, 0, 1, canvas.height, 0);
  x2 = mapValues(x2, 0, 1, 0, canvas.width);
  y2 = mapValues(y2, 0, 1, canvas.height, 0);

  context.strokeStyle = "rgb(255, 0, 255)";
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}


function mousePressed(event) {
  let x = mapValues(event.clientX, 0, canvas.width, 0, 1)
  let y = mapValues(event.clientY, 1, canvas.height, 1, 0)

  var point = {x: x, y: y};

  data.push(point)
  
}

function draw () {
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < data.length; i++) {
    var x = mapValues(data[i].x, 0, 1, 0, canvas.width);
    var y = mapValues(data[i].y, 0, 1, canvas.height, 0);
    context.fillStyle = "white";
    context.beginPath();
    context.ellipse(x, y, 4, 4, 45 * Math.PI / 180, 0, Math.PI * 2);
    context.fill();
  }

  if (data.length > 1) {
    linearRegression();
    drawLine();
  }


  window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);

setup();

function mapValues(n, start1, stop1, start2, stop2) { 
  var newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;

  return newval;
}

