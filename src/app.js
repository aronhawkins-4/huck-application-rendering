import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, Sky, useTexture, Sphere, useHelper, OrbitControls, Stars, Clouds, Cloud, Html } from '@react-three/drei';
import { Truck } from './models/Truck';
import { Tugboat } from './models/Tugboat';
import { useControls, folder } from 'leva';
import { LargeBobtailBolt } from './models/Large_bobtail_model';
import { Solar } from './models/Solar';
import { DirectionalLightHelper, Vector3 } from 'three';
import { gsap } from 'gsap';
import { Ocean } from './WaterSurface/Ocean';
import TruckGroundColor from '../public/textures/coast_sand_01_diff_1k.jpg';
import TruckGroundDisp from '../public/textures/coast_sand_01_disp_1k.png';
import SolarGroundAo from '../public/textures/solar/sandstone_cracks_ao_2k.jpg';
import SolarGroundDisp from '../public/textures/solar/sandstone_cracks_disp_2k.png';
import SolarGroundRough from '../public/textures/solar/sandstone_cracks_arm_2k.jpg';
import SolarGroundColor from '../public/textures/solar/sandstone_cracks_diff_2k.jpg';
import SolarGroundNormal from '../public/textures/solar/sandstone_cracks_nor_dx_2k.jpg';
import { BomtailBolt } from './models/Bombtail_model';
import { AmbientLight } from 'three/src/Three.js';
import { FloorTightBolt } from './models/Floortight_model';
import { MagnagripBolt } from './models/Magnagrip_model';
import { InstancedMesh } from 'three/src/Three.js';
import { MeshStandardMaterial } from 'three/src/Three.js';
import { RoundedRectangle } from './RoundedRectangle';
import { SmallBobtailBolt } from './models/Small_bobtail_model';

const tempSolars = new THREE.Object3D();

