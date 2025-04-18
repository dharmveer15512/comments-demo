import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import CommentsList from './components/CommentsList';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <CommentsList />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
});
