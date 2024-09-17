import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useFrame, useThree, RepeatWrapping } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, Float, Sky, useTexture, Sphere, useHelper } from '@react-three/drei';

import BoatHDR from '../public/textures/boat_environment.jpg';
import TruckHDR from '../public/textures/truck_environment.jpg';
import SolarHDR from '../public/textures/solar_environment.jpg';
import { Truck } from './models/Truck';
import { Tugboat } from './models/Tugboat';
import { useControls, folder } from 'leva';
import { Solar } from './models/Solar';
import { SolarGround } from './models/Solar_Ground';
import { BackSide, DirectionalLightHelper, FrontSide, MeshStandardMaterial, Vector3 } from 'three';
import { TruckGround } from './models/Truck_Ground';
import { gsap } from 'gsap';
import { Ocean } from './WaterSurface/Ocean';
import SolarGroundColor from '../public/coast_sand_01_diff_1k.jpg';
import SolarGroundDisp from '../public/textures/coast_sand_01_disp_1k.png';

// eslint-disable-next-line react/prop-types
const App = ({ activeIndex, activeScene, hover, setHover }) => {
  const [solarScenePos, setSolarScenePos] = useState([0, -100, 0]);
  const [truckScenePos, setTruckScenePos] = useState([0, -100, 0]);
  const [boatScenePos, setBoatScenePos] = useState([3, 0, 0]);
  const [activeHDR, setActiveHDR] = useState(null);
  const [cameraTarget, setCameraTarget] = useState(new Vector3(0, 0, 0));
  const dirLight = useRef(null);
  const activeModel = useRef(null);
  const activeGround = useRef(null);
  const truckRef = useRef(null);
  const truckGroundRef = useRef(null);
  const boatRef = useRef(null);
  const boatGroundRef = useRef(null);
  const solarRef = useRef(null);
  const solarGroundRef = useRef(null);
  const sunRef = useRef(null);
  const { camera, gl: renderer, scene } = useThree();
  const pointLight = useRef(null);

  const sunPos = new Vector3(-540, 202, 200);
  // useHelper(dirLight, DirectionalLightHelper, 1, 'red');
  // useHelper(pointLight, THREE.SpotLightHelper, 1, 'red');

  const [solarGroundColor, solarGroundDisp] = useTexture([SolarGroundColor, SolarGroundDisp]);

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
      flowSpeed: 0.03,
      flowDirection: [1.0, 0.5],
      reflectivity: 1.2,
      scale_complex: 5,
      color: '#bedbe8',
    }),
    sky: folder({
      turbidity: {
        value: 0.5,
        min: 0,
        max: 20,
      },
      rayleigh: {
        value: 1,
        min: 0,
        max: 4,
      },
      mieCoefficient: { value: 0.005, min: 0, max: 0.1, step: 0.001 },
      mieDirectionalG: { value: 0.7, min: 0, max: 1, step: 0.01 },
      azimuth: { value: 180, min: -180, max: 180 },
      exposure: {
        value: 0.05,
        min: 0,
        max: 1,
        step: 0.01,
      },
      sunPosition: folder({
        sunX: {
          value: -540,
          min: -2000,
          max: 2000,
        },
        sunY: {
          value: 202,
          min: 0,
          max: 500,
        },
        sunZ: {
          value: 200,
          min: -2000,
          max: 2000,
        },
      }),
    }),
  });
  useFrame((state, delta) => {
    renderer.toneMappingExposure = controls.exposure;
    switch (activeScene) {
      case 0:
        if (truckRef.current && truckGroundRef.current && boatRef.current && boatGroundRef.current && solarRef.current && solarGroundRef.current) {
          gsap.to(truckRef.current.position, {
            x: 3,
            y: 0,
            z: 0,
            duration: 1,
          });
          gsap.to(truckGroundRef.current.position, {
            x: 3,
            y: 0.03,
            z: 0,
            duration: 1,
          });
          gsap.to(boatRef.current.position, {
            x: 0,
            y: 50,
            z: 0,
            duration: 1,
          });
          gsap.to(boatGroundRef.current.position, {
            x: 0,
            y: -50,
            z: 0,
            duration: 1,
          });
          gsap.to(solarRef.current.position, {
            x: 0,
            y: 50,
            z: 0,
            duration: 1,
          });
          gsap.to(solarGroundRef.current.position, {
            x: 0,
            y: -50,
            z: 0,
            duration: 1,
          });
        }
        switch (activeIndex) {
          case 0:
            state.camera.lookAt(cameraTarget);

            gsap.to(cameraTarget, {
              x: 0,
              y: 2,
              z: 0,
              duration: 1,
            });

            if (hover && false) {
              gsap.to(state.camera.position, {
                x: 6 + state.pointer.x / 2,
                y: 2 + state.pointer.y / 2,
                z: 10,
                duration: 4,
              });
            } else {
              gsap.to(state.camera.position, {
                x: 6,
                y: 2,
                z: 10,
                duration: 1,
              });
            }
            break;
          case 1:
            state.camera.lookAt(cameraTarget);

            gsap.to(cameraTarget, {
              x: 0,
              y: 2,
              z: 0,
              duration: 1,
            });

            if (hover && false) {
              gsap.to(state.camera.position, {
                x: 6 + state.pointer.x / 2,
                y: 2 + state.pointer.y / 2,
                z: 10,
                duration: 4,
              });
            } else {
              gsap.to(state.camera.position, {
                x: 6,
                y: 2,
                z: 10,
                duration: 1,
              });
            }
            break;
          case 2:
            state.camera.lookAt(cameraTarget);

            gsap.to(cameraTarget, {
              x: 0,
              y: 2,
              z: -20,
              duration: 1,
            });

            if (hover && false) {
              gsap.to(state.camera.position, {
                x: -3 + state.pointer.x / 2,
                y: 3 + state.pointer.y / 2,
                z: 7,
                duration: 4,
              });
            } else {
              gsap.to(state.camera.position, {
                x: -3,
                y: 3,
                z: 7,
                duration: 1,
              });
            }
            break;
          case 3:
            state.camera.lookAt(cameraTarget);

            gsap.to(cameraTarget, {
              x: 0,
              y: 1,
              z: -5,
              duration: 1,
            });

            if (hover && false) {
              gsap.to(state.camera.position, {
                x: 6 + state.pointer.x / 2,
                y: 2 + state.pointer.y / 2,
                z: 9,
                duration: 4,
              });
            } else {
              gsap.to(state.camera.position, {
                x: 6,
                y: 2,
                z: 9,
                duration: 1,
              });
            }
            break;
        }
        break;
      case 1:
        if (truckRef.current && truckGroundRef.current && boatRef.current && boatGroundRef.current && solarRef.current && solarGroundRef.current) {
          gsap.to(truckRef.current.position, {
            x: 0,
            y: 50,
            z: 0,
            duration: 1,
          });
          gsap.to(truckGroundRef.current.position, {
            x: 0,
            y: -50,
            z: 0,
            duration: 1,
          });
          gsap.to(boatRef.current.position, {
            x: -1,
            y: -2.5,
            z: 1,
            duration: 1,
          });
          gsap.to(boatGroundRef.current.position, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1,
          });
          gsap.to(solarRef.current.position, {
            x: 0,
            y: 50,
            z: 0,
            duration: 1,
          });
          gsap.to(solarGroundRef.current.position, {
            x: 0,
            y: -50,
            z: 0,
            duration: 1,
          });
        }
        switch (activeIndex) {
          case 0:
            state.camera.lookAt(cameraTarget);

            gsap.to(cameraTarget, {
              x: 0,
              y: 2,
              z: 0,
              duration: 1,
            });

            if (hover && false) {
              gsap.to(state.camera.position, {
                x: 7 + state.pointer.x / 2,
                y: 1 + state.pointer.y / 2,
                z: 9,
                duration: 4,
              });
            } else {
              gsap.to(state.camera.position, {
                x: 7,
                y: 2,
                z: 9,
                duration: 1,
              });
            }
            break;
          case 1:
            state.camera.lookAt(cameraTarget);

            gsap.to(cameraTarget, {
              x: 0,
              y: 2,
              z: 0,
              duration: 1,
            });

            if (hover && false) {
              gsap.to(state.camera.position, {
                x: 7 + state.pointer.x / 2,
                y: 1 + state.pointer.y / 2,
                z: 9,
                duration: 4,
              });
            } else {
              gsap.to(state.camera.position, {
                x: 7,
                y: 2,
                z: 9,
                duration: 1,
              });
            }
            break;
          case 2:
            state.camera.lookAt(cameraTarget);

            gsap.to(cameraTarget, {
              x: 3,
              y: 2,
              z: -20,
              duration: 1,
            });

            if (hover && false) {
              gsap.to(state.camera.position, {
                x: 3 + state.pointer.x / 2,
                y: 1 + state.pointer.y / 2,
                z: 8,
                duration: 4,
              });
            } else {
              gsap.to(state.camera.position, {
                x: -1,
                y: 2,
                z: 8,
                duration: 1,
              });
            }
            break;
          case 3:
            state.camera.lookAt(cameraTarget);

            gsap.to(cameraTarget, {
              x: 0,
              y: 1,
              z: -5,
              duration: 1,
            });

            if (hover && false) {
              gsap.to(state.camera.position, {
                x: 6 + state.pointer.x / 2,
                y: 1 + state.pointer.y / 2,
                z: 8,
                duration: 4,
              });
            } else {
              gsap.to(state.camera.position, {
                x: 7,
                y: 2,
                z: 6,
                duration: 1,
              });
            }
            break;
        }
        break;
      case 2:
        if (truckRef.current && truckGroundRef.current && boatRef.current && boatGroundRef.current && solarRef.current && solarGroundRef.current) {
          gsap.to(truckRef.current.position, {
            x: 0,
            y: 50,
            z: 0,
            duration: 1,
          });
          gsap.to(truckGroundRef.current.position, {
            x: 0,
            y: -50,
            z: 0,
            duration: 1,
          });
          gsap.to(boatRef.current.position, {
            x: 3,
            y: 50,
            z: 0,
            duration: 1,
          });
          gsap.to(boatGroundRef.current.position, {
            x: 3,
            y: -50,
            z: 0,
            duration: 1,
          });
          gsap.to(solarRef.current.position, {
            x: 2,
            y: -0.455,
            z: 3,
            duration: 1,
          });
          gsap.to(solarGroundRef.current.position, {
            x: 0,
            y: -0.5,
            z: 0,
            duration: 1,
          });
        }
        switch (activeIndex) {
          case 0:
            state.camera.lookAt(cameraTarget);

            gsap.to(cameraTarget, {
              x: 0,
              y: 2,
              z: 0,
              duration: 1,
            });

            if (hover && false) {
              gsap.to(state.camera.position, {
                x: 8 + state.pointer.x / 2,
                y: 2 + state.pointer.y / 2,
                z: 12,
                duration: 4,
              });
            } else {
              gsap.to(state.camera.position, {
                x: 8,
                y: 2,
                z: 12,
                duration: 1,
              });
            }
            break;
          case 1:
            state.camera.lookAt(cameraTarget);

            gsap.to(cameraTarget, {
              x: 0,
              y: 2,
              z: 0,
              duration: 1,
            });

            if (hover && false) {
              gsap.to(state.camera.position, {
                x: 8 + state.pointer.x / 2,
                y: 2 + state.pointer.y / 2,
                z: 12,
                duration: 4,
              });
            } else {
              gsap.to(state.camera.position, {
                x: 8,
                y: 2,
                z: 12,
                duration: 1,
              });
            }
            break;
          case 2:
            state.camera.lookAt(cameraTarget);

            gsap.to(cameraTarget, {
              x: 5,
              y: 3,
              z: 0,
              duration: 1,
            });

            if (hover && false) {
              gsap.to(state.camera.position, {
                x: -5 + state.pointer.x / 2,
                y: 3 + state.pointer.y / 2,
                z: 7,
                duration: 4,
              });
            } else {
              gsap.to(state.camera.position, {
                x: -5,
                y: 3,
                z: 10,
                duration: 1,
              });
            }
            break;
          case 3:
            state.camera.lookAt(cameraTarget);

            gsap.to(cameraTarget, {
              x: 1,
              y: 3,
              z: 0,
              duration: 1,
            });

            if (hover && false) {
              gsap.to(state.camera.position, {
                x: 0 + state.pointer.x / 2,
                y: 3 + state.pointer.y / 2,
                z: 10,
                duration: 4,
              });
            } else {
              gsap.to(state.camera.position, {
                x: 4,
                y: 2,
                z: 12,
                duration: 1,
              });
            }
            break;
        }
        break;
    }
  });
  // useEffect(() => {
  //   // if (activeScene === 0) {
  //   //   setActiveHDR(TruckHDR);
  //   //   setSolarScenePos([0, -100, 0]);
  //   //   setTruckScenePos([3, 0, 0]);
  //   //   setBoatScenePos([0, -100, 0]);
  //   // } else if (activeScene === 1) {
  //   //   setActiveHDR(BoatHDR);
  //   //   setSolarScenePos([0, -100, 0]);
  //   //   setTruckScenePos([3, -100, 0]);
  //   //   setBoatScenePos([0, 0, 0]);
  //   // } else if (activeScene === 2) {
  //   //   setActiveHDR(SolarHDR);
  //   //   setSolarScenePos([0, 0, 0]);
  //   //   setTruckScenePos([3, -100, 0]);
  //   //   setBoatScenePos([0, -100, 0]);
  //   // }
  // }, [activeScene, renderer, camera]);

  useEffect(() => {
    scene.traverse(function (child) {
      if (child.isMesh) {
        child.receiveShadow = true;
      }
    });
    const repeatX = 100;
    const repeatY = 100;
    [solarGroundColor, solarGroundDisp].forEach((texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(repeatX, repeatY);
    });
  }, [scene, solarGroundColor, solarGroundDisp]);
  return (
    <Fragment>
      <OrbitControls target={[0, 0.4, 0]} />
      {/* {activeHDR && <Environment files={activeHDR} background backgroundBlurriness={0} />} */}
      <Sky
        scale={1000}
        // sunPosition={[controls.sunX, controls.sunY, controls.sunZ]}
        sunPosition={sunPos}
        turbidity={controls.turbidity}
        rayleigh={controls.rayleigh}
        mieCoefficient={controls.mieCoefficient}
        mieDirectionalG={controls.mieDirectionalG}
        azimuth={controls.azimuth}
        // ref={sunRef}
      />
      {/* <Clouds /> */}
      <hemisphereLight color='white' intensity={0.1} position={[1000, 1000, 1000]} />
      <directionalLight
        color='white'
        intensity={40}
        scale={[100, 100, 100]}
        shadow-camera-far={400}
        shadow-camera-top={400}
        shadow-camera-bottom={400}
        position={[0, 100, 150]}
        target-position={[3, -1, 0]}
        shadow-bias={-0.0005}
        shadow-radius={1000}
        castShadow
        ref={dirLight}
      >
        <orthographicCamera attach='shadow-camera' args={[-100, 10, 10, -10]} />
      </directionalLight>
      <spotLight color='white' position={[0, 20, 0]} intensity={8000} ref={pointLight} castShadow shadow-bias={-0.0005} shadow-mapSize={[1024, 1024]} angle={Math.PI / 2} />
      {/* {activeHDR && <SkySphere file={activeHDR} rotation={[controls.rotateX, controls.rotateY, controls.rotateZ]} position={[controls.position.x, controls.position.y, controls.position.z]} />} */}
      {/* <ambientLight intensity={1} /> */}
      {/* {activeScene === 0 && ( */}
      <>
        <Truck
          // position={[3, 0, 0]}
          // position={scenePos}
          castShadow
          receiveShadow
          // refs={activeModel}
          onPointerOver={(event) => handleOverIn()}
          // position={activeScene === 0 ? [3, 0, 0] : activeScene === 1 ? [3000, 0, 0] : [-3000, 0, 0]}
          refs={truckRef}
        />
        <TruckGround
          // position={[3, 0.03, 0]}
          // position={scenePos}
          castShadow
          receiveShadow
          // refs={activeGround}
          refs={truckGroundRef}
          onPointerOver={(event) => handleOverIn()}
          // position={activeScene === 0 ? [3, 0.03, 0] : activeScene === 1 ? [3000, 0.03, 0] : [-3000, 0.03, 0]}
        />
        {/* <ContactShadows scale={10} opacity={1} /> */}
      </>
      {/* )} */}
      {/* {activeScene === 1 && ( */}
      <>
        <Float
          speed={2}
          floatingRange={[-0.1, -0.1]}
          floatIntensity={0.1}
          rotationIntensity={0.15}
          // position={activeScene === 0 ? [-3000, 2, 5] : activeScene === 1 ? [3, 1.2, 5] : [3000, 2, 5]}
          // ref={boatRef}
        >
          <Tugboat
            // refs={activeModel}
            refs={boatRef}
            onPointerOver={(event) => handleOverIn()}
          />
        </Float>
        <Ocean
          // refs={activeGround}
          refs={boatGroundRef}
          onPointerOver={(event) => handleOverIn()}
          receiveShadow
          // position={activeScene === 0 ? [-3000, 0, 0] : activeScene === 1 ? [0, 0, 0] : [3000, 0, 0]}
        />
      </>
      {/* )} */}
      {/* {activeScene === 2 && ( */}
      <>
        <Solar
          // position={[0, 0.05, 0]}
          // refs={activeModel}
          refs={solarRef}
          onPointerOver={(event) => handleOverIn()}
          position={activeScene === 0 ? [3000, 0.05, 0] : activeScene === 1 ? [-3000, 0.05, 0] : [0, 0.05, 0]}
        />
        <SolarGround
          // position={[0, 0, 0]}
          scale={0.2}
          // refs={activeGround}
          refs={solarGroundRef}
          onPointerOver={(event) => handleOverIn()}
          position={activeScene === 0 ? [3000, 0, 0] : activeScene === 1 ? [-3000, 0, 0] : [0, 0, 0]}
        />
      </>
      {/* )} */}
      {/* <Sphere args={[5000, 500, 500]} position={[0, -5000, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial map={solarGroundColor} />
      </Sphere> */}
    </Fragment>
  );
};

export default App;