// eslint-disable-next-line react/prop-types
const App = ({ activeIndex, activeScene, hover, setHover }) => {
  const [cameraTarget, setCameraTarget] = useState(new Vector3(0, 150.25, 0));
  const [dirLightHelper, setDirLightHelper] = useState(null);
  const [largeBobtailLight1Helper, setLargeBobtailLight1Helper] = useState(null);
  const [largeBobtailLight2Helper, setLargeBobtailLight2Helper] = useState(null);
  const [floorTightLight1Helper, setFloorTightLight1Helper] = useState(null);
  const [magnabulbLight1Helper, setMagnabulbLight1Helper] = useState(null);
  const [magnabulbLight2Helper, setMagnabulbLight2Helper] = useState(null);
  const [magnagripLight1Helper, setMagnagripLight1Helper] = useState(null);
  const [magnagripLight2Helper, setMagnagripLight2Helper] = useState(null);
  const [magnagripLight5Helper, setMagnagripLight5Helper] = useState(null);
  const [boltLight3Helper, setBoltLight3Helper] = useState(null);
  const [bomTailLight1Helper, setBomTailLight1Helper] = useState(null);
  const [bomTailLight2Helper, setBomTailLight2Helper] = useState(null);
  const [largeBobtailLight3Helper, setLargeBobtailLight3Helper] = useState(null);
  const [largeBobtailLight4Helper, setLargeBobtailLight4Helper] = useState(null);
  const [magnagripLight3Helper, setMagnagripLight3Helper] = useState(null);
  const [magnagripLight4Helper, setMagnagripLight4Helper] = useState(null);
  const [smallBobtailLight1Helper, setSmallBobtailLight1Helper] = useState(null);
  const [smallBobtailLight2Helper, setSmallBobtailLight2Helper] = useState(null);
  const [bomTailLight3Helper, setBomTailLight3Helper] = useState(null);
  const [bomTailLight4Helper, setBomTailLight4Helper] = useState(null);

  const dirLight = useRef(null);
  const cloudLight = useRef(null);
  const truckRef = useRef(null);
  const boatGroundRef = useRef(null);
  const skyRef = useRef(null);
  const cloudRef = useRef(null);

  const boltRef1 = useRef(null);
  const boltRef2 = useRef(null);
  const boltRef3 = useRef(null);
  const boltRef4 = useRef(null);
  const boltRef5 = useRef(null);
  const boltRef6 = useRef(null);
  const boltRef7 = useRef(null);
  const boltRef8 = useRef(null);
  const boltRef9 = useRef(null);
  const largeBobtailLightRef1 = useRef(null);
  const largeBobtailLightRef2 = useRef(null);
  const floorTightLightRef1 = useRef(null);

  const magnagripLightRef1 = useRef(null);
  const magnagripLightRef2 = useRef(null);
  const magnagripLightRef5 = useRef(null);
  const magnabulbLightRef1 = useRef(null);
  const magnabulbLightRef2 = useRef(null);
  const bomTailLightRef1 = useRef(null);
  const bomTailLightRef2 = useRef(null);
  const largeBobtailLightRef3 = useRef(null);
  const largeBobtailLightRef4 = useRef(null);
  const magnagripLightRef3 = useRef(null);
  const magnagripLightRef4 = useRef(null);
  const smallBobtailLightRef1 = useRef(null);
  const smallBobtailLightRef2 = useRef(null);
  const bomTailLightRef3 = useRef(null);
  const bomTailLightRef4 = useRef(null);

  // useHelper(bomTailLightRef3, THREE.SpotLightHelper, 'pink');
  // useHelper(bomTailLightRef4, THREE.SpotLightHelper, 'teal');

  const { camera, gl: renderer, scene } = useThree();
  // renderer.toneMappingExposure = 0.05;
  const pointLight = useRef(null);
  const globeRef = useRef(null);

  const [truckGroundColor, truckGroundDisp, solarGroundColor, solarGroundDisp, solarGroundRough, solarGroundAo, solarGroundNormal] = useTexture([
    TruckGroundColor,
    TruckGroundDisp,
    SolarGroundColor,
    SolarGroundDisp,
    SolarGroundRough,
    SolarGroundAo,
    SolarGroundNormal,
  ]);

  [truckGroundColor, truckGroundDisp, solarGroundColor, solarGroundDisp, solarGroundRough, solarGroundAo, solarGroundNormal].forEach((texture) => {
    const repeatX = 1000;
    const repeatY = 1000;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
  });

  const controls = useControls({
    water: folder({
      // flowSpeed: 0.03,
      // flowDirection: [1.0, 0.5],
      // reflectivity: 1.2,
      // scale_complex: 5,
      color: '#bedbe8',
    }),
    sky: folder({
      turbidity: {
        value: 0.7,
        min: 0,
        max: 20,
      },
      rayleigh: {
        value: 1.12,
        min: 0,
        max: 4,
      },
      mieCoefficient: { value: 0.01, min: 0, max: 0.1, step: 0.001 },
      mieDirectionalG: { value: 0.94, min: 0, max: 1, step: 0.01 },
      azimuth: { value: 180, min: -180, max: 180 },
      exposure: {
        value: 0.05,
        min: 0,
        max: 1,
        step: 0.01,
      },
      sunPosition: folder({
        sunX: {
          value: -2000,
          min: -2000,
          max: 2000,
        },
        sunY: {
          value: 500,
          min: 500,
          max: 10000,
        },
        sunZ: {
          value: 2000,
          min: -2000,
          max: 2000,
        },
      }),
    }),
  });
  useFrame((state, delta) => {
    let counter = 0;
    state.camera.lookAt(cameraTarget);
    switch (activeScene) {
      case 0:
        boltRef1.current.rotation.y += 0.01;
        boltRef2.current.rotation.y += 0.01;
        boltRef3.current.rotation.y += 0.01;
        boltRef9.current.rotation.y += 0.01;
        break;
      case 1:
        boltRef4.current.rotation.y += 0.01;
        boltRef5.current.rotation.y += 0.01;
        boltRef6.current.rotation.y += 0.01;
        break;
      case 2:
        boltRef7.current.rotation.y += 0.01;
        boltRef8.current.rotation.y += 0.01;
        break;
    }
  });

  useEffect(() => {
    scene.traverse(function (child) {
      if (child.isMesh) {
        child.receiveShadow = true;
      }
    });
  }, [scene, activeScene]);

  useEffect(() => {
    if (cloudRef.current) {
      console.log(cloudRef.current);
    }
    if (dirLight.current) {
      setDirLightHelper(new DirectionalLightHelper(dirLight.current));
    }
    if (largeBobtailLightRef1.current) {
      setLargeBobtailLight1Helper(new THREE.SpotLightHelper(largeBobtailLightRef1.current));
    }
    if (largeBobtailLightRef2.current) {
      setLargeBobtailLight2Helper(new THREE.SpotLightHelper(largeBobtailLightRef2.current));
    }
    if (floorTightLightRef1.current) {
      setFloorTightLight1Helper(new THREE.SpotLightHelper(floorTightLightRef1.current));
    }
    if (magnabulbLightRef1.current) {
      setMagnabulbLight1Helper(new THREE.SpotLightHelper(magnabulbLightRef1.current));
    }
    if (magnabulbLightRef2.current) {
      setMagnabulbLight2Helper(new THREE.SpotLightHelper(magnabulbLightRef2.current));
    }
    if (magnagripLightRef1.current) {
      setMagnagripLight1Helper(new THREE.SpotLightHelper(magnagripLightRef1.current));
    }
    if (magnagripLightRef2.current) {
      setMagnagripLight2Helper(new THREE.SpotLightHelper(magnagripLightRef2.current));
    }
    if (magnagripLightRef5.current) {
      setMagnagripLight5Helper(new THREE.SpotLightHelper(magnagripLightRef5.current));
    }
    if (bomTailLightRef1.current) {
      setBomTailLight1Helper(new THREE.SpotLightHelper(bomTailLightRef1.current));
    }
    if (bomTailLightRef2.current) {
      setBomTailLight2Helper(new THREE.SpotLightHelper(bomTailLightRef2.current));
    }
    if (largeBobtailLightRef3.current) {
      setLargeBobtailLight3Helper(new THREE.SpotLightHelper(largeBobtailLightRef3.current));
    }
    if (largeBobtailLightRef4.current) {
      setLargeBobtailLight4Helper(new THREE.SpotLightHelper(largeBobtailLightRef4.current));
    }
    if (magnagripLightRef3.current) {
      setMagnagripLight3Helper(new THREE.SpotLightHelper(magnagripLightRef3.current));
    }
    if (magnagripLightRef4.current) {
      setMagnagripLight4Helper(new THREE.SpotLightHelper(magnagripLightRef4.current));
    }
    if (smallBobtailLightRef1.current) {
      setSmallBobtailLight1Helper(new THREE.SpotLightHelper(smallBobtailLightRef1.current));
    }
    if (smallBobtailLightRef2.current) {
      console.log(smallBobtailLightRef2.current);
      setSmallBobtailLight2Helper(new THREE.SpotLightHelper(smallBobtailLightRef2.current));
    }
    if (bomTailLightRef3.current) {
      setBomTailLight3Helper(new THREE.SpotLightHelper(bomTailLightRef3.current));
    }
    if (bomTailLightRef4.current) {
      setBomTailLight4Helper(new THREE.SpotLightHelper(bomTailLightRef4.current));
    }
    [boltRef1, boltRef2, boltRef3, boltRef4, boltRef5, boltRef6, boltRef7, boltRef8, boltRef9].forEach((boltRef) => {
      if (boltRef.current) {
        gsap.killTweensOf(boltRef.current.scale);
        gsap.to(boltRef.current.scale, {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.25,
          delay: 0,
        });
      }
    });

    [
      largeBobtailLightRef1,
      largeBobtailLightRef2,
      floorTightLightRef1,
      magnagripLightRef1,
      magnagripLightRef2,
      magnagripLightRef5,
      bomTailLightRef1,
      bomTailLightRef2,
      largeBobtailLightRef3,
      largeBobtailLightRef4,
      magnagripLightRef3,
      magnagripLightRef4,
      smallBobtailLightRef1,
      smallBobtailLightRef2,
      bomTailLightRef3,
      bomTailLightRef4,
    ].forEach((boltLightRef) => {
      if (boltLightRef.current) {
        gsap.to(boltLightRef.current, {
          intensity: 0,
          duration: 0.25,
          delay: 0,
        });
      }
    });
    switch (activeScene) {
      case 0:
        gsap.to(skyRef.current.material.uniforms.sunPosition.value, {
          x: -2000,
          y: 500,
          z: 880,
          duration: 2,
        });
        gsap.to(dirLight.current.position, {
          x: -150,
          y: 150,
          z: 150,
          duration: 2,
        });
        gsap.to(pointLight.current.position, {
          x: 0,
          y: 155,
          z: 0,
          duration: 1,
        });
        gsap.to(renderer, {
          toneMappingExposure: 0.05,
          duration: 1,
        });
        gsap.to(cameraTarget, {
          x: 0,
          y: 150.25,
          z: 0,
          duration: 1,
        });
        gsap.to(globeRef.current.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1,
        });
        gsap.to(cloudRef.current, {
          opacity: 0,
          duration: 0.5,
        });
        switch (activeIndex) {
          case 0:
            gsap.to(cameraTarget, {
              x: 0,
              y: 150.25,
              z: 0,
              duration: 1,
            });
            gsap.to(camera.position, {
              x: 0.75,
              y: 150.25,
              z: 1.15,
              duration: 1,
            });
            break;
          case 1:
            gsap.to(cameraTarget, {
              x: 0.35,
              y: 150.25,
              z: 0,
              duration: 1,
            });
            gsap.to(camera.position, {
              x: 0.5,
              y: 150.25,
              z: 1,
              duration: 1,
            });
            gsap.to(boltRef1.current.scale, {
              x: 2,
              y: 2,
              z: 2,
              duration: 0.5,
              delay: 1.5,
            });
            gsap.to(largeBobtailLightRef1.current, {
              intensity: 500,
              duration: 0.25,
            });
            gsap.to(largeBobtailLightRef2.current, {
              intensity: 1000,
              duration: 0.25,
            });
            break;
          case 2:
            gsap.to(cameraTarget, {
              x: -0.1,
              y: 150.275,
              z: 0,
              duration: 1,
            });
            gsap.to(camera.position, {
              x: -0.1,
              y: 150.275,
              z: 0.8,
              duration: 1,
            });
            gsap.to(boltRef2.current.scale, {
              x: 2,
              y: 2,
              z: 2,
              duration: 0.5,
              delay: 1.5,
            });
            gsap.to(floorTightLightRef1.current, {
              intensity: 100,
              duration: 0.25,
            });

            break;
          case 3:
            gsap.to(cameraTarget, {
              x: 0.3,
              y: 150.25,
              z: 0,
              duration: 1,
            });
            gsap.to(camera.position, {
              x: 0.5,
              y: 150.25,
              z: 0.5,
              duration: 1,
            });
            gsap.to(boltRef3.current.scale, {
              x: 1.5,
              y: 1.5,
              z: 1.5,
              duration: 0.5,
              delay: 1.5,
            });
            gsap.to(magnabulbLightRef1.current, {
              intensity: 500,
              duration: 0.25,
            });
            gsap.to(magnabulbLightRef2.current, {
              intensity: 1000,
              duration: 0.25,
            });
            break;
          case 4:
            gsap.to(cameraTarget, {
              x: 0.4,
              y: 150.1,
              z: 0,
              duration: 1,
            });
            gsap.to(camera.position, {
              x: 1.25,
              y: 150.125,
              z: 0,
              duration: 1,
            });
            gsap.to(boltRef9.current.scale, {
              x: 1.5,
              y: 1.5,
              z: 1.5,
              duration: 0.5,
              delay: 1.5,
            });
            gsap.to(magnagripLightRef1.current, {
              intensity: 1000,
              duration: 0.25,
            });
            gsap.to(magnagripLightRef2.current, {
              intensity: 1000,
              duration: 0.25,
            });
            gsap.to(magnagripLightRef5.current, {
              intensity: 45,
              duration: 0.25,
            });
            break;
        }
        break;
      case 1:
        if (skyRef.current) {
          gsap.to(skyRef.current.material.uniforms.sunPosition.value, {
            x: -2000,
            y: 10000,
            z: 2000,
            duration: 2,
          });
        }
        gsap.to(dirLight.current.position, {
          x: 0,
          y: 170,
          z: 80,
          duration: 2,
        });
        gsap.to(pointLight.current.position, {
          x: 0,
          y: 160,
          z: 0,
          duration: 1,
        });
        gsap.to(renderer, {
          toneMappingExposure: 0.1,
          duration: 1,
        });
        gsap.to(cameraTarget, {
          x: 0,
          y: 152,
          z: 0,
          duration: 1,
        });
        gsap.to(globeRef.current.rotation, {
          x: Math.PI / 2,
          y: 0,
          z: 0,
          duration: 1,
        });
        gsap.to(cloudRef.current, {
          opacity: 1,
          duration: 0.5,
        });
        switch (activeIndex) {
          case 0:
            gsap.to(cameraTarget, {
              x: 0.5,
              y: 151,
              z: -0.125,
              duration: 1,
            });
            gsap.to(camera.position, {
              x: 1.75,
              y: 150.875,
              z: 0.25,
              duration: 1,
            });
            break;
          case 1:
            gsap.to(cameraTarget, {
              x: 0.5,
              y: 151.5,
              z: -0.125,
              duration: 1,
            });
            gsap.to(camera.position, {
              x: 1.25,
              y: 151.5,
              z: 0.125,
              duration: 1,
            });

            gsap.to(boltRef4.current.scale, {
              x: 2,
              y: 2,
              z: 2,
              duration: 0.5,
              delay: 1.5,
            });
            gsap.to(bomTailLightRef1.current, {
              intensity: 1,
              duration: 0.25,
            });
            gsap.to(bomTailLightRef2.current, {
              intensity: 1,
              duration: 0.25,
            });
            break;
          case 2:
            gsap.to(cameraTarget, {
              x: -0.1,
              y: 151.15,
              z: 0.925,
              duration: 1,
            });
            gsap.to(camera.position, {
              x: 0,
              y: 151.25,
              z: 1,
              duration: 1,
            });
            gsap.to(boltRef5.current.scale, {
              x: 2,
              y: 2,
              z: 2,
              duration: 0.5,
              delay: 1.5,
            });
            gsap.to(largeBobtailLightRef3.current, {
              intensity: 20,
              duration: 0.25,
            });
            gsap.to(largeBobtailLightRef4.current, {
              intensity: 10,
              duration: 0.25,
            });
            break;
          case 3:
            gsap.to(cameraTarget, {
              x: 0.5,
              y: 150.875,
              z: -0.25,
              duration: 1,
            });
            gsap.to(camera.position, {
              x: 0.7,
              y: 150.9,
              z: -0.1,
              duration: 1,
            });
            gsap.to(boltRef6.current.scale, {
              x: 1,
              y: 1,
              z: 1,
              duration: 0.5,
              delay: 1.5,
            });
            gsap.to(magnagripLightRef3.current, {
              intensity: 50,
              duration: 0.25,
            });
            gsap.to(magnagripLightRef4.current, {
              intensity: 20,
              duration: 0.25,
            });
            break;
        }
        break;
      case 2:
        gsap.to(skyRef.current.material.uniforms.sunPosition.value, {
          x: 2000,
          y: 3700,
          z: -2000,
          duration: 2,
        });
        gsap.to(dirLight.current.position, {
          x: 150,
          y: 250,
          z: 150,
          duration: 2,
        });
        // gsap.to(dirLight.current, {
        //   intensity: 5,
        //   duration: 2,
        // });
        gsap.to(pointLight.current.position, {
          x: 0,
          y: 160,
          z: 0,
          duration: 1,
        });
        gsap.to(renderer, {
          toneMappingExposure: 0.075,
          duration: 1,
        });
        gsap.to(cameraTarget, {
          x: 0,
          y: 150,
          z: 0,
          duration: 1,
        });

        gsap.to(globeRef.current.rotation, {
          x: Math.PI,
          y: 0,
          z: 0,
          duration: 1,
        });
        gsap.to(cloudRef.current, {
          opacity: 0,
          duration: 0.5,
        });
        switch (activeIndex) {
          case 0:
            gsap.to(cameraTarget, {
              x: 0,
              y: 150.125,
              z: 0,
              duration: 1,
            });
            gsap.to(camera.position, {
              x: 0.35,
              y: 150.25,
              z: 0.75,
              duration: 1,
            });
            break;
          case 1:
            gsap.to(cameraTarget, {
              x: 0,
              y: 150.2,
              z: 0,
              duration: 1,
            });
            gsap.to(camera.position, {
              x: -0.25,
              y: 150.15,
              z: 0.15,
              duration: 1,
            });
            gsap.to(boltRef7.current.scale, {
              x: 2,
              y: 2,
              z: 2,
              duration: 0.5,
              delay: 1.5,
            });

            gsap.to(smallBobtailLightRef1.current, {
              intensity: 20,
              duration: 0.25,
            });
            gsap.to(smallBobtailLightRef2.current, {
              intensity: 30,
              duration: 0.25,
            });
            break;
          case 2:
            gsap.to(cameraTarget, {
              x: 0,
              y: 150.225,
              z: 0.05,
              duration: 1,
            });
            gsap.to(camera.position, {
              x: -0.25,
              y: 150.25,
              z: -0.1,
              duration: 1,
            });
            gsap.to(boltRef8.current.scale, {
              x: 1,
              y: 1,
              z: 1,
              duration: 0.5,
              delay: 1.5,
            });
            gsap.to(bomTailLightRef3.current, {
              intensity: 2,
              duration: 0.25,
            });
            gsap.to(bomTailLightRef4.current, {
              intensity: 2,
              duration: 0.25,
            });
            break;
          case 3:
            gsap.to(cameraTarget, {
              x: 1,
              y: 1003,
              z: 0,
              duration: 1,
            });
            gsap.to(camera.position, {
              x: 4,
              y: 1002,
              z: 12,
              duration: 1,
            });
            break;
        }
        break;
    }
  }, [activeIndex, activeScene]);
  return (
    <Fragment>
      {/* <OrbitControls target={[0, 0, 0]} /> */}
      <Sky
        scale={10000}
        position={[0, 1000, 0]}
        sunPosition={[controls.sunX, controls.sunY, controls.sunZ]}
        turbidity={controls.turbidity}
        rayleigh={controls.rayleigh}
        mieCoefficient={controls.mieCoefficient}
        mieDirectionalG={controls.mieDirectionalG}
        azimuth={controls.azimuth}
        ref={skyRef}
      />
      <Clouds>
        <Cloud segments={40} bounds={[50, 10, 50]} position={[-20, 150, -20]} volume={50} speed={0.1} fade={1000} ref={cloudRef} />
      </Clouds>
      <ambientLight color={0xffffff} intensity={10} />
      <hemisphereLight color='white' intensity={4} position={[100, 200, 100]} />
      <directionalLight
        color='white'
        intensity={50}
        scale={[100, 100, 100]}
        shadow-camera-far={400}
        shadow-camera-top={400}
        shadow-camera-bottom={400}
        position={[0, 250, 150]}
        target-position={[3, 150, 0]}
        shadow-bias={-0.0005}
        shadow-radius={1000}
        castShadow
        ref={dirLight}
      >
        <orthographicCamera attach='shadow-camera' args={[-150, 10, 10, -10]} />
      </directionalLight>
      <spotLight
        color='white'
        position={[0, 120, 0]}
        target-position={[0, 160, 0]}
        intensity={800}
        ref={pointLight}
        castShadow
        shadow-bias={-0.0005}
        shadow-mapSize={[1024, 1024]}
        angle={Math.PI / 2}
        name='Model Light'
      />

      <group ref={globeRef} receiveShadow castShadow>
        {activeScene === 0 && (
          <>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <Truck castShadow receiveShadow refs={truckRef} position={[0.75, 149.985, 0]} rotation={[0, -Math.PI / 2, 0]} scale={0.1} />

            <LargeBobtailBolt position={[0.54, 150.275, 0.5]} refs={boltRef1} rotation={[0, 0, -Math.PI / 4]} />
            {/* <Html
              position={[0.5, 150.275, 0.5]}
              // geometry={<RoundedRectangle width={0.5} height={0.5} radius={0.5} />}
              // geometry={<planeGeometry args={[0.5, 0.5]} />}
              // material={<meshBasicMaterial color={'#000000'} opacity={0.75} transparent />}
              wrapperClass='truck-callout-1'
              transform
              occlude='blending'
              // rotation={[0, Math.PI / 2, 0]}
            >
              <div className='callout-content text-white' style={{ width: '300px', height: '500px', backgroundColor: '#0000ff' }}>
                <h2>Large Bobtail</h2>
              </div>
            </Html> */}

            <FloorTightBolt position={[-0.28, 150.27, 0.4]} refs={boltRef2} rotation={[0, 0, Math.PI / 4]} />
            <MagnagripBolt position={[0.45, 150.235, 0.3]} refs={boltRef3} rotation={[0, 0, -Math.PI / 4]} />
            <MagnagripBolt position={[1, 150.15, 0.055]} refs={boltRef9} rotation={[0, 0, -Math.PI / 4]} />

            <spotLight
              color='white'
              position={[0.55, 150, 0.7]}
              target-position={[0.575, 150.275, 0.5]}
              ref={largeBobtailLightRef1}
              castShadow
              decay={0}
              shadow-bias={-0.0005}
              shadow-mapSize={[1024, 1024]}
              angle={Math.PI / 5}
              distance={0.5}
              name='Large Bobtail Light 1'
            />
            <spotLight
              color='white'
              position={[0.65, 150.5, 0.7]}
              target-position={[0.575, 150.275, 0.5]}
              castShadow
              shadow-bias={-0.0005}
              shadow-mapSize={[1024, 1024]}
              decay={0}
              angle={Math.PI / 4}
              name='Large Bobtail Light 2'
              ref={largeBobtailLightRef2}
              distance={0.5}
            />
            <spotLight
              color='white'
              position={[-0.2, 150.15, 0.7]}
              target-position={[-0.28, 150.27, 0.4]}
              ref={floorTightLightRef1}
              castShadow
              decay={0}
              shadow-bias={-0.0005}
              shadow-mapSize={[1024, 1024]}
              angle={Math.PI / 6}
              name='Floortight Light 1'
              distance={0.5}
            />
            <spotLight
              color='white'
              position={[0.4, 150.1, 0.3]}
              target-position={[0.45, 150.235, 0.3]}
              ref={magnabulbLightRef1}
              castShadow
              decay={0}
              shadow-bias={-0.0005}
              shadow-mapSize={[1024, 1024]}
              angle={Math.PI / 6}
              distance={0.2}
              name='Magnabulb Light 1'
            />
            <spotLight
              color='white'
              position={[0.425, 150.35, 0.325]}
              target-position={[0.45, 150.235, 0.3]}
              ref={magnabulbLightRef2}
              castShadow
              decay={0}
              shadow-bias={-0.0005}
              shadow-mapSize={[1024, 1024]}
              angle={Math.PI / 8}
              distance={0.3}
              name='Magnabulb Light 2'
            />
            <spotLight
              color='white'
              position={[1.05, 150.075, 0.05]}
              target-position={[1, 150.15, 0.055]}
              ref={magnagripLightRef1}
              castShadow
              decay={0}
              shadow-bias={-0.0005}
              shadow-mapSize={[1024, 1024]}
              angle={Math.PI / 6}
              distance={0.2}
              name='Magnagrip Light 1'
            />
            <spotLight
              color='white'
              position={[1.1, 150.15, 0.05]}
              target-position={[1, 150.15, 0.055]}
              ref={magnagripLightRef2}
              castShadow
              decay={0}
              shadow-bias={-0.0005}
              shadow-mapSize={[1024, 1024]}
              angle={Math.PI / 5}
              distance={0.15}
              name='Magnagrip Light 2'
            />
            <directionalLight
              color='white'
              position={[3, 151.15, 0.05]}
              target-position={[1, 150.15, 0.055]}
              ref={magnagripLightRef5}
              castShadow
              decay={0}
              shadow-bias={-0.0005}
              shadow-mapSize={[1024, 1024]}
              // angle={Math.PI / 3}
              distance={50}
              intensity={45}
              name='Magnagrip Light 2'
            />
          </>
        )}
        {activeScene === 1 && (
          <>
            <Float speed={2} floatingRange={[-0.1, -0.1]} floatIntensity={0.1} rotationIntensity={0.15} position={[0, 0, -150.2]} rotation={[-Math.PI / 2, Math.PI / 4, 0]} scale={0.15}>
              <Tugboat />
            </Float>

            <BomtailBolt position={[0.8, 0.1, -151.475]} refs={boltRef4} rotation={[Math.PI / 2, 0, -Math.PI / 4]} />
            <LargeBobtailBolt position={[-0.45, 0.85, -151]} refs={boltRef5} rotation={[Math.PI / 2, 0, Math.PI / 4]} />
            <MagnagripBolt position={[0.615, -0.2, -150.88]} refs={boltRef6} rotation={[-Math.PI / 2, 0, -Math.PI / 4]} />
            <spotLight
              color='white'
              position={[0.9, 0.1, -151.35]}
              target-position={[0.8, 151.475, 0.1]}
              ref={bomTailLightRef1}
              castShadow
              shadow-bias={-0.0005}
              shadow-mapSize={[1024, 1024]}
              angle={Math.PI / 6}
              name='BOMtail Light 1'
              distance={0.5}
            />
            <spotLight
              color='white'
              position={[0.9, 0.1, -151.75]}
              target-position={[0.8, 151.475, 0.1]}
              ref={bomTailLightRef2}
              castShadow
              shadow-bias={-0.0005}
              shadow-mapSize={[1024, 1024]}
              angle={Math.PI / 8}
              name='BOMtail Light 2'
              distance={0.5}
            />
            <spotLight
              color='white'
              position={[-0.35, 0.875, -150.875]}
              target-position={[-0.45, 151, 0.85]}
              ref={largeBobtailLightRef3}
              castShadow
              shadow-bias={-0.0005}
              shadow-mapSize={[1024, 1024]}
              angle={Math.PI / 6}
              name='Large Bobtail Light 3'
              distance={0.5}
            />
            <spotLight
              color='white'
              position={[-0.35, 0.875, -151.25]}
              target-position={[-0.45, 151, 0.85]}
              ref={largeBobtailLightRef4}
              castShadow
              shadow-bias={-0.0005}
              shadow-mapSize={[1024, 1024]}
              angle={Math.PI / 8}
              name='Large Bobtail Light 4'
              distance={0.5}
            />
            <spotLight
              color='white'
              position={[0.65, -0.15, -150.75]}
              target-position={[0.615, 150.88, -0.2]}
              ref={magnagripLightRef3}
              castShadow
              shadow-bias={-0.0005}
              shadow-mapSize={[1024, 1024]}
              angle={Math.PI / 10}
              name='Magnagrip Light 3'
              distance={0.2}
            />
            <spotLight
              color='white'
              position={[0.75, -0.15, -151]}
              target-position={[0.615, 150.88, -0.2]}
              ref={magnagripLightRef4}
              castShadow
              shadow-bias={-0.0005}
              shadow-mapSize={[1024, 1024]}
              angle={Math.PI / 8}
              name='Magnagrip Light 4'
              distance={0.25}
            />
          </>
        )}

        {activeScene === 2 && (
          <>
            <Solar position={[0, -149.93, 0]} rotation={[Math.PI, Math.PI / 3.25, 0]} scale={0.15} />
            <Solar position={[-0.1, -149.93, 0.8]} rotation={[Math.PI, Math.PI / 3.25, 0]} scale={0.15} />
            <Solar position={[-0.8, -149.93, -0.1]} rotation={[Math.PI, Math.PI / 3.25, 0]} scale={0.15} />

            <Solar position={[-0.475, -149.93, 0.3]} rotation={[Math.PI, Math.PI / 3.25, 0]} scale={0.15} />
            <Solar position={[-0.3, -149.93, -0.4]} rotation={[Math.PI, Math.PI / 3.25, 0]} scale={0.15} />
            <Solar position={[0.3, -149.93, 0.45]} rotation={[Math.PI, Math.PI / 3.25, 0]} scale={0.15} />
            <Solar position={[0.25, -149.93, 1.25]} rotation={[Math.PI, Math.PI / 3.25, 0]} scale={0.15} />
            <Solar position={[0.65, -149.93, 0.95]} rotation={[Math.PI, Math.PI / 3.25, 0]} scale={0.15} />

            <SmallBobtailBolt position={[-0.1, -150.165, 0]} refs={boltRef7} rotation={[0, 0, Math.PI / 4]} />
            <BomtailBolt position={[-0.1, -150.21, 0]} refs={boltRef8} rotation={[0, 0, Math.PI / 4]} />
            <spotLight
              color='white'
              position={[-0.1, -150.05, -0.05]}
              target-position={[-0.1, 150.165, 0]}
              intensity={0}
              ref={smallBobtailLightRef1}
              castShadow
              shadow-bias={-0.0005}
              shadow-mapSize={[1024, 1024]}
              angle={Math.PI / 8}
              name='Small Bobtail Light 1'
              distance={0.2}
            />
            <spotLight
              color='white'
              position={[-0.2, -150.25, -0.1]}
              target-position={[-0.1, 150.165, 0]}
              ref={smallBobtailLightRef2}
              castShadow
              shadow-bias={-0.0005}
              shadow-mapSize={[1024, 1024]}
              angle={Math.PI / 8}
              name='Small Bobtail Light 2'
              distance={0.2}
            />
            <spotLight
              color='white'
              position={[-0.1, -150.1, 0]}
              target-position={[-0.1, 150.21, 0]}
              ref={bomTailLightRef3}
              castShadow
              shadow-bias={-0.0005}
              shadow-mapSize={[1024, 1024]}
              angle={Math.PI / 10}
              name='BOMtail Light 3'
              distance={0.15}
            />
            <spotLight
              color='white'
              position={[-0.1, -150.3, 0]}
              target-position={[-0.1, 150.21, 0]}
              ref={bomTailLightRef4}
              castShadow
              shadow-bias={-0.0005}
              shadow-mapSize={[1024, 1024]}
              angle={Math.PI / 6}
              name='BOMtail Light 4'
              distance={0.2}
            />
          </>
        )}
        <Sphere args={activeScene === 0 || activeScene === 1 ? [150, 100, 100] : [1, 1, 1]} position={[0, 0, 0]} rotation={[Math.PI / 4, 0, Math.PI / 2]} receiveShadow castShadow>
          <meshStandardMaterial map={truckGroundColor} displacementMap={truckGroundDisp} />
        </Sphere>
        <Ocean refs={boatGroundRef} receiveShadow position={[0, 0, -12]} rotation={[-Math.PI / 2, 0, 0]} scale={0.14} />

        <Sphere args={activeScene === 2 ? [150, 100, 100] : [1, 1, 1]} position={[0, 0, 0]} rotation={[Math.PI / 4, 0, Math.PI / 2]} receiveShadow castShadow>
          <meshStandardMaterial map={solarGroundColor} roughnessMap={solarGroundRough} aoMap={solarGroundAo} normalMap={solarGroundNormal} />
        </Sphere>
      </group>
    </Fragment>
  );
};

export default App;
