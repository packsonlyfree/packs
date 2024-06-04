import { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import Header from "../../components/Header";
import { QueryContext } from "../../context/QueryContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { formatNumericInput } from "../../helpers/formatNumericInput";
import { get, getByQuery, getPages } from "../../api/MOCK";
import Footer from "../../components/Footer";
import "./styles/Home.css";

function Home() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const page = params.get("page") ? Number(params.get("page")) : 1;
  const [inputPage, setInputPage] = useState(page);

  const { query } = useContext(QueryContext);

  const numberInputPage = Number(inputPage);

  const [items, setItems] = useState([]);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    const setup = async () => {
      let fetchedItems;
      try {
        if (query) {
          fetchedItems = await getByQuery(query);
        } else {
          fetchedItems = await get(page);
        }

        if (fetchedItems.error) {
          throw new Error("Network Error");
        }
        setItems(fetchedItems);
      } catch (error) {}

      const fetchedPages = await getPages();
      setPages(Number(fetchedPages));
      setInputPage(page);

      window.scrollTo({
        top: 0,
        behavior: "smooth", // ou 'auto' para rolar sem animação
      });
    };
    setup();
  }, [page, query]);

  const disabledPrev = page === 1;
  const disabledNext = page === pages;

  const handlePrevPage = (e) => {
    e.preventDefault();
    if (!disabledPrev) {
      navigate(`/?page=${page - 1}`);
      params.set("page", page - 1);
    }
  };

  const handleNextPage = (e) => {
    e.preventDefault();
    if (!disabledNext) {
      navigate(`/?page=${page + 1}`);
    }
  };

  const handleChangeInputPage = ({ target }) => {
    const { value } = target;
    const newValue = formatNumericInput(value);
    setInputPage(newValue);
  };

  const handleInputPage = (e) => {
    e.preventDefault();
    if (numberInputPage > 0 && numberInputPage <= pages) {
      navigate(`/?page=${numberInputPage}`);
    }
  };

  const emptyQuery = query && items.length === 0;

  return (
    <main className="home">
      <Header />
      <section className="home__welcome-section">
        <h1 className="home__welcome-section__title">
          Bem Vindo(a) ao OnlyFree
        </h1>
        <p className="home__welcome-section__slogan">
          Sua maior fonte de conteúdo adulto <del>barato</del> gratuito.
        </p>
        <ul className="home__welcome-section__list">
          <li className="home__welcome-section__list__item">
            <Icon icon="mdi:star-four-points" />
            <span>Packs atualizados diariamente</span>
          </li>
          <li className="home__welcome-section__list__item">
            <Icon icon="solar:high-quality-broken" />
            <span>Conteúdo de qualidade</span>
          </li>
          <li className="home__welcome-section__list__item">
            <Icon icon="mdi:coins" />
            <span>Gratuito para sempre</span>
          </li>
        </ul>
        <div className="home__welcome-section__links">
          <a
            href="https://t.me/+V6Kyta4xTeFmZGYx"
            target="_blank"
            rel="noreferrer"
            className="home__welcome-section__links__button"
          >
            <Icon icon="mingcute:telegram-line" />
          </a>
          <a
            href="https://x.com/PacksOnlyFree"
            target="_blank"
            rel="noreferrer"
            className="home__welcome-section__links__button"
          >
            <Icon icon="ri:twitter-x-line" />
          </a>
        </div>
      </section>
      <section className="home__cards">
        {items.map((data, i) => {
          return <Card data={data} key={i} />;
        })}
        {emptyQuery && <p className="home__cards__empty-query">Nenhum conteúdo correspondente</p>}
      </section>
      {!query && (
        <div className="home__pages">
          <button
            className="home__pages__page-btn-arrow"
            onClick={handlePrevPage}
            disabled={disabledPrev}
          >
            <Icon icon="ic:round-play-arrow" rotate={2} />
          </button>
          <form onSubmit={handleInputPage}>
            <input
              type="text"
              onChange={handleChangeInputPage}
              value={inputPage}
            />
          </form>
          <div></div>
          <span>{pages}</span>
          <button
            className="home__pages__page-btn-arrow"
            onClick={handleNextPage}
            disabled={disabledNext}
          >
            <Icon icon="ic:round-play-arrow" />
          </button>
        </div>
      )}
      <Footer />
    </main>
  );
}

export default Home;
