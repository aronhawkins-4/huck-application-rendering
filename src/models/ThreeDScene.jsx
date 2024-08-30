import React, { Fragment, useRef, Suspense } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import { Stats, OrbitControls, Environment, ContactShadows, Float, Html, Loader } from '@react-three/drei';

import ClearSky from '../../public/syferfontein_1d_clear_puresky_1k copy.hdr';
import { Truck } from './Truck';
import { Tugboat } from './Tugboat';
import WaterSurfaceComplex from '../WaterSurface/WaterSurfaceComplex';
import { useControls, folder } from 'leva';
import { Perf } from 'r3f-perf';
import { Solar } from './Solar';
import { SolarGround } from './Solar_Ground';

export const ThreeDScene = () => {
  const ref = useRef();

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
    }),
  });

  useFrame((state, delta) => {
    // ref.current.rotation.y += 0.5 * delta;
  });

  return (
    <Fragment>
      {controls.perfMonitor && <Perf position={'top-left'} />}
      <OrbitControls target={[0, 0.4, 0]} />
      <Environment files={ClearSky} background backgroundBlurriness={0.5} />
      <ambientLight intensity={0.2} />
      {/* <ContactShadows scale={70} opacity={0.8} /> */}

      <Solar />
      <SolarGround />
      {/* <Truck /> */}
      {/* <Float speed={2} floatingRange={[-0.2, -0.2]} floatIntensity={0.1} rotationIntensity={0.5}>
        <Tugboat />
      </Float>
      <WaterSurfaceComplex
        dimensions={2048}
        position={controls.position}
        width={controls.planeSize.width}
        length={controls.planeSize.length}
        flowSpeed={controls.flowSpeed}
        flowDirection={controls.flowDirection}
        reflectivity={controls.reflectivity}
        scale={controls.scale_complex}
      /> */}
    </Fragment>
  );
};
