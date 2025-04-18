import { call, put, takeEvery, all } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchStart, fetchSuccess, fetchFailure, setRating } from './commentSlice';
import { getComments } from "../utils/apis"

function* fetchCommentsSaga() {
    try {
        yield put(fetchStart());
        const res = yield call(getComments);
        if (!res.ok) throw new Error('Failed to fetch');

        const data = yield res.json();
        const storedRatings = yield call(AsyncStorage.getItem, 'ratings');
        const ratings = storedRatings ? JSON.parse(storedRatings) : {};

        const updatedComments = data.map((item) => ({
            ...item,
            rating: ratings[item.id] || 0,
        }));

        yield put(fetchSuccess(updatedComments));
    } catch (error) {
        yield put(fetchFailure(error.message));
    }
}

function* updateRatingSaga(action) {
    const { id, rating } = action.payload;

    const stored = yield call(AsyncStorage.getItem, 'ratings');
    const ratings = stored ? JSON.parse(stored) : {};
    ratings[id] = rating;
    yield call(AsyncStorage.setItem, 'ratings', JSON.stringify(ratings));

    yield put(setRating({ id, rating }));
}

function* rootSaga() {
    yield all([
        takeEvery('comments/fetchComments', fetchCommentsSaga),
        takeEvery('comments/updateRating', updateRatingSaga),
    ]);
}

export default rootSaga;
