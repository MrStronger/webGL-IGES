var Matrix4 = require('../lib/cuon-matrix')

var Entity = function(attribute = {entityType:''}, params = []){
  this.type = attribute.entityType
  this.attr = attribute
  this.params = params
}

function IGES(){
  this.fieldDelimiter = ','; // as default
  this.termDelimiter = ';';  // as default 
  this.entities = new Array();
  return this;
}

IGES.prototype.parseStart = function (data) {
  this.comment = data
}
IGES.prototype.parseGlobal = function (data) {
  if(data[0] != ',') {
    this.fieldDelimiter = parseIgesString(data);
  }
  var fields = data.split(this.fieldDelimiter);
  if(data[0] != ',') { fields.splice(0, 1); }
  
  this.termDelimiter = parseIgesString(fields[1]) || ';';
  this.exportID = parseIgesString(fields[2]);
  this.fileName = parseIgesString(fields[3]);
  this.systemID = parseIgesString(fields[4]);
  this.translateVer = parseIgesString(fields[5]);
  this.integerBits = fields[6];
  this.singleExpBits = fields[7];
  this.singleMantissaBits = fields[8];
  this.doubleExpBits = fields[9];
  this.doubleMantissaBits = fields[10];
  this.receiveID = parseIgesString(fields[11]);
  this.scale = fields[12];
  this.unitFlag = fields[13];
  this.unit = parseIgesString(fields[14]);
  this.maxStep = fields[15];
  this.maxWidth = fields[16];
  this.createDate = parseIgesString(fields[17]);
  this.resolution = fields[18];
  this.maxValue = fields[19];
  this.createUser = parseIgesString(fields[20]);
  this.createOrg = parseIgesString(fields[21]);
  this.igesVer = fields[22];
  this.formatCode = fields[23];
  this.lastModifiedDate = parseIgesString(fields[24]);
}
IGES.prototype.parseDirection = function (data) {
  for(var i = 0; i < data.length; i += 144) {
    var entity = new Entity();
    var attr = entity.attr;
    var item = data.substr(i, 144);
    attr.entityType = parseInt(item.substr(0, 8));
    attr.entityIndex = parseInt(item.substr(8, 8));
    attr.igesVersion = parseInt(item.substr(16, 8));
    attr.lineType = parseInt(item.substr(24, 8));
    attr.level = parseInt(item.substr(32, 8));
    attr.view = parseInt(item.substr(40, 8));
    attr.transMatrix = parseInt(item.substr(48, 8));
    attr.labelDisp = parseInt(item.substr(56, 8));
    attr.status = item.substr(64, 8);

    attr.lineWidth = parseInt(item.substr(80, 8));
    attr.color = parseInt(item.substr(88, 8));
    attr.paramLine = parseInt(item.substr(96, 8));
    attr.formNumber = parseInt(item.substr(104, 8));
    

    attr.entityName = item.substr(128, 8).trim();
    attr.entitySub = parseInt(item.substr(136, 8));

    this.entities.push(entity);
  }

}
IGES.prototype.parseParameter = function (data) {
  var params = data.split(';');
  params.pop();
  params = params.map(function(item) {
    return item.split(',');
  })
  var entity;
  for(var i = 0; i < params.length; i++) {
    entity = this.entities[i];
    entity.type = params[i].shift();
    entity.params = params[i].map(parseIgesFloat)
  }
}

IGES.prototype.parseTerminate = function (data) {
  this.lineNum_S = parseInt(data.substr(1, 7));
  this.lineNum_G = parseInt(data.substr(9, 7));
  this.lineNum_D = parseInt(data.substr(17, 7));
  this.lineNum_P = parseInt(data.substr(25, 7));

  if(this.entities.length != (this.lineNum_D / 2)) throw new Error('ERROR: Inconsistent')
}

function parseIges(source){
  
  var iges = new IGES();
  var lines = source.split('\n').filter(function(item){ return item != '' });
  var currentSection = '';
  var startSec = '', globalSec = '', dirSec = '', paramSec = '', terminateSec = '';
  var line = '';
  for(var i = 0; i < lines.length; i++){
    line = lines[i];
    currentSection = line[72];
    line = line.substr(0, 72);
    switch (currentSection){
      case 'S': {
        startSec += line.trim();
        break;
      }
      case 'G': {
        globalSec += line.trim();
        break;
      }
      case 'D': {
        dirSec += line;
        break;
      }
      case 'P': {
        paramSec += line.substr(0, 64).trim();
        break;
      }
      case 'T': {
        terminateSec += line;
        break;
      }
      default: throw new TypeError('ERROR: Unknown IGES section type');
    }
  }
  iges.parseStart(startSec);
  iges.parseGlobal(globalSec);
  iges.parseDirection(dirSec);
  iges.parseParameter(paramSec);
  iges.parseTerminate(terminateSec);
  return iges;
}

function parseIgesFloat(p)
{
    return parseFloat(p.replace(/D/g, "e"));
}
function parseIgesString(str)
{
    // iges string (fortran) form: <length>H<str>
    var d = str.indexOf('H');
    if(d == -1) return null;
    var digit = str.substr(0, d);
    var value = str.substr(d+1, digit);
    return value;
}

module.exports = parseIges