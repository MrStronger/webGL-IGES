
var Matrix4 = require('../lib/cuon-matrix')

function changeView(gl) {
  var glProgram = gl.program
  var a_Position = gl.getAttribLocation(glProgram, 'a_Position')
  var a_Color = gl.getAttribLocation(glProgram, 'a_Color')
  var u_ProjViewModelMat = gl.getUniformLocation(glProgram, 'u_ProjViewModelMat')
  
  var vertexData = new Float32Array([
     
     0.0,  1.0,   0.0,  0.4,  0.4,  1.0,  // The front blue one 
    -0.5, -1.0,   0.0,  0.4,  0.4,  1.0,
     0.5, -1.0,   0.0,  1.0,  0.4,  0.4, 
     // Vertex coordinates and color
     0.0,  1.0,  -2.0,  0.4,  1.0,  0.4, // The back green one
    -0.5, -1.0,  -2.0,  0.4,  1.0,  0.4,
     0.5, -1.0,  -2.0,  1.0,  0.4,  0.4, 

     0.0,  1.0,  -4.0,  1.0,  1.0,  0.4, // The middle yellow one
    -0.5, -1.0,  -4.0,  1.0,  1.0,  0.4,
     0.5, -1.0,  -4.0,  1.0,  0.4,  0.4, 

  ])
  var FSIZE = vertexData.BYTES_PER_ELEMENT

  var vertexBuffer = gl.createBuffer()
  
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW)
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0)
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3)
  gl.enableVertexAttribArray(a_Position)
  gl.enableVertexAttribArray(a_Color)

  var projMatrix = new Matrix4()
  var viewMatrix = new Matrix4()
  var modelMatrix = new Matrix4()
  var projViewModelMat = new Matrix4()
  
  modelMatrix.setTranslate(0.75, 0, 0)
  projMatrix.setPerspective(40, 1, 1, 100)
  viewMatrix.setLookAt(0,0,5, 0,0,-100, 0,1,0)

  projViewModelMat.set(projMatrix).multiply(viewMatrix).multiply(modelMatrix) 
  gl.uniformMatrix4fv(u_ProjViewModelMat, false, projViewModelMat.elements)
  gl.enable(gl.POLYGON_OFFSET_FILL)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLES, 0, 9)

  modelMatrix.setTranslate(-0.75, 0, 0)
  projViewModelMat.set(projMatrix).multiply(viewMatrix).multiply(modelMatrix) 
  gl.uniformMatrix4fv(u_ProjViewModelMat, false, projViewModelMat.elements)
  gl.polygonOffset(1.0, 1.0)
  gl.drawArrays(gl.TRIANGLES, 0, 9)

}

module.exports = changeView