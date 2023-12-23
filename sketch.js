let buffer = [];
let serial;
let portName = 'COM3'
let bufferLength
let tilesX, tilesY, matrixWidth, matrixHeight, numChannels

let angle = 0;
let w = 10;
let ma;
let maxD;

let frames = 100;

function setup() {
  createCanvas(64, 64, WEBGL);
  tilesX = 1;
  tilesY = 1;
  matrixHeight = 64;
  matrixWidth = 64;
  numChannels = 3
  bufferLength = tilesX * matrixWidth * tilesY * matrixHeight * numChannels;
  // Assuming tex is a loaded image
  // You may replace this with your own image loading code
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
  ma = atan(cos(QUARTER_PI));
  maxD = dist(0, 0, 60, 60);
}

function draw() {
  
  background(0);
  ortho(-64, 64, 64, -64, 0, 110);
  rotateX(-ma);
  rotateY(-QUARTER_PI);

  for (let z = 0; z < height; z += w) {
    for (let x = 0; x < width; x += w) {
      push();
      let d = dist(x, z, width / 2, height / 2);
      let offset = map(d, 0, maxD, -PI, PI);
      let a = angle + offset;
      let h = floor(map(sin(a), -1, 1, 20, 60));
      translate(x - tex.width / 2, 0, z - tex.height / 2);
      normalMaterial();
      box(w, h, w);
      pop();
    }
  }
  angle -= TWO_PI / frames; 

  loadPixels();
  let idx = 0;
  let id = 0
  for(let x = 0; x < matrixHeight; x++) {
    for(let y = 0; y < matrixWidth; y++) {
      buffer[id] = pixels[idx]
      id++;
      idx++;
      buffer[id] = pixels[idx]
      id++;
      idx++
      buffer[id] = pixels[idx]
      id++;
      idx++
      idx++
    }

  }
  
  serial.write('*');     // The 'data' command
  serial.write(buffer);

}

function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    console.log(i + portList[i]);
  }
}

function serverConnected() {
  console.log('connected to server.');
}
 
function portOpen() {
  console.log('the serial port opened.')
}
 
function serialEvent() {
 
}
 
function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  console.log('The serial port closed.');
}


// You may also want to add a preload() function to load the image before setup()
// if it's a large image and you want to ensure it's fully loaded before using it.
