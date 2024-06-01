import formatDate from "../../helpers/formatDate";
import { Icon } from "@iconify/react";
import CardImage from "../CardImage";
import "./styles/Card.css";

function Card({ data }) {
  const { thumbnail, name, date, link, site } = data;

  const iconColor = {
    privacy: "#fe754f",
    onlyfans: "var(--accent)",
  };

  return (
    <section className="card">
      {/* <div className="card__img">
        <div className="bg-blur" style={{ backgroundImage: `url("${thumbnail}")` }}></div>
        <img className="card__thumbnail" src={thumbnail} alt={name} />
      </div> */}
      <CardImage images={thumbnail} />
      <div className="card__info">
        <h3 className="card__info__name">{name}</h3>
        <span className="card__info__date">
          <Icon icon="fluent:calendar-date-28-regular" />
          <span>{formatDate(date)}</span>
        </span>
        <span style={{ color: iconColor[site] }} className="card__info__site">
          {site}
        </span>
        <a
          className="card__info__link"
          rel="noreferrer" 
          target="_blank"
          href={link}
          style={{ backgroundColor: iconColor[site] }}
        >
          Acessar
          <Icon icon="simple-icons:mega" />
        </a>
      </div>
    </section>
  );
}

export default Card;
