import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import App from './App.tsx'
import store from './app/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
