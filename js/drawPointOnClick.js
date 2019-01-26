

function onCanvasClick(ev, gl, canvas, a_Position, u_FragColor, points, colors) {
  var x = ev.clientX, y = ev.clientY, canvasRect = canvas.getBoundingClientRect()

  x =(x - canvasRect.left - canvas.width/2) / (canvas.width/2)
  y = (canvas.height/2 - (y - canvasRect.top)) / (canvas.height/2)
  points.push([x,y])
  colors.push([Math.abs(x),Math.abs(y),Math.abs(x+y-1),1.0])
  gl.clear(gl.COLOR_BUFFER_BIT)

  for(let i = 0; i < points.length; i++) {
    gl.vertexAttrib3f(a_Position, points[i][0], points[i][1], 0.0)
    gl.uniform4f(u_FragColor, ...colors[i])
    gl.drawArrays(gl.POINTS, 0, 1);
  }
  
}

function drawPointOnClick(canvas, gl, glProgram) {
  var a_Position = gl.getAttribLocation(glProgram, 'a_Position')
  var u_FragColor = gl.getUniformLocation(glProgram, 'u_FragColor')
  gl.clearColor(1.0, 0.5, 0.5, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0)
  gl.uniform4f(u_FragColor, ...[1.0,1.0,0.0,1.0])
  gl.drawArrays(gl.POINTS, 0, 1);

  var points = [[0.0, 0.0]], colors = [[1.0,1.0,0.0,1.0]]
  canvas.onclick = (ev) => onCanvasClick(ev, gl, canvas, a_Position, u_FragColor, points, colors)
}

module.exports = drawPointOnClick