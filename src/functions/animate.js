export default function animate(callback) {
    function loop(time) {
      callback(time);
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }
  