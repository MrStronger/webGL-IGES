
function openFile(cb) {
  var result;
  var openBtn = document.getElementById('openBtn'),
    fileBtn = document.getElementById('file'),
    fileMsg = document.getElementById('fileMsg')

  openBtn.onclick = function() {
    fileBtn.click()
  }

  
  fileBtn.onchange = function() {
    var selectedFile = fileBtn.files[0]
    var name = selectedFile.name
    var size = selectedFile.size
    if(!name.match(/^.*?\.(igs|iges|IGS|IGES)$/)){
      alert('只能读取后缀为".igs、.iges"的文件')
      return
    }
    fileMsg.innerText = name + ' ' + (size / 1024).toFixed(0) + 'KB'

    var reader = new FileReader()
    reader.readAsText(selectedFile)

    reader.onload = function(){
      openBtn.innerText = '打开文件'
      openBtn.disabled = false
      cb(this.result)
    };

    reader.onprogress = function() {
      if(reader.readyState == 'LOADING') {
        openBtn.innerText = '正在读取文件'
        openBtn.disabled = true
      }
    }

    reader.onerror = function() {
      reader.abort();
      alert('读取文件出错, 请重试')
      openBtn.innerText = '打开文件'
      openBtn.disabled = false
    }

  }
  return result
}
module.exports = openFile