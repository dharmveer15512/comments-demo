import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import CommentsList from './components/CommentsList';
import { PersistGate } from 'redux-persist/integration/react';
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator size={20} />} persistor={persistor}>
        <SafeAreaView style={styles.container}>
          <CommentsList />
        </SafeAreaView>
      </PersistGate>
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
