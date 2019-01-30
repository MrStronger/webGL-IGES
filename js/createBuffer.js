function createBuffer(gl, attribute, data, size) {

  if(!Array.isArray(data)) return

  var typedData = new Float32Array(data)

  var pointBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, typedData, gl.STATIC_DRAW)

  gl.vertexAttribPointer(attribute, size, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(attribute)

}

module.exports = createBuffer