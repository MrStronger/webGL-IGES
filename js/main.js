
var canvas = document.getElementById('canvas')
var gl = canvas.getContext('webgl')

gl.clearColor(0.5, 0.5, 0.5, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

var point_vs_source = 'glsl/point.vert'
var point_fs_source = 'gl/point.frag'

loadShaderFromFile(point_vs_source, function(vsContent){
  point_vs_source = vsContent
})
var vertexShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vertexShader, point_vs_source)
gl.compileShader(vertexShader)

loadShaderFromFile(point_fs_source, function(fsContent){
  point_fs_source = fsContent
})
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragmentShader, point_fs_source)
gl.compileShader(fragmentShader)

var glProgram = gl.createProgram()

gl.attachShader(glProgram, vertexShader)
gl.attachShader(glProgram, fragmentShader)

gl.linkProgram(glProgram)
gl.useProgram(glProgram)
gl.drawArrays(gl.POINTS, 0, 1);
