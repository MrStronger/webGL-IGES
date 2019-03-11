
var m_openFile = require('./openFile')
var m_parseIGES = require('./parseIGES')

var canvas = document.getElementById('canvas')
var gl = canvas.getContext('webgl')
gl.clearColor(0.0, 0.0, 0.0, 0.9)
gl.enable(gl.DEPTH_TEST)

m_openFile(function(source) {
  var iges = m_parseIGES(source)
  var entities = iges.entities
  console.log(new Set(entities.map((e) => parseInt(e.type)).sort()))
  var entity
  for(var i = 0; i < entities.length; i++) {
    entity = entities[i]
    switch (entity.type) {
      case '100': drawCArc(entity);break;
      case '102': drawCCurve(entity);break;
      case '108': drawPlane(entity);break;
      case '110': drawLine(entity);break;
      case '120': drawRSurface(entity);break;
      case '122': drawTCylinder(entity);break;
      case '124': drawTransMatrix(entity);break;
      case '126': drawRBSplineCurve(entity);break;
      case '142': drawCurveOnPSurface(entity);break;
      case '144': drawTPSurface(entity);break;
      case '314': drawColor(entity);break;
      case '402': drawAInstance(entity);break;
      default: console.log('Uncompliment entity type', entity.type)
    }
  }
});




initShader(gl, 'glsl/robotArm.vert', 'glsl/robotArm.frag', () => {})

function initShader(gl, vsFile, fsFile, cb){
  var vs_source = null, fs_source = null, vertexShader = null, fragmentShader = null
  var onShaderLoaded = () => {
    if(vs_source !== null && fs_source !== null) {
      vertexShader = gl.createShader(gl.VERTEX_SHADER)
      gl.shaderSource(vertexShader, vs_source)
      gl.compileShader(vertexShader)

      fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
      gl.shaderSource(fragmentShader, fs_source)
      gl.compileShader(fragmentShader)

      gl.attachShader(glProgram, vertexShader)
      gl.attachShader(glProgram, fragmentShader)

      gl.linkProgram(glProgram)
      gl.useProgram(glProgram)
      gl.program = glProgram

      cb(gl)
    }
  }
  readFileAsync(vsFile, (vsContent) => {
    vs_source = vsContent
    onShaderLoaded()
  })
  readFileAsync(fsFile, (fsContent) => {
    fs_source = fsContent
    onShaderLoaded()
  })

  var glProgram = gl.createProgram()
}

