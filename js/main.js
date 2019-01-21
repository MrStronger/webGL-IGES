
var canvas = document.getElementById('canvas')
var gl = canvas.getContext('webgl')

gl.clearColor(0.5, 0.5, 0.5, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

var vsFile = 'glsl/point.vert'
var fsFile = 'glsl/point.frag'

initShader(gl, vsFile, fsFile, (glProgram) => {
  gl.drawArrays(gl.POINTS, 0, 1);
})

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
