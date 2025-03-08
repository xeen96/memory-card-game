import React from "react";
interface CardsGeneratorProps {
  items: string[]; 
}
const CardsGenerator: React.FC<CardsGeneratorProps> = ({ items }) => {
  const [resetKey, setResetKey] = React.useState(0);
  const [selected, setSelected] = React.useState<number[]>([]);
  const [matched, setMatched] = React.useState<number[]>([]);

  const shuffled = React.useMemo(() => shuffle<string>([...items, ...items]), [items, resetKey]);

  const resetGame = () => {
    setSelected([]);
    setMatched([]);
    setResetKey((prev) => prev + 1);
  };


  const handleClick = (index: number) => {
    if (selected.length < 2 && !selected.includes(index) && !matched.includes(index)) {
      setSelected([...selected, index])
    }
  }


  React.useEffect(() => {
    if (selected.length === 2) {
      const [first, second] = selected;
      if (shuffled[first] === shuffled[second]) {
        setMatched([...matched, first, second]);
      }
      setTimeout(() => setSelected([]), 400);
    }
  }, [selected, shuffled]);

  React.useEffect(() => {
    if (matched.length === 12) {
      console.log("Game Over! Restarting...");
      setTimeout(() => resetGame(), 2000); 
  }
  }), [matched];
  
  return (
    <div className="content">
      {shuffled.map((imageUrl, index) => (
        <div 
          key={index} 
          className={`card ${selected.includes(index) || matched.includes(index) ? 'opened' : ''}`}
          onClick={() => handleClick(index)}>

          <img
            src={imageUrl}
            alt={`image ${imageUrl.slice(-5)}`}
            className="image"
          />
        </div>
      ))}
    </div>
  );
};



function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default CardsGenerator;