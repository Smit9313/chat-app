import './App.css';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <div className='app'>
      <Route exact path='/' component={HomePage} />
      <Route exact path="/chats" component={ChatPage}/>
    </div>
  );
}

export default App;
