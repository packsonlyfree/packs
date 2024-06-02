import "./styles/CardImage.css";

function CardImage({ images }) {
  return (
    <section className="card-image">
      {images.map((src, i) => (
        <img src={src} alt="_" key={i} className="card-image__image" />
      ))}
    </section>
  );
}

export default CardImage;
