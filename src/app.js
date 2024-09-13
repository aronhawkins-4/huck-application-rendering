import React, { act, Fragment, useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Stats, OrbitControls, Environment, ContactShadows, Float, Html, Sphere, useHelper, Sky } from '@react-three/drei';

import BoatHDR from '../public/textures/boat_environment.jpg';
import TruckHDR from '../public/textures/truck_environment.jpg';
import SolarHDR from '../public/textures/solar_environment.jpg';
import { Truck } from './models/Truck';
import { Tugboat } from './models/Tugboat';
import WaterSurfaceComplex from './WaterSurface/WaterSurfaceComplex';
import { useControls, folder } from 'leva';
import { Solar } from './models/Solar';
import { SolarGround } from './models/Solar_Ground';
import { DirectionalLightHelper, Vector3 } from 'three';
import { TruckGround } from './models/Truck_Ground';
import { gsap } from 'gsap';
import { SkySphere } from './SkySphere';
import { Ocean } from './WaterSurface/Ocean';
import { CloudsModel as Clouds } from './Clouds/Clouds';

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
  const sunRef = useRef(null);
  const { camera, gl: renderer, scene } = useThree();
  const [objectInitialPos, setObjectInitialPos] = useState([0, 0, 0]);
  const [groundInitialPos, setGroundInitialPos] = useState([0, 0, 0]);
  const [sunInitialPos, setSunInitialPos] = useState([0, 100, 150]);
  // const [sunPos, setSunPos] = useState([-540, 202, 200]);
  const sunPos = new Vector3(-540, 202, 200);
  // useHelper(dirLight, DirectionalLightHelper, 1, 'red');

  // useHelper(dirLight, DirectionalLightHelper, 'red');

  const handleOverIn = (e) => {
    if (!hover) {
      setHover(true);
    }
  };

  const handleOverOut = (e) => {
    if (hover) {
      setHover(false);
    }
  };

  const controls = useControls({
    complexWater: folder({
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
        value: renderer.toneMappingExposure,
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
        switch (activeIndex) {
          case 0:
            state.camera.lookAt(cameraTarget);

            gsap.to(state.camera.position, {
              x: 6,
              y: 2,
              z: 10,
              duration: 1,
            });

            gsap.to(cameraTarget, {
              x: 0,
              y: 2,
              z: 0,
              duration: 1,
            });
            break;
          case 1:
            state.camera.lookAt(cameraTarget);
            gsap.to(camera.position, {
              x: 6,
              y: 2,
              z: 10,
              duration: 1,
            });
            gsap.to(cameraTarget, {
              x: 0,
              y: 2,
              z: 0,
              duration: 1,
            });
            break;
          case 2:
            state.camera.lookAt(cameraTarget);
            gsap.to(camera.position, {
              x: -3,
              y: 3,
              z: 7,
              duration: 1,
            });
            gsap.to(cameraTarget, {
              x: 0,
              y: 2,
              z: -20,
              duration: 1,
            });
            break;
          case 3:
            state.camera.lookAt(cameraTarget);
            gsap.to(camera.position, {
              x: 6,
              y: 2,
              z: 9,
              duration: 1,
            });
            gsap.to(cameraTarget, {
              x: 0,
              y: 1,
              z: -5,
              duration: 1,
            });
            break;
        }
        break;
      case 1:
        switch (activeIndex) {
          case 0:
            state.camera.lookAt(cameraTarget);
            gsap.to(camera.position, {
              x: 7,
              y: 1,
              z: 9,
              duration: 1,
            });
            gsap.to(cameraTarget, {
              x: 0,
              y: 1,
              z: 0,
              duration: 1,
            });
            break;
          case 1:
            state.camera.lookAt(cameraTarget);
            gsap.to(camera.position, {
              x: 7,
              y: 1,
              z: 9,
              duration: 1,
            });
            gsap.to(cameraTarget, {
              x: 0,
              y: 1,
              z: 0,
              duration: 1,
            });
            break;
          case 2:
            state.camera.lookAt(cameraTarget);
            gsap.to(camera.position, {
              x: 3,
              y: 1,
              z: 8,
              duration: 1,
            });
            gsap.to(cameraTarget, {
              x: 3,
              y: 0,
              z: -20,
              duration: 1,
            });
            break;
          case 3:
            state.camera.lookAt(cameraTarget);
            gsap.to(camera.position, {
              x: 6,
              y: 1,
              z: 8,
              duration: 1,
            });
            gsap.to(cameraTarget, {
              x: 0,
              y: 0,
              z: -5,
              duration: 1,
            });
            break;
        }
        break;
      case 2:
        switch (activeIndex) {
          case 0:
            state.camera.lookAt(cameraTarget);
            gsap.to(camera.position, {
              x: 8,
              y: 2,
              z: 12,
              duration: 1,
            });
            gsap.to(cameraTarget, {
              x: 0,
              y: 2,
              z: 0,
              duration: 1,
            });
            break;
          case 1:
            state.camera.lookAt(cameraTarget);
            gsap.to(camera.position, {
              x: 8,
              y: 2,
              z: 12,
              duration: 1,
            });
            gsap.to(cameraTarget, {
              x: 0,
              y: 2,
              z: 0,
              duration: 1,
            });
            break;
          case 2:
            state.camera.lookAt(cameraTarget);
            gsap.to(camera.position, {
              x: -5,
              y: 3,
              z: 7,
              duration: 1,
            });
            gsap.to(cameraTarget, {
              x: 0,
              y: 3,
              z: 0,
              duration: 1,
            });
            break;
          case 3:
            state.camera.lookAt(cameraTarget);
            gsap.to(camera.position, {
              x: 0,
              y: 3,
              z: 10,
              duration: 1,
            });
            gsap.to(cameraTarget, {
              x: 0,
              y: 3,
              z: 0,
              duration: 1,
            });
            break;
        }
        break;
    }
    if (activeModel.current && hover) {
      gsap.to(activeModel.current.position, {
        x: objectInitialPos[0] + state.pointer.x / 2,
        y: objectInitialPos[1] + state.pointer.y / 2,
        z: activeModel.current.position.z,
        duration: 4,
      });
      gsap.to(dirLight.current.position, {
        x: sunInitialPos[0] + state.pointer.x / 2,
        y: sunInitialPos[1] + state.pointer.y / 2,
        z: dirLight.current.position.z,
        duration: 4,
      });
    } else if (activeModel.current) {
      gsap.to(activeModel.current.position, {
        x: objectInitialPos[0],
        y: objectInitialPos[1],
        z: objectInitialPos[2],
        duration: 4,
      });
      gsap.to(dirLight.current.position, {
        x: sunInitialPos[0],
        y: sunInitialPos[1],
        z: sunInitialPos[2],
        duration: 4,
      });
    }
    if (activeGround.current && hover) {
      gsap.to(activeGround.current.position, {
        x: groundInitialPos[0] + state.pointer.x / 2,
        y: groundInitialPos[1] + state.pointer.y / 2,
        z: activeGround.current.position.z,
        duration: 4,
      });
    } else if (activeGround.current) {
      gsap.to(activeGround.current.position, {
        x: groundInitialPos[0],
        y: groundInitialPos[1],
        z: groundInitialPos[2],
        duration: 4,
      });
    }
  });
  useEffect(() => {
    if (activeScene === 0) {
      setActiveHDR(TruckHDR);
      setSolarScenePos([0, -100, 0]);
      setTruckScenePos([3, 0, 0]);
      setBoatScenePos([0, -100, 0]);
      setObjectInitialPos([3, 0, 0]);
      setGroundInitialPos([3, -0.01, 0]);
      // setSunPos([-540, 202, 200]);

      gsap.to(sunPos, {
        x: -540,
        y: 202,
        z: 200,
        duration: 5,
      });
    } else if (activeScene === 1) {
      setActiveHDR(BoatHDR);
      setSolarScenePos([0, -100, 0]);
      setTruckScenePos([3, -100, 0]);
      setBoatScenePos([0, 0, 0]);
      setObjectInitialPos([0, 0, 0]);
      setGroundInitialPos([0, 0, 0]);
      // setSunPos([340, 0, -2000]);

      gsap.to(sunPos, {
        x: 340,
        y: 0,
        z: -2000,
        duration: 5,
      });
    } else if (activeScene === 2) {
      setActiveHDR(SolarHDR);
      setSolarScenePos([0, 0, 0]);
      setTruckScenePos([3, -100, 0]);
      setBoatScenePos([0, -100, 0]);
      setObjectInitialPos([0, 0, 0]);
      setGroundInitialPos([0, 0, 0]);
    }
    console.log(sunPos);
  }, [activeScene, renderer]);

  useEffect(() => {
    scene.traverse(function (child) {
      if (child.isMesh) {
        // child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    console.log(renderer);
  }, [scene]);
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
        intensity={4}
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
        {' '}
        <orthographicCamera attach='shadow-camera' args={[-100, 10, 10, -10]} />
      </directionalLight>
      {/* {activeHDR && <SkySphere file={activeHDR} rotation={[controls.rotateX, controls.rotateY, controls.rotateZ]} position={[controls.position.x, controls.position.y, controls.position.z]} />} */}

      {/* <ambientLight intensity={1} /> */}

      {activeScene === 0 && (
        <>
          <Truck
            position={[3, 0, 0]}
            // position={scenePos}
            castShadow
            receiveShadow
            refs={activeModel}
            onPointerOver={(event) => handleOverIn()}
          />
          <TruckGround
            position={[3, 0.03, 0]}
            // position={scenePos}
            castShadow
            receiveShadow
            refs={activeGround}
            onPointerOver={(event) => handleOverIn()}
          />
          {/* <ContactShadows scale={10} opacity={1} /> */}
        </>
      )}
      {activeScene === 1 && (
        <>
          <Float speed={2} floatingRange={[-0.2, -0.2]} floatIntensity={0.1} rotationIntensity={0.35} position={[3, 1.1, 5]}>
            <Tugboat refs={activeModel} onPointerOver={(event) => handleOverIn()} />
          </Float>
          <Ocean refs={activeGround} onPointerOver={(event) => handleOverIn()} receiveShadow castShadow />
          {/* <WaterSurfaceComplex
            dimensions={2048}
            position={boatScenePos}
            width={1000}
            length={1000}
            flowSpeed={0.02}
            flowDirection={controls.flowDirection}
            reflectivity={controls.reflectivity}
            scale={4}
            color={controls.color}
            castShadow
            receiveShadow
            refs={activeGround}
            onPointerOver={(event) => handleOverIn()}
          /> */}
        </>
      )}
      {activeScene === 2 && (
        <>
          <Solar position={[0, 0.05, 0]} refs={activeModel} onPointerOver={(event) => handleOverIn()} />
          <SolarGround position={[0, 0, 0]} scale={0.2} refs={activeGround} onPointerOver={(event) => handleOverIn()} />
        </>
      )}
    </Fragment>
  );
};

export default App;
