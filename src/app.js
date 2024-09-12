import React, { act, Fragment, useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Stats, OrbitControls, Environment, ContactShadows, Float, Html, Sphere, useHelper } from '@react-three/drei';

import BoatHDR from '../public/industrial_sunset_02_puresky_4k.hdr';
import TruckHDR from '../public/syferfontein_1d_clear_4k.hdr';
import SolarHDR from '../public/kiara_7_late-afternoon_1k.hdr';
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
  const { camera, viewport } = useThree();
  const [objectInitialPos, setObjectInitialPos] = useState([0, 0, 0]);
  const [groundInitialPos, setGroundInitialPos] = useState([0, 0, 0]);

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
    perfMonitor: {
      value: false,
    },

    planeSize: {
      value: { width: 190, length: 190 },
    },

    position: [0, 0, 0],

    complexWater: folder({
      flowSpeed: 0.03,
      flowDirection: [1.0, 0.5],
      reflectivity: 1.2,
      scale_complex: 5,
      color: '#bedbe8',
    }),
  });
  const vec = new Vector3();
  useFrame((state, delta) => {
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
    } else if (activeModel.current) {
      gsap.to(activeModel.current.position, {
        x: objectInitialPos[0],
        y: objectInitialPos[1],
        z: objectInitialPos[2],
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
    } else if (activeScene === 1) {
      setActiveHDR(BoatHDR);
      setSolarScenePos([0, -100, 0]);
      setTruckScenePos([3, -100, 0]);
      setBoatScenePos([0, 0, 0]);
      setObjectInitialPos([0, 0, 0]);
      setGroundInitialPos([0, 0, 0]);
    } else if (activeScene === 2) {
      setActiveHDR(SolarHDR);
      setSolarScenePos([0, 0, 0]);
      setTruckScenePos([3, -100, 0]);
      setBoatScenePos([0, -100, 0]);
      setObjectInitialPos([0, 0, 0]);
      setGroundInitialPos([0, 0, 0]);
    }
  }, [activeScene]);

  return (
    <Fragment>
      {/* {controls.perfMonitor && <Perf position={'top-left'} />} */}
      <OrbitControls target={[0, 0.4, 0]} />
      {/* <Environment files={activeHDR} background backgroundBlurriness={0} /> */}
      <directionalLight color='white' intensity={1} position={[1000, 1000, 1000]} castShadow ref={dirLight} />
      {activeHDR && <SkySphere file={activeHDR} />}

      <ambientLight intensity={0.35} />
      {/* <ContactShadows scale={70} opacity={0.8} /> */}

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
            position={[3, -0.01, 0]}
            // position={scenePos}
            castShadow
            receiveShadow
            refs={activeGround}
            onPointerOver={(event) => handleOverIn()}
          />
        </>
      )}
      {activeScene === 1 && (
        <>
          <Float speed={2} floatingRange={[-0.2, -0.2]} floatIntensity={0.1} rotationIntensity={0.35} position={[3, 1.1, 5]}>
            <Tugboat refs={activeModel} onPointerOver={(event) => handleOverIn()} />
          </Float>
          <WaterSurfaceComplex
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
          />
        </>
      )}
      {activeScene === 2 && (
        <>
          <Solar position={[0, 0, 0]} refs={activeModel} onPointerOver={(event) => handleOverIn()} />
          <SolarGround position={[0, 0, 0]} scale={0.2} refs={activeGround} onPointerOver={(event) => handleOverIn()} />
        </>
      )}
    </Fragment>
  );
};

export default App;
