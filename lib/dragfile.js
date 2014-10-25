// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}


var AudioDropZone = function(aDiv) {
  if (aDiv instanceof p5.Graphics) {
    this.div = document.createElement('div');
    this.div.setAttribute("style","width:"+aDiv.width+"px; height:"+aDiv.height+"px");
    this.div.style.position = 'fixed';
    this.div.style.left = aDiv.elt.clientLeft + 'px';
    this.div.style.top = aDiv.elt.clientLeft + 'px';
    document.body.appendChild(this.div);
  }
  else if (aDiv) {
    this.div = aDiv;
  }
  else if (!aDiv) {
    this.div = document.createElement('div');
    this.div.style.width = windowWidth;
    this.div.style.height = windowHeight;
    this.div.style.position = 'fixed';
    this.div.style.left = '0px';
    this.div.style.top = '0px';
    document.body.appendChild(this.div);
  }
  var zone = this;
  console.log(this.div);
  this.div.ondragover = function(e) { 
    e.preventDefault();
    handleDragOver(e, zone);
    return false;
  };
  this.div.ondrop = function(e) {
    e.preventDefault();
    handleFileSelect(e, zone);
    return false;
  }
};

function handleFileSelect(evt, zone) {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer.files; // FileList object.

  // files is a FileList of File objects. List poperties
  var file = files[0];

  if (file.type == 'audio/mp3' || file.type == 'audio/mpeg') {
    fileType = 'mp3';
  }
  else if (file.type == 'audio/wav') {
    fileType = 'wav';
  }
  else if (file.type == 'audio/x-m4a' || file.type == 'audio/aac') {
    fileType = 'm4a';
  }
  else fileType = file.type;

  loadBlob(zone, file);
}

function loadBlob(zone, blob){
  var reader = new FileReader();
  reader.addEventListener('load', function(e) {
    zone.loadArrayBuffer(e.target.result);
  });
  reader.addEventListener('error', function() {
    console.log('error reading blob');
  });
  reader.readAsArrayBuffer(blob);
}

AudioDropZone.prototype.loadArrayBuffer = function(arraybuffer) {
  this.decodeArrayBuffer(arraybuffer, function(data) {
    loadDecodedBuffer(data)
    }, function () {
      console.log('error decoding audiobuffer');
    });
};

AudioDropZone.prototype.decodeArrayBuffer = function(arrayBuffer, callback, error){
  var ac = getAudioContext();
  var zone = this;
  ac.decodeAudioData(arrayBuffer, function (data) {
    console.log(data);
    zone.onTransfer(data);
  });
}

function handleDragOver(evt, zone) {
  console.log('dragging');
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}