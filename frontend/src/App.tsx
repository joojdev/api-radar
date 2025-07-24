import './App.css';
import NavBar from './components/NavBar';
import NewApiPrompt from './components/NewApiPrompt';
import SideBar from './components/SideBar';
import { useAppContext, Popup } from './hooks/useAppContext';

function App() {
  const { currentPopup } = useAppContext();

  return (
    <>
      <NavBar />
      <div id="content">
        <SideBar />
      </div>
      {currentPopup == Popup.NEW_API && <NewApiPrompt />}
    </>
  );
}

export default App;