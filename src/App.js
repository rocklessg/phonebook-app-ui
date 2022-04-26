import './App.css';
import { Provider } from 'react-redux';
import Contacts from './components/Contacts';
import { store } from "./actions/store";
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true}>
        <Container maxWidth="lg">
          <Contacts />
        </Container>
      </ToastProvider>
    </Provider>
  );
}


export default App;
