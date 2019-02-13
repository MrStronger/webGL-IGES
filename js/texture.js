

function createTexture(gl) {
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  var a_TexCoord1 = gl.getAttribLocation(gl.program, 'a_TexCoord1')
  var a_TexCoord2 = gl.getAttribLocation(gl.program, 'a_TexCoord2')
  var u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1')
  var u_Sampler2 = gl.getUniformLocation(gl.program, 'u_Sampler2')
  
  var recData = new Float32Array([
    -0.5, 0.5, 0.0, 2.0, -1.0, 2.0,
    -0.5, -0.5, 0.0, 0.0, -1.0, 0.0,
    0.5, 0.5, 2.0, 2.0, 1.0, 2.0,
    0.5, -0.5, 2.0, 0.0, 1.0, 0.0
  ])
  var FSIZE = recData.BYTES_PER_ELEMENT

  var pointBuffer = gl.createBuffer()
  
  gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, recData, gl.STATIC_DRAW)
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 6, 0)
  gl.vertexAttribPointer(a_TexCoord1, 2, gl.FLOAT, false, FSIZE * 6, FSIZE * 2)
  gl.vertexAttribPointer(a_TexCoord2, 2, gl.FLOAT, false, FSIZE * 6, FSIZE * 4)
  gl.enableVertexAttribArray(a_Position)
  gl.enableVertexAttribArray(a_TexCoord1)
  gl.enableVertexAttribArray(a_TexCoord2)

  var image1 = new Image()
  var image2 = new Image()
  var texture1 = gl.createTexture()
  var texture2 = gl.createTexture()

  var isTexUnit0Active = false, isTexUnit1Active = false
  image1.onload = () => loadTexture(gl, texture1, image1, u_Sampler1, 1)
  image2.onload = () => loadTexture(gl, texture2, image2, u_Sampler2, 2)
  image1.src = '../webGL/res/sky.jpg'
  image2.src = '../webGL/res/circle.gif'

  function loadTexture(gl, texture, image, u_Sampler, index) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    
    if(index === 1) {
      gl.activeTexture(gl.TEXTURE0)
      isTexUnit0Active = true
    } else {
      gl.activeTexture(gl.TEXTURE1)
      isTexUnit1Active = true
    }
    gl.bindTexture(gl.TEXTURE_2D, texture)
  
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image)
    gl.uniform1i(u_Sampler, index - 1)
  
    if (isTexUnit0Active && isTexUnit1Active) {
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    
  }
}



module.exports = createTexture