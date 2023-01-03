import { useState, useEffect } from "react";
import useFetchPokemonData from "./../hooks/useFetchPokemonData";

function PokemonSearch() {
  const [searchInput, setSearchInput] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const { pokemon, loading, error, onsearch } = useFetchPokemonData();

  const searchHandler = () => {
    onsearch(searchInput.toLowerCase());
  };

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
    <div>
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
                .map((item) => <li key={item.name}>{item.name}</li>)}
        </ul>
      </div>
      <button onClick={searchHandler}>Start searching!</button>

      {loading && <p>Loading</p>}
      {error && <p>{error.message}</p>}

      {pokemon && <h1>{pokemon.name.toUpperCase()}</h1>}

      <div>
        {pokemon && <h2>Abilities:</h2>}
        {pokemon.abilities.map((item, index) => (
          <ul>
            <li key={index}>{item.ability.name}</li>
          </ul>
        ))}

        {pokemon && <h2>Weight in kilograms:</h2>}
        <p>{pokemon.weight / 10}</p>
        {pokemon && <h2>Height in meters:</h2>}
        <p>{pokemon.height / 10}</p>
      </div>

      {pokemon && (
        <div>
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt="Colorfull representation of the selected Pokemon"
          ></img>
        </div>
      )}
    </div>
  );
}
export default PokemonSearch;
