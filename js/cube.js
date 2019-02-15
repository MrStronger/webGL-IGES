
var Matrix4 = require('../lib/cuon-matrix')

function changeView(gl) {
  var glProgram = gl.program
  var a_Position = gl.getAttribLocation(glProgram, 'a_Position')
  var a_Color = gl.getAttribLocation(glProgram, 'a_Color')
  var u_ProjViewModelMat = gl.getUniformLocation(glProgram, 'u_ProjViewModelMat')
  
  var verticesColors = new Float32Array([
    // Vertex coordinates and color
     1.0,  1.0,  1.0,     1.0,  1.0,  1.0,  // v0 White
    -1.0,  1.0,  1.0,     1.0,  0.0,  1.0,  // v1 Magenta
    -1.0, -1.0,  1.0,     1.0,  0.0,  0.0,  // v2 Red
     1.0, -1.0,  1.0,     1.0,  1.0,  0.0,  // v3 Yellow
     1.0, -1.0, -1.0,     0.0,  1.0,  0.0,  // v4 Green
     1.0,  1.0, -1.0,     0.0,  1.0,  1.0,  // v5 Cyan
    -1.0,  1.0, -1.0,     0.0,  0.0,  1.0,  // v6 Blue
    -1.0, -1.0, -1.0,     0.0,  0.0,  0.0   // v7 Black
  ]);

  // Indices of the vertices
  var indices = new Uint8Array([
    0, 1, 2,   0, 2, 3,    // front
    0, 3, 4,   0, 4, 5,    // right
    0, 5, 6,   0, 6, 1,    // up
    1, 6, 7,   1, 7, 2,    // left
    7, 4, 3,   7, 3, 2,    // down
    4, 7, 6,   4, 6, 5     // back
 ]);
  var FSIZE = verticesColors.BYTES_PER_ELEMENT

  var vertexBuffer = gl.createBuffer()
  var indicesBuffer = gl.createBuffer()
  
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW)
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0)
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3)
  gl.enableVertexAttribArray(a_Position)
  gl.enableVertexAttribArray(a_Color)

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)

  var projViewModelMat = new Matrix4()
  projViewModelMat.setPerspective(40, 1, 1, 100).lookAt(3,3,7, 0,0,0, 0,1,0)
  gl.uniformMatrix4fv(u_ProjViewModelMat, false, projViewModelMat.elements)

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_BYTE, 0)

  function frame() {
    projViewModelMat.rotate(1,0,1,0)
    gl.uniformMatrix4fv(u_ProjViewModelMat, false, projViewModelMat.elements)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_BYTE, 0)
    window.requestAnimationFrame(frame)
  }
  frame()

}

module.exports = changeView