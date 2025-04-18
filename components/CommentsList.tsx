import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, View, Text, StyleSheet, RefreshControl } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { RootState } from '../redux/store';

const fetchComments = () => ({ type: 'comments/fetchComments' });
const updateRating = (payload) => ({ type: 'comments/updateRating', payload });

const getBackGroundColor = (index: number) => {
    const colors = ['#FFDDC1', '#C1FFD7', '#C1D4FF', '#FFD1E3', '#E0C1FF'];
    return colors[index % colors.length];
};


const CommentItem = React.memo(({ item, index }: { item: Comment, index: number }) => {
    const dispatch = useDispatch();
    return (
        <View style={[styles.card, { backgroundColor: getBackGroundColor(index) }]}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
            <AirbnbRating
                defaultRating={item.rating || 0}
                size={20}
                showRating={false}
                onFinishRating={(rating) => dispatch(updateRating({ id: item.id, rating }))}
            />
        </View>
    )
})

const CommentsList = () => {
    const dispatch = useDispatch();
    const { comments, loading, error } = useSelector((state: RootState) => state.comments);
    const getAllComments = () => dispatch(fetchComments());
    useEffect(() => {
        getAllComments()
    }, []);

    return (
        <FlatList
            refreshControl={<RefreshControl refreshing={loading} onRefresh={getAllComments} />}
            contentContainerStyle={styles.container}
            data={comments}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={() => {
                if (loading) {
                    <Text style={styles.loadingText}>Loading comments</Text>
                }
                else if (error) {
                    return <Text style={styles.errorText}>{error}</Text>;
                }
            }}
            renderItem={({ item, index }) => (
                <CommentItem item={item} index={index} />
            )}
        />
    );
};

export default CommentsList
const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    card: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    body: {
        fontSize: 14,
        marginBottom: 10,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        padding: 20,
        textAlign: 'center',
        color: 'red',
    },
    loadingText: {
        padding: 20,
        textAlign: 'center',
    }
});