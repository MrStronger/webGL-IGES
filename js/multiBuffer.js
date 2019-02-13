function multiBuffer(gl) {
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  var a_Color = gl.getAttribLocation(gl.program, 'a_Color')
  
  var pointData = new Float32Array([
    0.0, 0.5, 1.0, 0.0, 0.0,
    -0.5, -0.5, 0.0, 1.0, 0.0,
    0.5, -0.5, 0.0, 0.0, 1.0
  ])
  var FSIZE = pointData.BYTES_PER_ELEMENT

  var pointBuffer = gl.createBuffer()
  
  gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, pointData, gl.STATIC_DRAW)
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0)
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2)
  gl.enableVertexAttribArray(a_Position)
  gl.enableVertexAttribArray(a_Color)

  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLES, 0, 3)

}

module.exports = multiBuffer