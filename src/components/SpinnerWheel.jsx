import { useState, useEffect } from 'react';
import Button from './Layout/Button';
import { Check, Home, Shuffle } from 'lucide-react';

const SpinnerWheel = ({ players, onSelectPlayer, onHome }) => {
  const [isShuffling, setIsShuffling] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [shuffledPlayers, setShuffledPlayers] = useState([]);

  useEffect(() => {
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    setShuffledPlayers(shuffled);
    setSelectedPlayer(null);
  }, [players]);

  const shuffleCards = () => {
    if (players.length === 0 || isShuffling) return;

    setIsShuffling(true);
    setSelectedPlayer(null);

    const newShuffled = [...players].sort(() => Math.random() - 0.5);
    setShuffledPlayers(newShuffled);

    let shuffleCount = 0;
    const maxShuffles = 10;

    const shuffleInterval = setInterval(() => {
      const tempShuffled = [...newShuffled].sort(() => Math.random() - 0.5);
      setShuffledPlayers(tempShuffled);

      shuffleCount++;
      if (shuffleCount >= maxShuffles) {
        clearInterval(shuffleInterval);

        setTimeout(() => {
          const finalShuffled = [...newShuffled].sort(() => Math.random() - 0.5);
          setShuffledPlayers(finalShuffled);

          setTimeout(() => {
            setSelectedPlayer(finalShuffled[0]);
            setIsShuffling(false);
          }, 500);
        }, 200);
      }
    }, 150);
  };

  const shuffleAgain = () => {
    if (players.length === 0 || isShuffling) return;

    setIsShuffling(true);
    setSelectedPlayer(null);

    const newShuffled = [...players].sort(() => Math.random() - 0.5);

    let shuffleCount = 0;
    const maxShuffles = 5;

    const shuffleInterval = setInterval(() => {
      const tempShuffled = [...newShuffled].sort(() => Math.random() - 0.5);
      setShuffledPlayers(tempShuffled);

      shuffleCount++;
      if (shuffleCount >= maxShuffles) {
        clearInterval(shuffleInterval);

        setTimeout(() => {
          const finalShuffled = [...newShuffled].sort(() => Math.random() - 0.5);
          setShuffledPlayers(finalShuffled);

          setTimeout(() => {
            setSelectedPlayer(finalShuffled[0]);
            setIsShuffling(false);
          }, 300);
        }, 100);
      }
    }, 120);
  };

  const handleCardClick = () => {
    // If shuffling, do nothing
    if (isShuffling) return;
    
    // If we have a selected player, confirm the selection
    if (selectedPlayer) {
      handleConfirmSelection();
    } 
    // Otherwise, shuffle the cards
    else {
      shuffleCards();
    }
  };

  const handleConfirmSelection = () => {
    if (selectedPlayer) {
      onSelectPlayer(selectedPlayer);
    }
  };

  if (players.length === 1) {
    return (
      <div className="min-h-screen bg-royal-dark flex items-center justify-center p-4">
        <div className="bg-royal-mid rounded-2xl p-6 w-full max-w-md text-center animate-bounce-in border border-royal-border">
          <h2 className="text-2xl md:text-3xl font-bold text-royal-light mb-4">Only One Player Left</h2>
          <div className="bg-royal-dark text-royal-light p-4 md:p-6 rounded-lg mb-6 border border-royal-border">
            <p className="text-xl md:text-2xl font-bold">{players[0].name}</p>
            <p className="text-base md:text-lg mt-2">It's your turn</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => onSelectPlayer(players[0])}
              variant="secondary"
              className="w-full text-base md:text-lg py-3 royal-button-secondary"
            >
              Continue to Truth or Dare
            </Button>
            <Button
              onClick={onHome}
              variant="transparent"
              className="w-full sm:w-auto text-royal-light border border-royal-light text-sm py-2 px-4 rounded-lg bg-transparent hover:bg-royal-mid hover:border-royal-accent transition-colors"
            >
              <Home size={14} className="inline-block mr-1" /> Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (players.length === 0) {
    return (
      <div className="min-h-screen bg-royal-dark flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-royal-light mb-4">No players left</h2>
          <Button
            onClick={onHome}
            variant="transparent"
            className="text-royal-light border border-royal-light text-sm py-2 px-4 rounded-lg bg-transparent hover:bg-royal-mid hover:border-royal-accent transition-colors"
          >
            <Home size={14} className="inline-block mr-1" /> Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-royal-dark flex flex-col items-center justify-center p-4 py-8">
      {/* Header - Smaller on mobile */}
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-royal-light mb-2">Shuffle Cards</h2>
        <p className="text-royal-muted text-sm md:text-base">
          {selectedPlayer ? 'Click the card or button to confirm' : 'Click the deck or button to shuffle'}
        </p>
      </div>

      {/* Card Stack - Responsive sizing */}
      <div className="relative mb-6 md:mb-8 flex flex-col items-center">
        <div 
          className="relative w-56 h-72 md:w-64 md:h-80 cursor-pointer" 
          onClick={handleCardClick}
        >
          {shuffledPlayers.slice(0, Math.min(5, shuffledPlayers.length)).map((player, index) => (
            <div
              key={`card-${player.id}-${index}`}
              className={`absolute w-full h-full rounded-2xl border-2 border-slate-600 transition-all duration-300 ${
                isShuffling ? 'animate-pulse' : ''
              }`}
              style={{
                transform: `translate(${index * 3}px, ${index * 3}px) rotate(${index * 2}deg)`,
                zIndex: 10 - index,
                backgroundColor: '#1e293b',
              }}
            >
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                <div className="text-white text-lg font-bold opacity-60">?</div>
              </div>
            </div>
          ))}

          {/* Top Card */}
          <div
            className={`absolute w-full h-full rounded-2xl border-2 border-blue-400 shadow-2xl transition-all duration-500 ${
              selectedPlayer ? 'scale-105' : 'hover:scale-105'
            } ${isShuffling ? 'animate-bounce' : ''} ${
              selectedPlayer ? 'cursor-pointer hover:border-green-400' : ''
            }`}
            style={{
              zIndex: 20,
              backgroundColor: selectedPlayer ? '#334155' : '#1e293b',
            }}
          >
            {selectedPlayer ? (
              <div className="w-full h-full rounded-2xl flex flex-col items-center justify-center p-4 md:p-6 text-royal-light">
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">
                  <Check size={32} className="md:w-10 md:h-10" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-center mb-2">Selected</h3>
                <p className="text-2xl md:text-3xl font-extrabold text-center text-royal-accent drop-shadow-lg">
                  {selectedPlayer.name}
                </p>
                <div className="mt-3 md:mt-4 text-base md:text-lg opacity-80 text-center">
                  Click to confirm selection
                </div>
              </div>
            ) : (
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-600 to-slate-800 flex flex-col items-center justify-center p-4 md:p-6 text-royal-light">
                <div className="text-4xl md:text-5xl mb-3 md:mb-4">
                  <Shuffle size={28} className="md:w-8 md:h-8" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-center mb-2">Card Deck</h3>
                <p className="text-base md:text-lg text-center opacity-90">
                  {isShuffling ? 'Shuffling...' : 'Click to shuffle'}
                </p>
                <div className="mt-3 md:mt-4 text-sm opacity-70 text-center">
                  {players.length} cards in deck
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <p className="text-royal-muted text-xs md:text-sm mt-4 md:mt-6 text-center max-w-xs">
          {!isShuffling && !selectedPlayer ? 'Click the card deck or use the button below' : ''}
          {isShuffling ? 'Shuffling cards...' : ''}
          {selectedPlayer && !isShuffling ? 'Click the card or button to confirm selection' : ''}
        </p>
      </div>

      {/* Selection Result - Smaller on mobile */}
      {selectedPlayer && !isShuffling && (
        <div className="animate-bounce-in mb-4 md:mb-6 w-full max-w-xs md:max-w-md">
          <div className="bg-gradient-to-r from-royal-dark to-royal-mid text-royal-light px-4 md:px-8 py-4 md:py-6 rounded-2xl text-lg md:text-2xl font-bold shadow-lg border-2 border-royal-border text-center">
            {selectedPlayer.name} was selected
          </div>
        </div>
      )}

      {/* Action Buttons - Stack on mobile, row on larger screens */}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full max-w-xs md:max-w-md justify-center items-center">
        {!selectedPlayer ? (
          // Initial shuffle button
          <Button
            onClick={shuffleCards}
            disabled={isShuffling}
            variant="secondary"
            className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-3 royal-button-secondary"
          >
            {isShuffling ? (
              <div className="flex items-center gap-2 justify-center">
                <div className="w-4 h-4 border-2 border-royal-light border-t-transparent rounded-full animate-spin"></div>
                Shuffling...
              </div>
            ) : (
              'Shuffle Cards'
            )}
          </Button>
        ) : (
          // After selection buttons - Stack on mobile
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
            <Button
              onClick={shuffleAgain}
              disabled={isShuffling}
              variant="primary"
              className="w-full sm:w-auto text-base md:text-lg px-4 md:px-6 py-3 bg-[#1a647a] text-[#D6BD98] border border-[#D6BD98]"
            >
              {isShuffling ? (
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-4 h-4 border-2 border-royal-light border-t-transparent rounded-full animate-spin"></div>
                  Shuffling...
                </div>
              ) : (
                'Shuffle Again'
              )}
            </Button>
            <Button
              onClick={handleConfirmSelection}
              variant="secondary"
              className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-3 bg-[#447f32] text-white border border-[#D6BD98]"
            >
              Confirm Selection
            </Button>
          </div>
        )}
        
        {/* Home Button - Always visible */}
        <Button
          onClick={onHome}
          variant="transparent"
          className="w-full sm:w-auto text-royal-light border border-royal-light text-sm py-2 px-4 rounded-lg bg-transparent hover:bg-royal-mid hover:border-royal-accent transition-colors"
        >
          <Home size={14} className="inline-block mr-1" /> Home
        </Button>
      </div>

      {/* Player Count - Smaller text */}
      <div className="mt-6 md:mt-8 text-xs text-royal-muted text-center">
        {players.length} player{players.length !== 1 ? 's' : ''} remaining
      </div>
    </div>
  );
};

export default SpinnerWheel;