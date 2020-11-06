import React from 'react';
import HomeComponent from '../components/HomeComponent';

const LandingPage = () => {
  return (
    <div data-testid='landing-page'>
      <HomeComponent message='Welcome to the home page of the App' />
    </div>
  );
};

export default LandingPage;
