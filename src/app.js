import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, Float, Sky, useTexture, Sphere, useHelper } from '@react-three/drei';

import { Truck } from './models/Truck';
import { Tugboat } from './models/Tugboat';
import { useControls, folder } from 'leva';
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
import { Bolt } from './models/Bolt';

// eslint-disable-next-line react/prop-types
const App = ({ activeIndex, activeScene, hover, setHover }) => {
  const [cameraTarget, setCameraTarget] = useState(new Vector3(0, 1002, 0));
  const [dirLightHelper, setDirLightHelper] = useState(null);
  const dirLight = useRef(null);
  const truckRef = useRef(null);
  const boatGroundRef = useRef(null);
  const skyRef = useRef(null);
  const boltRef = useRef(null);
  const boltLightRef = useRef(null);

  const { camera, gl: renderer, scene } = useThree();
  renderer.toneMappingExposure = 0.05;
  camera.lookAt(0, 1000, 0);
  const pointLight = useRef(null);
  const globeRef = useRef(null);

  useHelper(boltLightRef, THREE.SpotLightHelper);

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

  const handleOverIn = (e) => {
    // if (!hover) {
    //   setHover(true);
    // }
  };

  const handleOverOut = (e) => {
    // if (hover) {
    //   setHover(false);
    // }
  };

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
    // console.log(delta);
    // renderer.toneMappingExposure = controls.exposure;
    boltRef.current.rotation.y += 0.01;
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
          y: 1150,
          z: 150,
          duration: 2,
        });
        gsap.to(pointLight.current.position, {
          x: 0,
          y: 1020,
          z: 0,
          duration: 1,
        });
        gsap.to(renderer, {
          toneMappingExposure: 0.05,
          duration: 1,
        });
        state.camera.lookAt(cameraTarget);
        gsap.to(cameraTarget, {
          x: 0,
          y: 1002,
          z: 0,
          duration: 1,
        });
        gsap.to(globeRef.current.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.5,
        });

        switch (activeIndex) {
          case 0:
            gsap.to(boltRef.current.scale, {
              x: 0,
              y: 0,
              z: 0,
              duration: 0.25,
              // delay: 0.1,
            });
            boltLightRef.current.intensity = 0;

            state.camera.lookAt(cameraTarget);
            gsap.to(cameraTarget, {
              x: 0,
              y: 1002,
              z: 0,
              duration: 1,
            });

            gsap.to(state.camera.position, {
              x: 6,
              y: 1002,
              z: 10,
              duration: 1,
            });

            break;
          case 1:
            state.camera.lookAt(cameraTarget);
            gsap.to(boltRef.current.position, {
              x: 3.5,
              y: 1002,
              z: 6,
            });
            gsap.to(boltRef.current.scale, {
              x: 20,
              y: 20,
              z: 20,
              duration: 0.5,
              // delay: 1.5,
            });
            gsap.to(boltLightRef.current.position, {
              x: 4,
              y: 1000,
              z: 6.5,
            });
            gsap.to(boltLightRef.current.target.position, {
              x: 3.5,
              y: 1002,
              z: 6,
            });
            boltLightRef.current.intensity = 1000;

            gsap.to(cameraTarget, {
              x: 0,
              y: 1002,
              z: 0,
              duration: 1,
            });

            gsap.to(state.camera.position, {
              x: 6,
              y: 1002,
              z: 10,
              duration: 1,
            });

            break;
          case 2:
            gsap.to(boltRef.current.position, {
              x: -4,
              y: 1003.5,
              z: 1,
            });
            gsap.to(boltRef.current.scale, {
              x: 20,
              y: 20,
              z: 20,
              duration: 0.5,
              // delay: 1.5,
            });
            gsap.to(boltLightRef.current.position, {
              x: -4,
              y: 1001,
              z: 0.5,
            });
            gsap.to(boltLightRef.current.target.position, {
              x: -4,
              y: 1014,
              z: 6,
            });
            boltLightRef.current.intensity = 1000;
            boltLightRef.current.angle = Math.PI / 8;

            state.camera.lookAt(cameraTarget);

            gsap.to(cameraTarget, {
              x: 0,
              y: 1002,
              z: -20,
              duration: 1,
            });

            gsap.to(state.camera.position, {
              x: -3,
              y: 1003,
              z: 7,
              duration: 1,
            });

            break;
          case 3:
            gsap.to(boltRef.current.position, {
              x: 5.5,
              y: 1001.5,
              z: 3,
            });
            gsap.to(boltRef.current.scale, {
              x: 20,
              y: 20,
              z: 20,
              duration: 0.5,
              // delay: 1.5,
            });
            gsap.to(boltLightRef.current.position, {
              x: 5.5,
              y: 1000,
              z: 3,
            });
            gsap.to(boltLightRef.current.target.position, {
              x: 5.5,
              y: 1010,
              z: 3,
            });
            boltLightRef.current.intensity = 1000;
            boltLightRef.current.angle = Math.PI / 6;

            state.camera.lookAt(cameraTarget);

            gsap.to(cameraTarget, {
              x: 0,
              y: 1001,
              z: -5,
              duration: 1,
            });

            gsap.to(state.camera.position, {
              x: 6,
              y: 1002,
              z: 9,
              duration: 1,
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
          y: 1200,
          z: 80,
          duration: 2,
        });
        gsap.to(pointLight.current.position, {
          x: 0,
          y: 1020,
          z: 0,
          duration: 1,
        });
        gsap.to(renderer, {
          toneMappingExposure: 0.1,
          duration: 1,
        });
        state.camera.lookAt(cameraTarget);
        gsap.to(cameraTarget, {
          x: 0,
          y: 1002,
          z: 0,
          duration: 1,
        });
        gsap.to(globeRef.current.rotation, {
          x: Math.PI / 2,
          y: 0,
          z: 0,
          duration: 0.5,
        });

        switch (activeIndex) {
          case 0:
            gsap.to(boltRef.current.scale, {
              x: 0,
              y: 0,
              z: 0,
              duration: 0.5,
              // delay: 1.5,
            });
            boltLightRef.current.intensity = 0;

            state.camera.lookAt(cameraTarget);

            gsap.to(cameraTarget, {
              x: 0,
              y: 1003,
              z: 0,
              duration: 1,
            });

            gsap.to(state.camera.position, {
              x: 7,
              y: 1003,
              z: 9,
              duration: 1,
            });

            break;
          case 1:
            gsap.to(boltRef.current.position, {
              x: 5.5,
              y: 1003,
              z: 4,
            });
            gsap.to(boltRef.current.scale, {
              x: 20,
              y: 20,
              z: 20,
              duration: 0.5,
              // delay: 1.5,
            });
            gsap.to(boltLightRef.current.position, {
              x: 5.5,
              y: 1000,
              z: 3,
            });
            gsap.to(boltLightRef.current.target.position, {
              x: 5.5,
              y: 1010,
              z: 9,
            });
            boltLightRef.current.intensity = 1000;
            boltLightRef.current.angle = Math.PI / 8;

            state.camera.lookAt(cameraTarget);

            gsap.to(cameraTarget, {
              x: 0,
              y: 1003,
              z: 0,
              duration: 1,
            });

            gsap.to(state.camera.position, {
              x: 7,
              y: 1003,
              z: 9,
              duration: 1,
            });

            break;
          case 2:
            gsap.to(boltRef.current.position, {
              x: -0.5,
              y: 1002.5,
              z: 4,
            });
            gsap.to(boltRef.current.scale, {
              x: 20,
              y: 20,
              z: 20,
              duration: 0.5,
              // delay: 1.5,
            });
            gsap.to(boltLightRef.current.position, {
              x: -0.5,
              y: 1000,
              z: 4,
            });
            gsap.to(boltLightRef.current.target.position, {
              x: -0.5,
              y: 1010,
              z: 5,
            });
            boltLightRef.current.intensity = 1000;
            boltLightRef.current.angle = Math.PI / 8;

            state.camera.lookAt(cameraTarget);

            gsap.to(cameraTarget, {
              x: 3,
              y: 1003,
              z: -20,
              duration: 1,
            });

            gsap.to(state.camera.position, {
              x: -1,
              y: 1003,
              z: 8,
              duration: 1,
            });

            break;
          case 3:
            gsap.to(boltRef.current.position, {
              x: 5.75,
              y: 1003,
              z: 4,
            });
            gsap.to(boltRef.current.scale, {
              x: 15,
              y: 15,
              z: 15,
              duration: 0.5,
              // delay: 1.5,
            });
            gsap.to(boltLightRef.current.position, {
              x: 5.75,
              y: 1000,
              z: 4,
            });
            gsap.to(boltLightRef.current.target.position, {
              x: 5.75,
              y: 1010,
              z: 5,
            });
            boltLightRef.current.intensity = 1000;
            boltLightRef.current.angle = Math.PI / 8;

            state.camera.lookAt(cameraTarget);

            gsap.to(cameraTarget, {
              x: 0,
              y: 1002,
              z: -5,
              duration: 1,
            });

            gsap.to(state.camera.position, {
              x: 7,
              y: 1003,
              z: 6,
              duration: 1,
            });

            break;
        }
        break;
      case 2:
        gsap.to(skyRef.current.material.uniforms.sunPosition.value, {
          x: 2000,
          y: 3700,
          z: -2000,
          duration: 1,
        });
        gsap.to(dirLight.current.position, {
          x: 150,
          y: 1150,
          z: 150,
          duration: 2,
        });
        gsap.to(pointLight.current.position, {
          x: 50,
          y: 1020,
          z: -20,
          duration: 1,
        });
        gsap.to(renderer, {
          toneMappingExposure: 0.075,
          duration: 1,
        });
        state.camera.lookAt(cameraTarget);
        gsap.to(cameraTarget, {
          x: 0,
          y: 1002,
          z: 0,
          duration: 1,
        });
        gsap.to(globeRef.current.rotation, {
          x: Math.PI,
          y: 0,
          z: 0,
          duration: 0.5,
        });

        switch (activeIndex) {
          case 0:
            gsap.to(boltRef.current.scale, {
              x: 0,
              y: 0,
              z: 0,
              duration: 0.5,
              // delay: 1.5,
            });

            boltLightRef.current.intensity = 0;

            state.camera.lookAt(cameraTarget);

            gsap.to(cameraTarget, {
              x: 0,
              y: 1002,
              z: 0,
              duration: 1,
            });

            gsap.to(state.camera.position, {
              x: 8,
              y: 1002,
              z: 12,
              duration: 1,
            });

            break;
          case 1:
            gsap.to(boltRef.current.position, {
              x: 6.5,
              y: 1002,
              z: 6,
            });
            gsap.to(boltRef.current.scale, {
              x: 20,
              y: 20,
              z: 20,
              duration: 0.5,
              // delay: 1.5,
            });
            gsap.to(boltLightRef.current.position, {
              x: 6.5,
              y: 1000,
              z: 7,
            });
            gsap.to(boltLightRef.current.target.position, {
              x: 6.5,
              y: 1010,
              z: 4,
            });
            boltLightRef.current.intensity = 1000;
            boltLightRef.current.angle = Math.PI / 6;

            state.camera.lookAt(cameraTarget);

            gsap.to(cameraTarget, {
              x: 0,
              y: 1002,
              z: 0,
              duration: 1,
            });

            gsap.to(state.camera.position, {
              x: 8,
              y: 1002,
              z: 12,
              duration: 1,
            });

            break;
          case 2:
            gsap.to(boltRef.current.position, {
              x: -1,
              y: 1003.5,
              z: 7,
            });
            gsap.to(boltRef.current.scale, {
              x: 20,
              y: 20,
              z: 20,
              duration: 0.5,
              // delay: 1.5,
            });
            gsap.to(boltLightRef.current.position, {
              x: -1,
              y: 1000,
              z: 8,
            });
            gsap.to(boltLightRef.current.target.position, {
              x: -1.5,
              y: 1010,
              z: 6,
            });
            boltLightRef.current.intensity = 1000;
            boltLightRef.current.angle = Math.PI / 8;

            state.camera.lookAt(cameraTarget);

            gsap.to(cameraTarget, {
              x: 5,
              y: 1003,
              z: 0,
              duration: 1,
            });

            gsap.to(state.camera.position, {
              x: -5,
              y: 1003,
              z: 10,
              duration: 1,
            });

            break;
          case 3:
            gsap.to(boltRef.current.position, {
              x: -1,
              y: 1003.5,
              z: 7,
            });
            gsap.to(boltRef.current.scale, {
              x: 0,
              y: 0,
              z: 0,
              duration: 0.5,
              // delay: 1.5,
            });
            // gsap.to(boltLightRef.current.position, {
            //   x: -1,
            //   y: 1000,
            //   z: 8,
            // });
            // gsap.to(boltLightRef.current.target.position, {
            //   x: -1.5,
            //   y: 1010,
            //   z: 6,
            // });
            boltLightRef.current.intensity = 0;
            boltLightRef.current.angle = Math.PI / 8;
            state.camera.lookAt(cameraTarget);

            gsap.to(cameraTarget, {
              x: 1,
              y: 1003,
              z: 0,
              duration: 1,
            });

            gsap.to(state.camera.position, {
              x: 4,
              y: 1002,
              z: 12,
              duration: 1,
            });

            break;
        }
        break;
    }
  });

  useEffect(() => {
    scene.traverse(function (child) {
      if (child.isMesh) {
        child.receiveShadow = true;
        // child.castShadow = true;
      }
    });
  }, [scene, activeScene]);

  useEffect(() => {
    if (dirLight.current) {
      setDirLightHelper(new DirectionalLightHelper(dirLight.current));
    }
  }, []);

  return (
    <Fragment>
      <OrbitControls target={[0, 1000.4, 0]} />
      {/* <gridHelper size={2000} args={[1000, 100, 'red', 'green']} /> */}
      <Sky
        scale={10000}
        position={[0, 1000, 0]}
        sunPosition={[controls.sunX, controls.sunY, controls.sunZ]}
        // sunPosition={sunPos}
        turbidity={controls.turbidity}
        rayleigh={controls.rayleigh}
        mieCoefficient={controls.mieCoefficient}
        mieDirectionalG={controls.mieDirectionalG}
        azimuth={controls.azimuth}
        ref={skyRef}
      />
      <hemisphereLight color='white' intensity={4} position={[1000, 2000, 1000]} />
      <directionalLight
        color='white'
        intensity={50}
        scale={[100, 100, 100]}
        shadow-camera-far={400}
        shadow-camera-top={400}
        shadow-camera-bottom={400}
        position={[0, 1150, 150]}
        target-position={[3, 1000, 0]}
        shadow-bias={-0.0005}
        shadow-radius={1000}
        castShadow
        ref={dirLight}
      >
        <orthographicCamera attach='shadow-camera' args={[-100, 10, 10, -10]} />
      </directionalLight>

      <spotLight
        color='white'
        position={[0, 1020, 0]}
        target-position={[0, 1000, 0]}
        intensity={8000}
        ref={pointLight}
        castShadow
        shadow-bias={-0.0005}
        shadow-mapSize={[1024, 1024]}
        angle={Math.PI / 2}
      />
      <spotLight
        color='white'
        position={[4, 1000, 6.5]}
        target-position={[3.5, 1002, 6]}
        intensity={0}
        ref={boltLightRef}
        castShadow
        shadow-bias={-0.0005}
        shadow-mapSize={[1024, 1024]}
        angle={Math.PI / 6}
      />
      <Bolt position={[3.5, 1002, 6]} scale={0} refs={boltRef} rotation={[0, 0, Math.PI / 4]} />

      <group ref={globeRef} receiveShadow castShadow>
        <Truck castShadow receiveShadow onPointerOver={(event) => handleOverIn()} refs={truckRef} position={[3, 1000, 0]} />

        <Float speed={2} floatingRange={[-0.1, -0.1]} floatIntensity={0.1} rotationIntensity={0.15} position={[-1, 1, -998.5]} rotation={[-Math.PI / 2, 0, 0]}>
          <Tugboat onPointerOver={(event) => handleOverIn()} />
        </Float>
        <Ocean refs={boatGroundRef} onPointerOver={(event) => handleOverIn()} receiveShadow position={[0, 0, -11]} rotation={[-Math.PI / 2, 0, 0]} />

        <Solar
          // refs={solarRef}
          // onPointerOver={(event) => handleOverIn()}
          // position={activeScene === 0 ? [3000, 0.05, 0] : activeScene === 1 ? [-3000, 0.05, 0] : [0, 0.05, 0]}
          position={[1, -1000.05, -2]}
          rotation={[Math.PI, Math.PI / 3.25, 0]}
        />

        {/* )} */}

        <Sphere args={activeScene === 0 || activeScene === 1 ? [1000, 500, 500] : [1, 1, 1]} position={[0, 0, 0]} rotation={[Math.PI / 4, 0, Math.PI / 2]} receiveShadow castShadow>
          <meshStandardMaterial map={truckGroundColor} displacementMap={truckGroundDisp} />
        </Sphere>

        <Sphere args={activeScene === 2 ? [1000, 500, 500] : [1, 1, 1]} position={[0, 0, 0]} rotation={[Math.PI / 4, 0, Math.PI / 2]} receiveShadow castShadow>
          <meshStandardMaterial map={solarGroundColor} roughnessMap={solarGroundRough} aoMap={solarGroundAo} normalMap={solarGroundNormal} />
        </Sphere>
      </group>
    </Fragment>
  );
};

export default App;
