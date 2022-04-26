import './App.css';
import { Provider } from 'react-redux';
import Contacts from './components/Contacts';

function App() {
  return (
    <Provider store={store}>
      <Contacts />
    </ Provider>
  );
}

export default App;
