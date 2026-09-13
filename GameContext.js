import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

const defaultGameState = {
  completedLevels: [],
  unlockedHeroes: ['conan', 'shinichi'],
  bestScores: {},
  bestTimes: {},
  collectedEvidence: [],
  achievements: [],
  selectedHero: 'conan',
  totalScore: 0
};

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState(() => {
    const saved = localStorage.getItem('gameState');
    return saved ? JSON.parse(saved) : defaultGameState;
  });

  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }, [gameState]);

  const completeLevel = (levelId, score, time) => {
    setGameState(prev => {
      const updated = { ...prev };
      if (!updated.completedLevels.includes(levelId)) {
        updated.completedLevels.push(levelId);
      }
      updated.bestScores[levelId] = Math.max(updated.bestScores[levelId] || 0, score);
      updated.bestTimes[levelId] = Math.min(updated.bestTimes[levelId] || Infinity, time);
      updated.totalScore += score;
      return updated;
    });
  };

  const unlockHero = (heroId) => {
    setGameState(prev => {
      if (!prev.unlockedHeroes.includes(heroId)) {
        return { ...prev, unlockedHeroes: [...prev.unlockedHeroes, heroId] };
      }
      return prev;
    });
  };

  const addEvidence = (evidenceId) => {
    setGameState(prev => {
      if (!prev.collectedEvidence.includes(evidenceId)) {
        return { ...prev, collectedEvidence: [...prev.collectedEvidence, evidenceId] };
      }
      return prev;
    });
  };

  const addAchievement = (achievementId) => {
    setGameState(prev => {
      if (!prev.achievements.includes(achievementId)) {
        return { ...prev, achievements: [...prev.achievements, achievementId] };
      }
      return prev;
    });
  };

  const setSelectedHero = (heroId) => {
    setGameState(prev => ({ ...prev, selectedHero: heroId }));
  };

  return (
    <GameContext.Provider value={{
      gameState,
      completeLevel,
      unlockHero,
      addEvidence,
      addAchievement,
      setSelectedHero
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};