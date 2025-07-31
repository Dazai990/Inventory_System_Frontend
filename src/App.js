// import logo from './logo.svg';
import './App.css';
// import ProductAdd from './components/ProductAdd';
// import ProductView from './components/ProductView';
import ProductAdminRouter from './router/ProductAdminRouter';
// import ProductView from './components/ProductView';

function App() {
  return (
    <div className="App">
      <div>
      <h1 style={{fontFamily:'monospace'}} className='text-white rounded fw-bold dual-tone-box  '> Inventory System </h1>
      </div>
      <ProductAdminRouter/>
    </div>
  );
}

export default App;
