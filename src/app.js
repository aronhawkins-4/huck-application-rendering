import React, { act, Fragment, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stats, OrbitControls, Environment, ContactShadows, Float, Html } from '@react-three/drei';

import ClearSky from '../public/syferfontein_1d_clear_puresky_1k copy.hdr';
import SolarHDR from '../public/goegap_4k copy.hdr';
import snoiseImport from './shaders/snoise3.glsl';
import { Truck } from './models/Truck';
import { Tugboat } from './models/Tugboat';
import WaterSurfaceComplex from './WaterSurface/WaterSurfaceComplex';
import { useControls, folder } from 'leva';
import { Perf } from 'r3f-perf';
import { Solar } from './models/Solar';
import { SolarGround } from './models/Solar_Ground';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { TruckGround } from './models/Truck_Ground';

// eslint-disable-next-line react/prop-types
const App = ({ activeIndex, activeScene }) => {
  const [solarScenePos, setSolarScenePos] = useState([0, -100, 0]);
  const [truckScenePos, setTruckScenePos] = useState([0, -100, 0]);
  const [boatScenePos, setBoatScenePos] = useState([3, 0, 0]);

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
        setSolarScenePos([0, -100, 0]);
        setTruckScenePos([3, 0, 0]);
        setBoatScenePos([0, -100, 0]);
        switch (activeIndex) {
          case 0:
            state.camera.position.lerp(vec.set(6, 2, 10), 0.1);
            state.camera.lookAt(0, 2, 0);
            break;
          case 1:
            state.camera.position.lerp(vec.set(6, 2, 10), 0.1);
            state.camera.lookAt(0, 2, 0);
            break;
          case 2:
            state.camera.position.lerp(vec.set(-3, 3, 7), 0.1);
            state.camera.lookAt(0, 2, -20);
            break;
          case 3:
            state.camera.position.lerp(vec.set(5, 2, 7), 0.1);
            state.camera.lookAt(0, 2, -5);
            break;
        }
        break;
      case 1:
        setSolarScenePos([0, -100, 0]);
        setTruckScenePos([3, -100, 0]);
        setBoatScenePos([0, 0, 0]);
        switch (activeIndex) {
          case 0:
            state.camera.position.lerp(vec.set(7, 1, 9), 0.1);
            state.camera.lookAt(0, 1, 0);
            break;
          case 1:
            state.camera.position.lerp(vec.set(7, 1, 9), 0.1);
            state.camera.lookAt(0, 1, 0);
            break;
          case 2:
            state.camera.position.lerp(vec.set(3, 1, 8), 0.1);
            state.camera.lookAt(3, 0, -20);
            break;
          case 3:
            state.camera.position.lerp(vec.set(6, 1, 8), 0.1);
            state.camera.lookAt(0, 0, -5);
            break;
        }
        break;
      case 2:
        setSolarScenePos([0, 0, 0]);
        setTruckScenePos([3, -100, 0]);
        setBoatScenePos([0, -100, 0]);

        switch (activeIndex) {
          case 0:
            state.camera.position.lerp(vec.set(8, 2, 12), 0.1);
            state.camera.lookAt(0, 2, 0);
            break;
          case 1:
            state.camera.position.lerp(vec.set(8, 2, 12), 0.1);
            state.camera.lookAt(0, 2, 0);
            break;
          case 2:
            state.camera.position.lerp(vec.set(-5, 3, 7), 0.1);
            state.camera.lookAt(0, 3, 0);
            break;
          case 3:
            state.camera.position.lerp(vec.set(0, 3, 10), 0.1);
            state.camera.lookAt(0, 3, 0);
            break;
        }
        break;
    }
  });

  return (
    <Fragment>
      {/* {controls.perfMonitor && <Perf position={'top-left'} />} */}
      <OrbitControls target={[0, 0.4, 0]} />
      <Environment files={SolarHDR} background backgroundBlurriness={0.5} />
      {/* <ambientLight intensity={0.1} /> */}
      {/* <ContactShadows scale={70} opacity={0.8} /> */}

      {activeScene === 0 && (
        <>
          <Truck position={[3, 0, 0]} />
          <TruckGround position={[3, 0, 0]} />
        </>
      )}
      {activeScene === 1 && (
        <>
          <Float speed={2} floatingRange={[-0.2, -0.2]} floatIntensity={0.1} rotationIntensity={0.35} position={[3, 1.1, 5]}>
            <Tugboat />
          </Float>
          <WaterSurfaceComplex
            dimensions={2048}
            position={boatScenePos}
            width={controls.planeSize.width}
            length={controls.planeSize.length}
            flowSpeed={0.02}
            flowDirection={controls.flowDirection}
            reflectivity={controls.reflectivity}
            scale={4}
            color={controls.color}
          />
        </>
      )}
      {activeScene === 2 && (
        <>
          <Solar position={[0, 0, 0]} />
          <SolarGround position={[0, 0, 0]} scale={0.2} />
        </>
      )}
    </Fragment>
  );
};

export default App;
