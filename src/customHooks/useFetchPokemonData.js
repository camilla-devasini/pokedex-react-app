import { useState } from "react";

function useFetchPokemonData() {
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchHandler = async (searchInput) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchInput}`
      );

      if (response.status !== 200) {
        alert("Pokemon not found, please try again");
      } else {
        const json = await response.json();
        console.log(json);
        setPokemonData(json);
      }
    } catch (error) {
      setError(new Error("Error occurred"));
    } finally {
      setLoading(false);
    }
  };
  return {
    pokemonData,
    loading,
    error,
    onsearch: searchHandler,
  };
}
export default useFetchPokemonData;
