
var DrawPointOnClick = require('./drawPointOnClick')
var UseBuffer = require('./createBuffer')
var Transform = require('./transform')

var canvas = document.getElementById('canvas')
var gl = canvas.getContext('webgl')
gl.clearColor(1.0, 0.5, 0.5, 1.0)

initShader(gl, 'glsl/point.vert', 'glsl/point.frag', Transform)

function initShader(gl, vsFile, fsFile, cb){
  var vs_source = null, fs_source = null, vertexShader = null, fragmentShader = null
  var onShaderLoaded = () => {
    if(vs_source !== null && fs_source !== null) {
      vertexShader = gl.createShader(gl.VERTEX_SHADER)
      gl.shaderSource(vertexShader, vs_source)
      gl.compileShader(vertexShader)

      fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
      gl.shaderSource(fragmentShader, fs_source)
      gl.compileShader(fragmentShader)

      gl.attachShader(glProgram, vertexShader)
      gl.attachShader(glProgram, fragmentShader)

      gl.linkProgram(glProgram)
      gl.useProgram(glProgram)
      gl.program = glProgram

      cb(gl)
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

