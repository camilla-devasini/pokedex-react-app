import { useState, useEffect } from "react";
import useFetchPokemonData from "../customHooks/useFetchPokemonData";
import MainButton from "./MainButton";
import PageWrapper from "./PageWrapper";
import "./style/pokemonSearch.scss";
import pokeball from "./../assets/pokeball.png";

function PokemonSearch() {
  const [searchInput, setSearchInput] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const { pokemonData, loading, error, onsearch } = useFetchPokemonData();

  const searchHandler = () => {
    if (searchInput) {
      onsearch(searchInput.toLowerCase());
      setSearchInput("");
    }
    return;
  };
  //Richiamo i nomi di tutti i pokemon esistenti per formare una lista
  const searchAllPokemonNames = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=1000`
      );
      const json = await response.json();
      setPokemonList(json.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchAllPokemonNames();
  }, []);

  return (
    <PageWrapper>
      <div className="pokedex-container">
        <h1>Welcome to your Pokedex</h1>
        <div className="search-container">
          <input
            type="text"
            value={searchInput}
            onChange={(event) => setSearchInput(event.currentTarget.value)}
            placeholder="Type a Pokemon name"
          />
          <div className="pokemon-list">
            <ul>
              {searchInput === ""
                ? null
                : pokemonList
                    .filter((item) => item.name.includes(searchInput))
                    .map((item, index) => (
                      <li
                        onClick={(event) =>
                          setSearchInput(event.currentTarget.innerHTML)
                        }
                        key={index}
                      >
                        {item.name}
                      </li>
                    ))}
            </ul>
          </div>
          <MainButton onStartResearch={searchHandler}>
            <img src={pokeball} alt="pokeball"></img>
          </MainButton>
        </div>

        {loading && <p>Loading</p>}
        {error && <p>{error.message}</p>}

        <div className="pokemon-details-container">
          <div className="pokemon-details-subcontainer-title">
            {pokemonData && <h2>{pokemonData.name.toUpperCase()}</h2>}
            {pokemonData && (
              <div className="pokemon-img-wrapper">
                <img
                  className="pokemon-img"
                  src={
                    pokemonData.sprites.other["official-artwork"].front_default
                  }
                  alt="Colorfull representation of the selected Pokemon"
                ></img>
              </div>
            )}
          </div>

          <div className="pokemon-details-subcontainer-details">
            <div className="pokemon-details-subcontainer-abilities">
              {pokemonData && <h2>Abilities:</h2>}
              {pokemonData &&
                pokemonData.abilities.map((item, index) => (
                  <ul key={index}>
                    <li>{item.ability.name}</li>
                  </ul>
                ))}
            </div>
            <div className="pokemon-details-subcontainer-characteristics">
              {pokemonData && <h2>Weight (kg):</h2>}
              <p>{pokemonData && pokemonData.weight / 10}</p>
              {pokemonData && <h2>Height (m):</h2>}
              <p>{pokemonData && pokemonData.height / 10}</p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
export default PokemonSearch;
