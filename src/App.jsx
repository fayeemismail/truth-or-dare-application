import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import NameEntry from './components/NameEntry';
import SpinnerWheel from './components/SpinnerWheel';
import TruthDareSelection from './components/TruthDareSelection';
import TaskDisplay from './components/TaskDisplay';
import { Home } from 'lucide-react';
import Button from './components/Layout/Button';

function App() {
  const [players, setPlayers] = useLocalStorage('truthOrDarePlayers', []);
  const [currentPlayer, setCurrentPlayer] = useLocalStorage('truthOrDareCurrentPlayer', null);
  const [currentChoice, setCurrentChoice] = useLocalStorage('truthOrDareCurrentChoice', null);
  const [usedQuestions, setUsedQuestions] = useLocalStorage('truthOrDareUsedQuestions', []);
  const [currentPage, setCurrentPage] = useLocalStorage('truthOrDareCurrentPage', 'nameEntry');

  const addPlayer = (name) => {
    const newPlayer = {
      id: Date.now().toString(),
      name,
    };
    setPlayers([...players, newPlayer]);
  };

  const removePlayer = (id) => {
    setPlayers(players.filter((player) => player.id !== id));
    if (currentPlayer?.id === id) {
      setCurrentPlayer(null);
    }
  };

  const handleStartGame = () => {
    setCurrentPage('spinner');
  };

  const handleSelectPlayer = (player) => {
    setCurrentPlayer(player);
    setCurrentPage('selection');
  };

  const handleChoiceSelect = (choice) => {
    setCurrentChoice(choice);
    setCurrentPage('task');
  };

  const handleTaskComplete = (task) => {
    setUsedQuestions([...usedQuestions, task]);
    const updatedPlayers = players.filter((player) => player.id !== currentPlayer.id);
    setPlayers(updatedPlayers);
    setCurrentPlayer(null);
    setCurrentChoice(null);

    if (updatedPlayers.length > 0) {
      setCurrentPage('spinner');
    } else {
      setCurrentPage('gameOver');
    }
  };

  const handleHome = () => {
    setCurrentPage('nameEntry');
  };

  const handleClear = () => {
    window.localStorage.removeItem('truthOrDarePlayers');
    window.localStorage.removeItem('truthOrDareCurrentPlayer');
    window.localStorage.removeItem('truthOrDareCurrentChoice');
    window.localStorage.removeItem('truthOrDareUsedQuestions');
    window.localStorage.removeItem('truthOrDareCurrentPage');
    setPlayers([]);
    setCurrentPlayer(null);
    setCurrentChoice(null);
    setUsedQuestions([]);
    setCurrentPage('nameEntry');
  };

  const handleResetGame = () => {
    handleClear(); // Clear local storage and reset state
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'nameEntry':
        return (
          <NameEntry
            players={players}
            onAddPlayer={addPlayer}
            onRemovePlayer={removePlayer}
            onStartGame={handleStartGame}
            onClear={handleClear}
            onHome={handleHome}
          />
        );
      case 'spinner':
        return <SpinnerWheel players={players} onSelectPlayer={handleSelectPlayer} onHome={handleHome} />;
      case 'selection':
        return (
          <TruthDareSelection selectedPlayer={currentPlayer} onSelect={handleChoiceSelect} onHome={handleHome} />
        );
      case 'task':
        return (
          <TaskDisplay
            selectedPlayer={currentPlayer}
            choice={currentChoice}
            onComplete={handleTaskComplete}
            onHome={handleHome}
            usedQuestions={usedQuestions}
          />
        );
      case 'gameOver':
        return (
          <div className="min-h-screen bg-dark-primary flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-md text-center animate-bounce-in">
              <h2 className="text-4xl font-bold text-white mb-4">Game Over</h2>
              <p className="text-gray-400 text-lg mb-6">All players have completed their turns</p>
              <Button onClick={handleResetGame} variant="primary" className="w-full text-lg py-4">
                Start New Game
              </Button>
            </div>
          </div>
        );
      default:
        return (
          <NameEntry
            players={players}
            onAddPlayer={addPlayer}
            onRemovePlayer={removePlayer}
            onStartGame={handleStartGame}
            onClear={handleClear}
            onHome={handleHome}
          />
        );
    }
  };

  return renderCurrentPage();
}

export default App;