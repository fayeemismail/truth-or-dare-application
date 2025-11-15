import { useState } from 'react';
import Button from './Layout/Button';
import { Home, X } from 'lucide-react';

const NameEntry = ({ players, onAddPlayer, onRemovePlayer, onStartGame, onClear, onHome }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && !players.find((player) => player.name.toLowerCase() === name.toLowerCase())) {
      onAddPlayer(name.trim());
      setName('');
    }
  };

  const handleStartGame = () => {
    if (players.length >= 2) {
      onStartGame();
    } else {
      alert('Need at least 2 players to start the game!');
    }
  };

  return (
    <div className="min-h-screen bg-royal-dark flex items-center justify-center p-4">
      <div className="bg-royal-mid rounded-2xl p-8 w-full max-w-md shadow-2xl border border-royal-border animate-bounce-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-royal-light mb-3">Truth or Dare</h1>
          <p className="text-royal-muted">Add players to start the game</p>
        </div>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter player name"
              className="flex-1 px-4 py-3 bg-royal-dark text-royal-light rounded-lg border border-royal-border focus:outline-none focus:ring-2 focus:ring-royal-accent focus:border-transparent placeholder-royal-muted"
              maxLength={20}
            />
            <Button type="submit" variant="primary" className="bg-[#206283] text-[#dcd5d5]">
              Add
            </Button>
          </div>
        </form>

        {players.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-royal-muted mb-3">Players ({players.length})</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin">
              {players.map((player, index) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-3 bg-[#447f3209] rounded-lg border border-[#d5cece] group hover:border-royal-muted transition-colors"
                >
                  <span className="text-royal-light font-medium">
                    {index + 1}. {player.name}
                  </span>
                  <button
                    onClick={() => onRemovePlayer(player.id)}
                    className="text-royal-muted hover:text-royal-light opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded hover:bg-royal-mid"
                    title="Remove player"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4 flex-wrap justify-center">
          <Button
            onClick={handleStartGame}
            disabled={players.length < 2}
            variant="secondary"
            className="w-full text-lg py-4 royal-button-secondary "
          >
            Start Game ({players.length}/2+)
          </Button>
          <Button
            onClick={onClear}
            variant="primary"
            className="w-full text-lg py-4 bg-[#c60f0fb1] text-white"
          >
            Clear
          </Button>
          <Button
            onClick={onHome}
            variant="transparent"
            className="text-royal-light border border-royal-light text-sm py-2 px-4 rounded-lg bg-transparent hover:bg-royal-mid hover:border-royal-accent transition-colors"
          >
            <Home size={14} className="inline-block mr-1" /> Home
          </Button>
        </div>

        {players.length === 1 && (
          <p className="text-royal-accent text-center mt-4 text-sm">
            Add at least one more player to start!
          </p>
        )}
      </div>
    </div>
  );
};

export default NameEntry;