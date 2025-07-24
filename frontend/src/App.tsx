import './App.css';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';

function App() {
  return (
    <>
      <NavBar />
      <div id="content">
        <SideBar />
      </div>
    </>
  );
}

export default App;