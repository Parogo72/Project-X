import { useRef } from 'react';  
import { useFrame } from '@react-three/fiber';

function Light({ brightness, color }) {
  const mesh = useRef(null);

  useFrame(({camera}) => {
    mesh.current.position.x = camera.position.x;
    mesh.current.position.y = camera.position.y;
    mesh.current.position.z = camera.position.z;
  })
    return (
      <spotLight
        color={color}
        intensity={brightness}
        lookAt={[0, 0, 0]}
        penumbra={1}
        castShadow={true}
        angle={0.3}
        ref={mesh}
      />
    );
  }

export default Light;