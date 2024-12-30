
import { useFonts } from 'expo-font';
// Custom Fonts Config
import { FontLoader } from './src/config/FontConfig';
import Router from './src/navigation/Router';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';

const App: React.FC = () => {
  const [loaded] = useFonts(FontLoader);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;