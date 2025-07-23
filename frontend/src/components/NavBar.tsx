import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './NavBar.css';

export default function NavBar() {
  return (
    <nav>
      <h1>API Radar</h1>
      <button><FontAwesomeIcon icon={["fajr", "plus"]} /></button>
    </nav>
  );
}