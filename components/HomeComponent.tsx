import React from 'react';

interface Props {
  message: string;
}

const HomeComponent = (props: Props) => {
  const { message } = props;

  return (
    <div data-testid='home-div'>
      <p data-testid='home-message' className='text-red-500 font-semibold'>
        {message}
      </p>
    </div>
  );
};

export default HomeComponent;
