import Button from './Layout/Button';
import { Home, Skull, Smile } from 'lucide-react';

const TruthDareSelection = ({ selectedPlayer, onSelect, onHome }) => {
  return (
    <div className="min-h-screen bg-royal-dark flex items-center justify-center p-4">
      <div className="bg-royal-mid rounded-2xl p-8 w-full max-w-md shadow-2xl border border-royal-border animate-bounce-in">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-royal-light mb-2">{selectedPlayer.name}</h2>
          <p className="text-royal-muted text-lg">Choose your fate</p>
        </div>

        <div className="grid gap-4 mb-6">
          <Button
            onClick={() => onSelect('truth')}
            variant="primary"
            className="text-xl py-6 flex justify-center gap-3 items-center bg-[#1299ae] text-white"
          >
            Truth
            <Smile size={29} />
          </Button>
          <Button
            onClick={() => onSelect('dare')}
            variant="secondary"
            className="text-xl py-6 flex justify-center items-center gap-3 bg-[#9b1111] text-white"
          >
            Dare
            <Skull size={29} />
          </Button>
        </div>

        <Button
          onClick={onHome}
          variant="transparent"
          className="w-full text-royal-light border border-royal-light text-sm py-2 px-4 rounded-lg bg-transparent hover:bg-royal-mid hover:border-royal-accent transition-colors"
        >
          <Home size={14} className="inline-block mr-1" /> Home
        </Button>
      </div>
    </div>
  );
};

export default TruthDareSelection;