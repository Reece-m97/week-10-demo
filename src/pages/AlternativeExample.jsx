import { useEffect, useRef } from "react";
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";

export default function AlternativeExample() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.6,
      1200
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor("#233143");
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement); // Append canvas to the container

    // Responsive resize
    const handleResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Create Box
    const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
    const boxMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.rotation.set(40, 0, 40);
    scene.add(boxMesh);

    // Create spheres:
    const sphereMeshes = [];
    const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xc56cef });
    for (let i = 0; i < 4; i++) {
      sphereMeshes[i] = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphereMeshes[i].position.set(0, 0, 0);
      scene.add(sphereMeshes[i]);
    }

    // Light
    const light = new THREE.PointLight(0xffffff, 10, 100);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Lights
    const lights = [];
    // const lightHelpers = [];
    const lightValues = [
      { colour: 0x9714b8, intensity: 260, dist: 12, x: 1, y: 0, z: 8 },
      { colour: 0x6e1bb3, intensity: 520, dist: 12, x: -2, y: 1, z: -8 },
      { colour: 0x00ffff, intensity: 60, dist: 10, x: 0, y: 8, z: 1 },
      { colour: 0x00ff00, intensity: 200, dist: 12, x: 0, y: -10, z: -1 },
      { colour: 0x16a7f5, intensity: 120, dist: 12, x: 10, y: 3, z: 0 },
      { colour: 0x90f615, intensity: 200, dist: 12, x: -8, y: -1, z: 0 },
    ];
    for (let i = 0; i < 6; i++) {
      lights[i] = new THREE.PointLight(
        lightValues[i]["colour"],
        lightValues[i]["intensity"],
        lightValues[i]["dist"]
      );
      lights[i].position.set(
        lightValues[i]["x"],
        lightValues[i]["y"],
        lightValues[i]["z"]
      );
      scene.add(lights[i]);

      // New Code: Add light helpers for each light
      // lightHelpers[i] = new THREE.PointLightHelper(lights[i], 0.7);
      // scene.add(lightHelpers[i]);
    }

    //Trackball Controls for Camera
    const controls = new TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 4;
    controls.dynamicDampingFactor = 0.15;

    // Axes Helper
    // const axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper); // X == red, Y == green, Z == blue

    // Trigonometry Constants for Orbital Paths
    let theta = 0;
    const dTheta = (2 * Math.PI) / 100;

    const rendering = function () {
      requestAnimationFrame(rendering);

      // Update trackball controls
      controls.update();

      // Constantly rotate box
      scene.rotation.z -= 0.005;
      scene.rotation.x -= 0.01;

      theta += dTheta; // <- THIS MUST BE INSIDE OUR RENDERING FUNCTION

      // Store trig functions for sphere orbits
      // MUST BE INSIDE RENDERING FUNCTION OR
      // THETA VALUES ONLY GET SET ONCE
      const trigs = [
        {
          x: Math.cos(theta * 1.05),
          y: Math.sin(theta * 1.05),
          z: Math.cos(theta * 1.05),
          r: 2,
        },
        {
          x: Math.cos(theta * 0.8),
          y: Math.sin(theta * 0.8),
          z: Math.sin(theta * 0.8),
          r: 2.25,
        },
        {
          x: Math.cos(theta * 1.25),
          y: Math.cos(theta * 1.25),
          z: Math.sin(theta * 1.25),
          r: 2.5,
        },
        {
          x: Math.sin(theta * 0.6),
          y: Math.cos(theta * 0.6),
          z: Math.sin(theta * 0),
          r: 2.75,
        },
      ];

      // Loop 4 times (for each sphere), updating the position
      // MUST BE INSIDE RENDERING FUNCTION
      for (let i = 0; i < 4; i++) {
        sphereMeshes[i].position.x = trigs[i]["r"] * trigs[i]["x"];
        sphereMeshes[i].position.y = trigs[i]["r"] * trigs[i]["y"];
        sphereMeshes[i].position.z = trigs[i]["r"] * trigs[i]["z"];
      }

      renderer.render(scene, camera);
    };
    rendering();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement); // Remove canvas
      controls.dispose(); // Dispose of controls
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "calc(100vh - 100px)", // Adjust height for layout
      }}
    ></div>
  );
}
