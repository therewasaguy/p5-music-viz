/**
 *  dragfile.js is a lil helper for dragging audio files onto divs or p5.Grpahics.
 *
 *  function makeDropZone(myCanvas, soundFile) {
 *    var dropZone = new AudioDropZone(myCanvas);
 *    dropZone.onTransfer = function(newBuffer) {
 *      soundFile.buffer = newBuffer;
 *    };
 *  }
 */


// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}


var AudioDropZone = function(aDiv) {
  // if a p5.Graphics/Canvas object is provided, make that a dropzone!
  if (aDiv instanceof p5.Graphics) {
    this.div = document.createElement('div');
    this.div.setAttribute("style","width:"+aDiv.width+"px; height:"+aDiv.height+"px");
    this.div.style.position = 'fixed';
    this.div.style.left = aDiv.elt.clientLeft + 'px';
    this.div.style.top = aDiv.elt.clientLeft + 'px';
    document.body.appendChild(this.div);
  }
  // if a <div> is provided, make the div a dropzone!
  else if (aDiv) {
    this.div = aDiv;
  }
  // if no div is provided, make the whole window a dropzone!
  else if (!aDiv) {
    this.div = document.createElement('div');
    this.div.setAttribute("style","width:"+windowWidth+"px; height:"+windowHeight+"px");
    this.div.style.position = 'fixed';
    this.div.style.left = '0px';
    this.div.style.top = '0px';
    document.body.appendChild(this.div);
  }

  var zone = this;
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
    zone.onTransfer(data);
  });
}

function handleDragOver(evt, zone) {
  evt.stopPropagation();
  evt.preventDefault();
}