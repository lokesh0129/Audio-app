 import './App.css';
import AudioReorder from "./components/AudioRecorder"
import SelectedAudio from './components/SelectedAudio';
 

function App() {
   
  return (
    <div className="App">
      <header className='header'>Audio Track-APP</header>
       <AudioReorder  />
       
    </div>
  );
}

export default App;
