import ShowImage from "./components/image/ShowImage";

const images = [
  'https://picsum.photos/400/300?random=1',
  'https://picsum.photos/400/300?random=2',
  'https://picsum.photos/400/300?random=3',
];

const Image = () => {
  return (
    <div className="container">
      {images.map((image, idx) =>
        <ShowImage img={image} key={idx} />)}
    </div>
  );
};

export default Image;