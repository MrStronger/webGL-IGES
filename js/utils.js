function loadShaderFromFile(filename, onLoadShader) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
      if(request.readyState === 4 && request.status >= 200 && request.status <=300) {
          onLoadShader(request.responseText);
      } else {
          throw TypeError('load shader file failed' + request.status)
      }
  };
  request.open("GET", filename, true);
  request.send();
}