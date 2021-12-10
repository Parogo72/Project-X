import { BufferGeometry, Vector3 } from 'three';

function Orbit({ xRadius = 1, zRadius = 1, position }) {
    const points = [];
    for (let index = 0; index < 128; index++) {
      const angle = (index / 128) * 2 * Math.PI;
      const x = xRadius * Math.cos(angle);
      const z = zRadius * Math.sin(angle);
      points.push(new Vector3(x, 0, z));
    }
    points.push(points[0]);
    const lineGeometry = new BufferGeometry().setFromPoints(points);
    return (
      <line geometry={lineGeometry} position={[position,0,0]}>
        <lineBasicMaterial attach="material" color="#BFBBDA" linewidth={10} />
      </line>
    );
  }

  export default Orbit;