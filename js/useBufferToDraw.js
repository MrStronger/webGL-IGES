function useBufferToDraw(canvas, gl, glProgram) {
  var a_Position = gl.getAttribLocation(glProgram, 'a_Position')
  var u_FragColor = gl.getUniformLocation(glProgram, 'u_FragColor')
  var pointData = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5])

  var pointBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, pointData, gl.STATIC_DRAW)

  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(a_Position)

  gl.clearColor(1.0, 0.5, 0.5, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  
  gl.uniform4f(u_FragColor, ...[1.0,1.0,0.0,1.0])

  gl.drawArrays(gl.TRIANGLES, 0, 3)

}

module.exports = useBufferToDraw