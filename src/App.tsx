import React from 'react';
import { CgSandClock } from "react-icons/cg";

import './App.css';
import { DailyShop, LoadingShop } from './components';
import ShopContext from './context/shop/ShopContext';

function App() {

  const {
    daily,
    loading,
    remainingTime
  } = React.useContext(ShopContext);

  return (
    <div className={`flex flex-col items-center ${loading && 'overflow-hidden h-screen'}`}>
      <h1 className='flex-1 text-center font-extrabold text-6xl text-blue-500 bg-white w-full py-4'>TIENDA DE FORTNITE</h1>
      <h2 className='text-2xl'>Próximo cambio de tienda</h2>
      {loading ? <div className='flex-1 animate-pulse bg-gray-700 rounded-full w-60 py-4' /> : <h3 className='text-2xl'> <CgSandClock className='inline-block animate-spin-slow' />  {remainingTime}</h3>}
      <div className='flex flex-col items-center flex-1 p-5 gap-5 w-full'>
        {loading ? <LoadingShop /> : (
          <>
            <DailyShop data={daily} />
          </>
        )}
      </div>
    </div>
  )
}

export default App
