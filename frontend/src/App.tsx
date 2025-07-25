import './App.css';
import ApiPage from './components/ApiPage';
import NavBar from './components/NavBar';
import NewApiPrompt from './components/NewApiPrompt';
import SideBar from './components/SideBar';
import { useAppContext, Popup } from './hooks/useAppContext';
import { ToastContainer } from 'react-toastify';

function App() {
  const { currentPopup, selectedApi } = useAppContext();

  return (
    <>
      <NavBar />
      <div id="content">
        <SideBar />
        {selectedApi && <ApiPage />}
      </div>
      {currentPopup == Popup.NEW_API && <NewApiPrompt />}
      <ToastContainer />
    </>
  );
}

export default App;