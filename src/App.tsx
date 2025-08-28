import React from 'react';
import GoodList from './components/shop/GoodList';
import Cart from './components/shop/Cart';
import Wallet from './components/shop/Wallet';
import { ShopProvider } from './features/shop';

function App() {
  // ts 자리
  const page: React.CSSProperties = {
    maxWidth: 960,
    margin: '0 auto',
    padding: 24,
    background: '#f5f5f5',
  };
  const grid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '320px 1fr',
    gap: 20,
    alignItems: 'start',
  };
  // tsx 자리
  return (
    <div style={page}>
      <h1>🏡 나의 가게</h1>
      <br />
      <ShopProvider>
        <div style={grid}>
          <div>
            <GoodList />
          </div>
          <div>
            <Cart />
            <Wallet />
          </div>
        </div>
      </ShopProvider>
    </div>
  );
}

export default App;
