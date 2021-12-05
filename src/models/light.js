
function Light({ brightness, color }) {
    return (
      <spotLight
        color={color}
        intensity={brightness}
        position={[-10, 0, 0]}
        lookAt={[0, 0, 0]}
        penumbra={1}
        castShadow
        angle={0.3}
       
      />
    );
  }

export default Light;