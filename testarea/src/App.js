import Image from "./components/Image";
const images = [
  'https://picsum.photos/400/300?random=1',
  'https://picsum.photos/400/300?random=2',
  'https://picsum.photos/400/300?random=3',
];

const App = () => {
  return (
    <div className="container">
      {images.map((image, idx) =>  <Image img={image} key={idx} />)}
    </div>
  );
};

export default App;
