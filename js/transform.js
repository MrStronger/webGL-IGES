
var createBuffer = require('./createBuffer')
var Matrix4 = require('../lib/cuon-matrix')

function transform(gl) {
  var glProgram = gl.program
  var a_Position = gl.getAttribLocation(glProgram, 'a_Position')
  var u_FragColor = gl.getUniformLocation(glProgram, 'u_FragColor')
  var u_Transform = gl.getUniformLocation(glProgram, 'u_Transform')
  
  var pointPos = [0.0, 0.3, -0.1, 0.0, 0.1, 0.0]
  var transformMat = new Matrix4()
  transformMat.setRotate(10, 0, 0, 1)
  transformMat.translate(0.3, 0.0, 0.0)
  
  createBuffer(gl, a_Position, pointPos, 2)

  gl.uniformMatrix4fv(u_Transform, false, transformMat.elements)
  gl.uniform4f(u_FragColor, 1.0, 1.0, 0.0, 1.0)

  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.drawArrays(gl.TRIANGLES, 0, 3)

  transformMat.rotate(10, 0, 0, 1)
  gl.uniformMatrix4fv(u_Transform, false, transformMat.elements)
  gl.drawArrays(gl.TRIANGLES, 0, 3)

  transformMat.rotate(10, 0, 0, 1)
  gl.uniformMatrix4fv(u_Transform, false, transformMat.elements)
  gl.drawArrays(gl.TRIANGLES, 0, 3)

}

module.exports = transform