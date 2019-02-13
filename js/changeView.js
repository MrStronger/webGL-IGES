
var Matrix4 = require('../lib/cuon-matrix')

function changeView(gl) {
  var glProgram = gl.program
  var a_Position = gl.getAttribLocation(glProgram, 'a_Position')
  var a_Color = gl.getAttribLocation(glProgram, 'a_Color')
  var u_viewModelMatrix = gl.getUniformLocation(glProgram, 'u_viewModelMatrix')
  
  var vertexData = new Float32Array([
    // Vertex coordinates and color(RGBA)
    0.0,  0.5,  -0.4,  0.4,  1.0,  0.4, // The back green one
   -0.5, -0.5,  -0.4,  0.4,  1.0,  0.4,
    0.5, -0.5,  -0.4,  1.0,  0.4,  0.4, 
  
    0.5,  0.4,  -0.2,  1.0,  0.4,  0.4, // The middle yellow one
   -0.5,  0.4,  -0.2,  1.0,  1.0,  0.4,
    0.0, -0.6,  -0.2,  1.0,  1.0,  0.4, 

    0.0,  0.5,   0.0,  0.4,  0.4,  1.0,  // The front blue one 
   -0.5, -0.5,   0.0,  0.4,  0.4,  1.0,
    0.5, -0.5,   0.0,  1.0,  0.4,  0.4, 
  ])
  var FSIZE = vertexData.BYTES_PER_ELEMENT

  var vertexBuffer = gl.createBuffer()
  
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW)
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0)
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3)
  gl.enableVertexAttribArray(a_Position)
  gl.enableVertexAttribArray(a_Color)

  var viewModelMatrix = new Matrix4()
  viewModelMatrix.setLookAt(0.25,0.25,0.25, 0,0,0, 0,1,0)
  gl.uniformMatrix4fv(u_viewModelMatrix, false, viewModelMatrix.elements)

  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.drawArrays(gl.TRIANGLES, 0, 9)

  function animate() {
    viewModelMatrix.rotate(-1, 0,1,0)
    gl.uniformMatrix4fv(u_viewModelMatrix, false, viewModelMatrix.elements)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 9)

    window.requestAnimationFrame(animate)
  }
  animate()

}

module.exports = changeView