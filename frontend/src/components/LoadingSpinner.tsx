import BlackScreen from "./BlackScreen";
import './LoadingSpinner.css';

export default function LoadingSpinner() {
  return (
    <BlackScreen>
      <div className="spinner"></div>
    </BlackScreen>
  );
}