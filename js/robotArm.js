
var Matrix4 = require('../lib/cuon-matrix')

function lighting(gl) {
  
  var n = initVertexBuffers(gl);

  var glProgram = gl.program

  var u_LightColor = gl.getUniformLocation(glProgram, 'u_LightColor')
  var u_LightPosition = gl.getUniformLocation(glProgram, 'u_LightPosition')
  var u_AmbientLight = gl.getUniformLocation(glProgram, 'u_AmbientLight')
  gl.uniform3f(u_LightColor, 1.5, 1.5, 1.5)
  gl.uniform3f(u_LightPosition, 2.0, 10.0, 5.0)
  gl.uniform3f(u_AmbientLight, 0.2, 0.2, 0.2)

  var modelMatrix = new Matrix4()
  var projViewModelMat = new Matrix4()
  var normalMatrix = new Matrix4()

  var u_ModelMatrix = gl.getUniformLocation(glProgram, 'u_ModelMatrix')
  var u_ProjViewModelMat = gl.getUniformLocation(glProgram, 'u_ProjViewModelMat')
  var u_NormalMatrix = gl.getUniformLocation(glProgram, 'u_NormalMatrix')
  
  projViewModelMat.setPerspective(60, 1, 1, 100).lookAt(20, 10, 30, 0, 0, 0, 0, 1, 0)
  gl.uniformMatrix4fv(u_ProjViewModelMat, false, projViewModelMat.elements)
  
  var g_modelSnapshotMatrix = new Matrix4()
  var g_modelMatrix = new Matrix4()
  var g_copyModelMatrix = new Matrix4()
  var g_angle1 = 0, g_angle2 = 45, g_angle3 = 0, g_angle4 = 0, g_angle5 = 0

  draw()
  
  document.onkeydown = (ev) => keydown(ev)

  function keydown(ev) {
    switch (ev.keyCode) {
      case 37: g_angle1 -= 5;break;
      case 38: g_angle2 < -135 ? null: g_angle2 -= 5;break;
      case 39: g_angle1 += 5;break;
      case 40: g_angle2 >  135 ? null: g_angle2 += 5;break;
      case 65: g_angle3 -= 5;break;
      case 68: g_angle3 += 5;break;
      case 87: g_angle4 > 20 ? null: g_angle4 += 10;break;
      case 83: g_angle4 < -45 ? null: g_angle4 -= 10;break;
      default: break;
    }
    draw()
  }

  function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    g_modelMatrix.setTranslate(0.0, -8.0, 0.0)
    drawBox(g_modelMatrix, [6.0, 1.0, 6.0])

    g_modelMatrix.translate(0.0, 1.0, 0.0).rotate(g_angle1, 0,1,0)
    drawBox(g_modelMatrix, [1.5, 6.0, 1.5])

    g_modelMatrix.translate(0.0, 6.0, 0.0).rotate(g_angle2, 1,0,0)
    drawBox(g_modelMatrix, [2.0, 8.0, 2.0])

    g_modelMatrix.translate(0.0, 8.0, 0.0).rotate(g_angle3, 0,1,0)
    drawBox(g_modelMatrix, [2.4, 1.0, 1.5])

    g_modelMatrix.translate(0.0, 1.0, 0.0)
    g_copyModelMatrix.set(g_modelMatrix)
    g_modelMatrix.translate(1.0, 0.0, 0.0).rotate(g_angle4, 0,0,1)
    drawBox(g_modelMatrix, [0.5, 2.0, 0.5])

    g_modelMatrix.set(g_copyModelMatrix)
    g_modelMatrix.translate(-1.0, 0.0, 0.0).rotate(-g_angle4, 0,0,1)
    drawBox(g_modelMatrix, [0.5, 2.0, 0.5])
  }

  function drawBox(transform, scaleOption) {
    g_modelSnapshotMatrix.set(modelMatrix)
    g_modelSnapshotMatrix.multiply(transform).scale(...scaleOption)
    normalMatrix.setInverseOf(g_modelSnapshotMatrix)
    normalMatrix.transpose()
    gl.uniformMatrix4fv(u_ModelMatrix, false, g_modelSnapshotMatrix.elements)
    gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements)
    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0)
  }

}
function initVertexBuffers(gl) {
    // Coordinates（Cube which length of one side is 1 with the origin on the center of the bottom)
  var vertices = new Float32Array([
    0.5, 1.0, 0.5, -0.5, 1.0, 0.5, -0.5, 0.0, 0.5,  0.5, 0.0, 0.5, // v0-v1-v2-v3 front
    0.5, 1.0, 0.5,  0.5, 0.0, 0.5,  0.5, 0.0,-0.5,  0.5, 1.0,-0.5, // v0-v3-v4-v5 right
    0.5, 1.0, 0.5,  0.5, 1.0,-0.5, -0.5, 1.0,-0.5, -0.5, 1.0, 0.5, // v0-v5-v6-v1 up
   -0.5, 1.0, 0.5, -0.5, 1.0,-0.5, -0.5, 0.0,-0.5, -0.5, 0.0, 0.5, // v1-v6-v7-v2 left
   -0.5, 0.0,-0.5,  0.5, 0.0,-0.5,  0.5, 0.0, 0.5, -0.5, 0.0, 0.5, // v7-v4-v3-v2 down
    0.5, 0.0,-0.5, -0.5, 0.0,-0.5, -0.5, 1.0,-0.5,  0.5, 1.0,-0.5  // v4-v7-v6-v5 back
  ]);

  // Colors
 var colors = new Float32Array([
  1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v0-v1-v2-v3 front
  1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v0-v3-v4-v5 right
  1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v0-v5-v6-v1 up
  1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v1-v6-v7-v2 left
  1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v7-v4-v3-v2 down
  1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0　    // v4-v7-v6-v5 back
]);

  // Normal
  var normals = new Float32Array([
    0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0, // v0-v1-v2-v3 front
    1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0, // v0-v3-v4-v5 right
    0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0, // v0-v5-v6-v1 up
   -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, // v1-v6-v7-v2 left
    0.0,-1.0, 0.0,  0.0,-1.0, 0.0,  0.0,-1.0, 0.0,  0.0,-1.0, 0.0, // v7-v4-v3-v2 down
    0.0, 0.0,-1.0,  0.0, 0.0,-1.0,  0.0, 0.0,-1.0,  0.0, 0.0,-1.0  // v4-v7-v6-v5 back
  ]);

  // Indices of the vertices
  var indices = new Uint8Array([
    0, 1, 2,   0, 2, 3,     // front
    4, 5, 6,   4, 6, 7,     // right
    8, 9,10,   8,10,11,     // up
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