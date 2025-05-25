import React from 'react';
import LoveHero from '../components/LoveHero';
import LoveProductsPage from '../components/LoveProductsPage';

const HomePage = ({ setCurrentView }) => {
  return (
    <>
      <LoveHero setCurrentView={setCurrentView} />
      <LoveProductsPage isHomePage />
    </>
  );
};

export default HomePage;