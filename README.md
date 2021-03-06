Webcam Texture
==============

A [three.js](http://threejs.org/) toy that creates a dynamic texture from your
browser's webcam.

See a [live demo](https://chrisguidry.github.io/webcam-texture/) of this
repository.  You will need to allow access to your webcam.

In order to run the sample and play with it, you will need to load it from a
webserver.  The simplest way (that I know of) to do that is to use Python's
built-in webserver:

    $ git clone https://github.com/chrisguidry/webcam-texture.git
    $ cd webcam-texture
    $ python -m SimpleHTTPServer 10000  # then load http://localhost:10000

This example uses [require.js](http://requirejs.org/), and the interesting
behavior of the webcam texture is in the module
[`webcam-texture.js`](webcam-texture.js).  To use it:

    require(['webcam-texture'], function(webcamTexture) {
      webcamTexture.start(function(material) {
        // this is a callback because we have to wait for the user to
        // accept our request to use webcam

        // material will be a THREE.MeshBasicMaterial established with
        // a texture updated from your webcam.  This would be a good place
        // to add an object to the scene using this material.
      });

      function render() {
        ... whatever you normally do in your render loop ...

        // this will copy a frame from the camera to the texture
        // and mark it as requiring an update
        webcamTexture.update();

        ... other updates ...

        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
    });

The basic idea of `webcam-texture` is to create an offscreen `<video>` element
capturing the video from your webcam.  Then, on each render cycle, copy the
current frame from the `<video>` element to an offscreen `<canvas>` element of
the same dimensions.  That `<canvas>` element is the source of the three.js
`MeshBasicMaterial` texture.

Find this useful?  Find a bug?
==============================

Please [file an issue](https://github.com/chrisguidry/webcam-texture/issues)
or send a pull request.  I haven't tested this for browser compatibility beyond
Chrome, Firefox, and Safari, so let me know how it goes.


MIT Licensed
------------

Copyright (c) 2015, Chris Guidry

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
