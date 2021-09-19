import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [pokemons, setPokemons] = useState();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const offset = (page - 1) * 10;
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
      .then((resp) => resp.json())
      .then((result) => {
        setPokemons(result.results);
        setLoading(false);
      });
  }, [page]);
  return (
    <div className='App'>
      <div className='container'>
        {pokemons ? (
          pokemons.map((v, i) => (
            <div className='pokemon button'>
              <p>{v.name}</p>
            </div>
          ))
        ) : (
          <p>No pokemon</p>
        )}
      </div>
      <div className='pagination'>
        <button
          disabled={page === 1 || loading}
          className='button'
          onClick={() => (page === 1 ? 1 : setPage(page - 1))}
        >
          Prev
        </button>
        <button
          disabled={loading}
          className='button'
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
      <p className='page-number'>Page {page}</p>
    </div>
  );
}

export default App;
