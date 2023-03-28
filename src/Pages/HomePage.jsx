import Axios from "axios";
import React, { useState } from "react";

function HomePage() {
  const [pokemonName, setPokemonName] = useState("snorlax");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  const SrcPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response) => {
        setPokemon({
          name: pokemonName,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
        });
        setPokemonChosen(true);
        console.log(response);
      }
    );
  };

  return (
    <div className="HomePage">
      <div className="PokemonSrc">
        <h3>Pokemon's Stats</h3>
        <div className="search-box">
          <input
            placeholder="Search your pokemon here!"
            className="input-box"
            type="text"
            onChange={(event) => {
              setPokemonName(event.target.value);
            }}
          />
          <button className="src-btn" onClick={SrcPokemon}>
            Search
          </button>
        </div>
      </div>
      <div className="PokemonInfo">
        {!pokemonChosen ? (
          <h1>Please choose your pokemon.</h1>
        ) : (
          <>
            <h1>{pokemonName}</h1>
            <img src={pokemon.img} />
            <h3>Species :{pokemon.species}</h3>
            <h3>Type :{pokemon.type}</h3>
            <h3>HP :{pokemon.hp}</h3>
            <h3>Attack :{pokemon.attack}</h3>
            <h3>Defense :{pokemon.defense}</h3>
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
