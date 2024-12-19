import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const observer = useRef();

  useEffect(() => {
    getPokemons(page);
  }, [page]);

  const getPokemons = async (page = 1, pageSize = 20, orderBy = "number") => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://api.pokemontcg.io/v2/cards?page=" +
          page +
          "&pageSize=" +
          pageSize +
          "&orderBy=" +
          orderBy
      );
      setLoading(false);
      setPokemons((prev) => [...prev, ...res.data.data]);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
    return [];
  };

  const lastElementRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
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
        padding: "20px 0px 0px 0px",
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
          id="pokedexGrid"
        >
          {pokemons.map((pokemon, index) => (
            <div
              id="cardContainer"
              key={index}
              ref={index === pokemons.length - 1 ? lastElementRef : null}
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
        <span style={{ color: "white", paddingBottom: "10px" }}>
          <p>Loading...</p>
        </span>
      )}
    </div>
  );
};

export default Pokedex;
