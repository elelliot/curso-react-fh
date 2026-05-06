import { mockGifs } from "./mock-data/gifs.mock";

export const GifsApp = () => {
  return (
    <>
      {/* Header */}
      <div className="content-center">
        <h1>Gif Search</h1>
        <p>Find and share the perfect GIF</p>
      </div>

      {/* Search */}
      <div className="search-container">
        <input type="text" placeholder="Find Gifs" />
        <button>Search</button>
      </div>

      {/* Previous Searches */}
      <div className="previous-searches">
        <h2>Previous Searches</h2>
        <ul className="previous-searches-list">
          <li>Cyberpunk</li>
          <li>Evangelion</li>
          <li>Digimon</li>
          <li>Pokemon</li>
        </ul>
      </div>

      {/* Gifs */}
      <div className="gifs-container">
        {mockGifs.map((gif) => (
          <div key={gif.id} className="gif-card">
            <img src={gif.url} alt={gif.title} />
            <h3>{gif.title}</h3>
            <p>
              {gif.width}x{gif.height} (1.5MB)
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
