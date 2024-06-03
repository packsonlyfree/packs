import { useContext } from "react";
import { QueryContext } from "../../context/QueryContext";
import logo from "../../assets/onlyfans-2.svg";
import { Icon } from "@iconify/react/dist/iconify.js";
import "./styles/Header.css";
import "./styles/Header-mobile.css";

function Header() {
  const { query, setQuery } = useContext(QueryContext);

  const onQueryChange = ({ target }) => {
    const { value } = target;
    setQuery(value);
  };

  const clearQuery = () => {
    setQuery("");
  };

  const backgroundColor = query ? "#ce4040" : "var(--accent)";

  return (
    <header className="header">
      <a href="/packs" className="header__logo">
        <img src={logo} alt="" className="header__logo__img" />
        <span className="header__logo__text">
          <span className="header__logo__text__only">Only</span>
          <span className="header__logo__text__free">Free</span>
        </span>
      </a>
      <div method="GET" className="header__search">
        <input
          type="text"
          name="search"
          id="search"
          value={query}
          onChange={onQueryChange}
          className="header__search__input"
          placeholder="Modelos, packs..."
        />
        <div className="header__search__search-icon" onClick={clearQuery} style={{ backgroundColor }}>
          {!query ? (
            <Icon
              icon="icon-park-outline:search"
              className="header__search__search-icon__icon"
              rotate={1}
            />
          ) : (
            <Icon
              icon="ic:sharp-close"
              className="header__search__search-icon__icon"
            />
          )}
        </div>
      </div>
      <div className="header__links">
        <a
          href="https://t.me/+V6Kyta4xTeFmZGYx"
          target="_blank"
          rel="noreferrer"
        >
          <Icon icon="mingcute:telegram-line" />
        </a>
      </div>
    </header>
  );
}

export default Header;
