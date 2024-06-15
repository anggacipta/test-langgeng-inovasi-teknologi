import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://pokeapi.co/api/v2/pokemon?limit=20',
      );
      console.log(result);
      const pokemonData = await Promise.all(
        result.data.results.map(async (pokemon) => {
          const pokemonDetail = await axios(pokemon.url);
          return pokemonDetail.data;
        })
      );

      setData(pokemonData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-center">Pokemon List</h1>
      <div className="d-flex justify-content-center flex-wrap">
        {data.map((item, index) => (
          <div className="card m-2" style={{width: '18rem'}} key={index}>
            <img src={item.sprites.front_default} className="card-img-top" alt={item.name} />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">{item.species.name}</p>
              <p className="card-text">Base exp: {item.base_experience}</p>
              <p className="card-text">Height: {item.height} dm</p>
              <p className="card-text">Types: 
                {item.types.map((type, typeIndex) => (
                  <span key={typeIndex}> {type.type.name}</span>
                ))}
              </p>
              <p className="card-text">Stats: 
                {item.stats.map((stat, statIndex) => (
                  <li className="list-group-item" key={statIndex}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;