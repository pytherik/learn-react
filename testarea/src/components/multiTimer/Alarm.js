import ring from '../../assets/sounds/fahrradklingel.mp3'

const Alarm = () => {
  const audio = new Audio(ring);
  audio.loop = true;

  return (
    <div>
      { audio.play() }

      <button onClick={() => {
        (audio.loop = false);
      }}>Pause</button>
    </div>
  );
};

export default Alarm;