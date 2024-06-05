import formatDate from "../../helpers/formatDate";
import { Icon } from "@iconify/react";
import CardImage from "../CardImage";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./styles/Card.css";

function Card({ data }) {
  const { thumbnail, name, date, link, site } = data;
  const { theme } = useContext(ThemeContext);

  return (
    <section className="card">
      <CardImage images={thumbnail} />
      <div className="card__info">
        <h3 className={`card__info__name c-${theme}`}>
          {name}
          <Icon
            icon="material-symbols:verified"
            className="card__info__name__verified"
          />
        </h3>
        <span className="card__info__date">
          <Icon icon="fluent:calendar-date-28-regular" className={`c-${theme}`} />
          <span>{formatDate(date)}</span>
        </span>
        <span className="card__info__site">{site}</span>
        <a
          className="card__info__link"
          rel="noreferrer"
          target="_blank"
          href={link}
        >
          Acessar
          <Icon icon="simple-icons:mega" />
        </a>
      </div>
    </section>
  );
}

export default Card;
