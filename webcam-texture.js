define([], function() {
  'use strict';

  var WIDTH = 1280,
      HEIGHT = 720,
      video, videoImage, videoImageContext, videoTexture;

  function sizeAndOffscreen(element) {
    element.width = WIDTH;
    element.height = HEIGHT;
    element.style.visibility = 'hidden';
    element.style.position = 'absolute';
    element.style.top = 0;
    element.style.left = '-' + WIDTH.toString() + 'px';
  }

  var module = {
    start: function(callback) {
      if (video) {
        return;
      }

      navigator.webkitGetUserMedia({audio: false, video: true},
        function(stream) {
          video = document.createElement('video');
          sizeAndOffscreen(video);
          video.autoplay = 'autoplay';
          video.src = window.URL.createObjectURL(stream);
          document.body.appendChild(video);

          videoImage = document.createElement('canvas');
          sizeAndOffscreen(videoImage);
          document.body.appendChild(videoImage);

          videoImageContext = videoImage.getContext('2d');
          videoImageContext.fillStyle = '#008800';
          videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);

          videoTexture = new THREE.Texture(videoImage);
          videoTexture.minFilter = THREE.LinearFilter;
          videoTexture.magFilter = THREE.LinearFilter;

          callback(new THREE.MeshBasicMaterial({map: videoTexture, color: 0xFFFFFF}));
        },
        function(error) {
          console.error(error);
        }
      );
    },

    update: function(delta) {
      if (!video) {
        return;
      }
      if (video.readyState !== video.HAVE_ENOUGH_DATA) {
        return;
      }

      videoImageContext.drawImage(video, 0, 0, videoImage.width, videoImage.height);
      if (videoTexture) {
          videoTexture.needsUpdate = true;
      }
    }
  };

  return module;
});
