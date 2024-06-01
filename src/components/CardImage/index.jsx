import "./styles/CardImage.css";

function CardImage({ images, pending }) {
  const classPending = pending ? " --pending" : "";

  return (
    <section className={`card-image${classPending}`}>
      {images.map((src, i) => (
        <img src={src} alt="_" key={i} className="card-image__image" />
      ))}
    </section>
  );
}

export default CardImage;
