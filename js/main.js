
var DrawPointOnClick = require('./drawPointOnClick.js')
var useBufferToDraw = require('./useBufferToDraw.js')

var canvas = document.getElementById('canvas')
var gl = canvas.getContext('webgl')

initShader(gl, 'glsl/point.vert', 'glsl/point.frag', (glProgram) => useBufferToDraw(canvas, gl, glProgram))

function initShader(gl, vsFile, fsFile, cb){
  var vs_source = null, fs_source = null, vertexShader = null, fragmentShader = null
  var onShaderLoaded = () => {
    if(vs_source !== null && fs_source !== null) {
      vertexShader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertexShader, vs_source);
      gl.compileShader(vertexShader);

      fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragmentShader, fs_source);
      gl.compileShader(fragmentShader);

      gl.attachShader(glProgram, vertexShader);
      gl.attachShader(glProgram, fragmentShader);

      gl.linkProgram(glProgram);
      gl.useProgram(glProgram);

      cb(glProgram)
    }
  }
  loadShaderFromFile(vsFile, (vsContent) => {
    vs_source = vsContent
    onShaderLoaded()
  })
  loadShaderFromFile(fsFile, (fsContent) => {
    fs_source = fsContent
    onShaderLoaded()
  })

  var glProgram = gl.createProgram()
}

