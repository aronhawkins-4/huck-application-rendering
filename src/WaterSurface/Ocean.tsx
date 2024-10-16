import * as THREE from 'three';
import React, { Suspense, useRef, useMemo, useEffect } from 'react';
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import { Water } from 'three-stdlib';
import WaterNormalsFile from '../../public/water/waternormals.jpeg';

extend({ Water });

export function Ocean(props) {
  const ref = useRef();
  const gl = useThree((state) => state.gl);
  // const waterNormals = useLoader(THREE.TextureLoader, WaterNormalsFile);
  const waterNormals = useLoader(THREE.TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg');
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.SphereGeometry(990, 256, 256), []);
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(0, 150, 150),
      sunColor: 0x0b0029,
      // waterColor: 0x001e0f,
      // waterColor: 0xbedbe8,
      waterColor: 0x0064b5,
      // waterColor: 0xffffff,
      distortionScale: 3.7,
      fog: false,
      format: gl.encoding,
    }),
    [waterNormals]
  );
  useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta / 4));

  return (
    <mesh {...props} ref={props.refs} receiveShadow>
      <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} receiveShadow />
    </mesh>
  );
}

// import React, { useRef, useMemo } from 'react';
// import { extend, useThree, useLoader, useFrame } from '@react-three/fiber';
// import * as THREE from 'three';

// import { Water } from 'three/examples/jsm/objects/Water.js';

// extend({ Water });

// export function Ocean() {
//   const ref = useRef();
//   const gl = useThree((state) => state.gl);
//   const waterNormals = useLoader(THREE.TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg');

//   waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
//   const geom = useMemo(() => new THREE.PlaneGeometry(30000, 30000), []);
//   const config = useMemo(
//     () => ({
//       textureWidth: 512,
//       textureHeight: 512,
//       waterNormals,
//       sunDirection: new THREE.Vector3(),
//       sunColor: 0xeb8934,
//       waterColor: 0x0064b5,
//       distortionScale: 40,
//       fog: false,
//       format: gl.encoding,
//     }),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [waterNormals]
//   );
//   useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta));
//   return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} position={[0, 0, 0]} />;
// }
