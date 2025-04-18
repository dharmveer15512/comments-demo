export const getComments = async () => {
    return await fetch("https://jsonplaceholder.typicode.com/posts");
}