import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { GameProvider } from './context/GameContext';
import HomeScreen from './screens/HomeScreen';
import HeroSelectScreen from './screens/HeroSelectScreen';
import LevelSelectScreen from './screens/LevelSelectScreen';
import StoryScreen from './screens/StoryScreen';
import GameScreen from './screens/GameScreen';
import ResultsScreen from './screens/ResultsScreen';
import EvidenceNotebook from './screens/EvidenceNotebook';
import ProfileScreen from './screens/ProfileScreen';
import AchievementsScreen from './screens/AchievementsScreen';
import './styles/App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [gameState, setGameState] = useState({
    selectedHero: null,
    selectedLevel: null,
    levelResults: null
  });

  const handleNavigate = (screen, state = {}) => {
    setGameState(prev => ({ ...prev, ...state }));
    setCurrentScreen(screen);
  };

  return (
    <LanguageProvider>
      <GameProvider>
        <div className="app-container">
          {currentScreen === 'home' && (
            <HomeScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === 'heroSelect' && (
            <HeroSelectScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === 'levelSelect' && (
            <LevelSelectScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === 'story' && (
            <StoryScreen onNavigate={handleNavigate} selectedLevel={gameState.selectedLevel} />
          )}
          {currentScreen === 'game' && (
            <GameScreen onNavigate={handleNavigate} selectedLevel={gameState.selectedLevel} selectedHero={gameState.selectedHero} />
          )}
          {currentScreen === 'results' && (
            <ResultsScreen onNavigate={handleNavigate} levelResults={gameState.levelResults} />
          )}
          {currentScreen === 'evidence' && (
            <EvidenceNotebook onNavigate={handleNavigate} />
          )}
          {currentScreen === 'profile' && (
            <ProfileScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === 'achievements' && (
            <AchievementsScreen onNavigate={handleNavigate} />
          )}
        </div>
      </GameProvider>
    </LanguageProvider>
  );
}

export default App;