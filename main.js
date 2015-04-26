require(['three', 'third-party/FlyControls', 'webcam-texture'], function (THREE, FlyControls, webcamTexture) {
  'use strict';

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);
  camera.position.z = 1000;

  var clock = new THREE.Clock();
  var updates = [];

  var controls = new FlyControls(camera);
  controls.movementSpeed = 500;
  controls.rollSpeed = Math.PI / 20;
  controls.dragToLook = true;
  updates.push(function(delta) {
    controls.update(delta);
  });

  webcamTexture.start(function(material) {
    updates.push(webcamTexture.update);

    var geometry = new THREE.SphereGeometry(500, 256, 256);
    var globe = new THREE.Mesh(geometry, material);
    globe.rotation.y = 3.0;
    scene.add(globe);
    updates.push(function(delta) {
      globe.rotation.y += 0.01;
    });
  });

  window.addEventListener('resize', function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  function render() {
    var delta = clock.getDelta();
    updates.forEach(function(update) {
      update(delta);
    })

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
});
