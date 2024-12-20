import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Pokedex = ({ search }) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [page, setPage] = useState(1);
  const [lastSearch, setLastSearch] = useState("");
  const observer = useRef();

  const pageSize = 20;

  useEffect(() => {
    console.log("search", search);
    getPokemons(page, pageSize, "number", { name: search });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const getPokemons = async (
    page = 1,
    pageSize = 20,
    orderBy = "number",
    q = { name: "" }
  ) => {
    let query =
      "https://api.pokemontcg.io/v2/cards?page=" +
      page +
      "&pageSize=" +
      pageSize +
      "&orderBy=" +
      orderBy;

    try {
      if (q.name) {
        query += `&q=${q.name ? `name:${q.name}*` : ""}`;
      }
      console.log(query);
      setLoading(true);
      const res = await axios.get(query);
      setLoading(false);
      setPokemons((prev) =>
        lastSearch !== q.name ? res.data.data : [...prev, ...res.data.data]
      );
      setLastSearch(q.name);
      setIsLastPage(res.data.data.length < pageSize);
    } catch (error) {
      console.log(error);
    }
    return [];
  };

  const lastElementRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLastPage) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: "20px 0px 20px 0px",
        gap: "20px",
      }}
    >
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          zIndex: "-1",
          top: "0",
          backgroundImage: `url('/imgs/background.png')`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          WebkitFilter: "blur(6px)",
          filter: "blur(6px)",
          transform: "scale(1.05)",
        }}
      ></div>
      {pokemons.length > 0 ? (
        <div
          style={{
            display: "grid",
            width: "calc(267px * 5)",
            gridTemplateColumns: "repeat(5, 1fr)",
            gridTemplateRows: "repeat(4, auto)",
            gap: "10px",
          }}
        >
          {pokemons.map((pokemon, index) => (
            <div
              key={index}
              ref={index === pokemons.length - 1 ? lastElementRef : null}
              style={{
                width: "267px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  width: "fit-content",
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(15px)",
                  padding: "10px",
                  border: "1px solid var(--border-color)",
                  borderRadius: "15px",
                }}
              >
                <figure
                  style={{
                    margin: "0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <figcaption
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {pokemon.name}
                  </figcaption>
                  <div
                    id="card"
                    style={{
                      backgroundImage: `url(${pokemon.images.small})`,
                      width: "245px",
                      height: "342px",
                    }}
                  ></div>
                </figure>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No Pokemons</p>
      )}

      {loading && (
        <span style={{ color: "white" }}>
          <p>Loading...</p>
        </span>
      )}
    </div>
  );
};

export default Pokedex;
