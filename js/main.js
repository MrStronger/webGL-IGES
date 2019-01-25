
var canvas = document.getElementById('canvas')
var gl = canvas.getContext('webgl')

initShader(gl, 'glsl/point.vert', 'glsl/point.frag', (glProgram) => {

  var a_Position = gl.getAttribLocation(glProgram, 'a_Position');
  gl.clearColor(1.0, 0.5, 0.5, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0)
  gl.drawArrays(gl.POINTS, 0, 1);

  var points = [[0.0, 0.0]]
  canvas.onclick = (ev) => onCanvasClick(ev, gl, canvas, a_Position, points)
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

function onCanvasClick(ev, gl, canvas, a_Position, points) {
  var x = ev.clientX, y = ev.clientY, canvasRect = canvas.getBoundingClientRect()

  x =(x - canvasRect.left - canvas.width/2) / (canvas.width/2)
  y = (canvas.height/2 - (y - canvasRect.top)) / (canvas.height/2)
  points.push([x,y])
  gl.clear(gl.COLOR_BUFFER_BIT)

  for(let i = 0; i < points.length; i++) {
    gl.vertexAttrib3f(a_Position, points[i][0], points[i][1], 0.0)
    gl.drawArrays(gl.POINTS, 0, 1);
  }
  
}