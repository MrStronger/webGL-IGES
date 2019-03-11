function readFileAsync(filename, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
      if(xhr.readyState === 4 && xhr.status >= 200 && xhr.status <=300) {
          cb(xhr.responseText);
      } else if (xhr.readyState === 4) {
          console.error('load shader file failed: %d', xhr.statusText)
      }
  };
  xhr.open("GET", filename, true);
  xhr.send();
}
 function readFileSync(filename) {

 }