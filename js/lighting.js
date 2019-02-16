
var Matrix4 = require('../lib/cuon-matrix')

function lighting(gl) {
  
  var n = initVertexBuffers(gl);

  var glProgram = gl.program

  var projViewModelMat = new Matrix4()
  var modelmatrix = new Matrix4()
  modelmatrix.setRotate(0, 0,1,0)
  projViewModelMat.setPerspective(40, 1, 1, 100).lookAt(3,3,7, 0,0,0, 0,1,0)
  projViewModelMat.multiply(modelmatrix)
  var u_ProjViewModelMat = gl.getUniformLocation(glProgram, 'u_ProjViewModelMat')
  gl.uniformMatrix4fv(u_ProjViewModelMat, false, projViewModelMat.elements)

  var u_LightColor = gl.getUniformLocation(glProgram, 'u_LightColor')
  gl.uniform3f(u_LightColor, 1.0, 1.0, 1.0)

  var lightDiraction = new Matrix4.Vector3([0.5, 3.0, 10.0])
  lightDiraction.normalize()
  var u_LightDiraction = gl.getUniformLocation(glProgram, 'u_LightDiraction')
  gl.uniform3fv(u_LightDiraction, lightDiraction.elements)

  var colorTransform = new Matrix4()
  var u_NormalMatrix = gl.getUniformLocation(glProgram, 'u_NormalMatrix')
  gl.uniformMatrix4fv(u_NormalMatrix, false, colorTransform.elements)

  var u_AmbientLight = gl.getUniformLocation(glProgram, 'u_AmbientLight')
  gl.uniform3f(u_AmbientLight, 0.2, 0.2, 0.2)
  

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0)

  
  function frame() {
    projViewModelMat.rotate(1,0,1,0)
    modelmatrix.rotate(1,0,1,0)
    colorTransform.setInverseOf(modelmatrix)
    colorTransform.transpose()
    gl.uniformMatrix4fv(u_ProjViewModelMat, false, projViewModelMat.elements)
    gl.uniformMatrix4fv(u_NormalMatrix, false, colorTransform.elements)

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0)
    window.requestAnimationFrame(frame)
  }
  frame()

}
function initVertexBuffers(gl) {
  // Create a cube
  //    v6----- v5
  //   /|      /|
  //  v1------v0|
  //  | |     | |
  //  | |v7---|-|v4
  //  |/      |/
  //  v2------v3
  var vertices = new Float32Array([   // Coordinates
     1.0, 1.0, 1.0,  -1.0, 1.0, 1.0,  -1.0,-1.0, 1.0,   1.0,-1.0, 1.0, // v0-v1-v2-v3 front
     1.0, 1.0, 1.0,   1.0,-1.0, 1.0,   1.0,-1.0,-1.0,   1.0, 1.0,-1.0, // v0-v3-v4-v5 right
     1.0, 1.0, 1.0,   1.0, 1.0,-1.0,  -1.0, 1.0,-1.0,  -1.0, 1.0, 1.0, // v0-v5-v6-v1 up
    -1.0, 1.0, 1.0,  -1.0, 1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0,-1.0, 1.0, // v1-v6-v7-v2 left
    -1.0,-1.0,-1.0,   1.0,-1.0,-1.0,   1.0,-1.0, 1.0,  -1.0,-1.0, 1.0, // v7-v4-v3-v2 down
     1.0,-1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0, 1.0,-1.0,   1.0, 1.0,-1.0  // v4-v7-v6-v5 back
  ]);

  var colors = new Float32Array([    // Colors
    1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v0-v1-v2-v3 front
    1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v0-v3-v4-v5 right
    1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v0-v5-v6-v1 up
    1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v1-v6-v7-v2 left
    1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v7-v4-v3-v2 down
    1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0　    // v4-v7-v6-v5 back
 ]);

  var normals = new Float32Array([    // Normal
    0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
    1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
    0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
   -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
    0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,  // v7-v4-v3-v2 down
    0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0   // v4-v7-v6-v5 back
  ]);

  // Indices of the vertices
  var indices = new Uint8Array([
     0, 1, 2,   0, 2, 3,    // front
     4, 5, 6,   4, 6, 7,    // right
     8, 9,10,   8,10,11,    // up
    12,13,14,  12,14,15,    // left
    16,17,18,  16,18,19,    // down
    20,21,22,  20,22,23     // back
 ]);

  initArrayBuffer(gl, 'a_Position', vertices, 3, gl.FLOAT)
  initArrayBuffer(gl, 'a_Color', colors, 3, gl.FLOAT)
  initArrayBuffer(gl, 'a_Normal', normals, 3, gl.FLOAT)

  var indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
}

function initArrayBuffer (gl, attribute, data, num, type) {
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  
  var a_attribute = gl.getAttribLocation(gl.program, attribute);
  gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  gl.enableVertexAttribArray(a_attribute);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

module.exports = lighting