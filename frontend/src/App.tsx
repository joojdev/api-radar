import './App.css';
import ApiPage from './components/ApiPage';
import ConfirmDeletePrompt from './components/ConfirmDeletePrompt';
import EditApiPrompt from './components/EditApiPrompt';
import LoadingSpinner from './components/LoadingSpinner';
import NavBar from './components/NavBar';
import NewApiPrompt from './components/NewApiPrompt';
import SideBar from './components/SideBar';
import { useAppContext, Popup } from './hooks/useAppContext';
import { ToastContainer } from 'react-toastify';

function App() {
  const { currentPopup, selectedApi, loading } = useAppContext();

  return (
    <>
      <NavBar />
      <div id="content">
        <SideBar />
        {selectedApi && <ApiPage />}
      </div>
      {currentPopup == Popup.NEW_API && <NewApiPrompt />}
      {currentPopup == Popup.EDIT_API && <EditApiPrompt />}
      {currentPopup == Popup.DELETE_API && <ConfirmDeletePrompt />}
      {loading && <LoadingSpinner />}
      <ToastContainer />
    </>
  );
}

export default App;