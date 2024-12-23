
import { useFonts } from 'expo-font';
// Custom Fonts Config
import { FontLoader } from './src/config/FontConfig';
import Router from './src/navigation/Router';

const App: React.FC = () => {
  const [loaded] = useFonts(FontLoader);

  if (!loaded) {
    return null;
  }

  return <Router />;
};

export default App;