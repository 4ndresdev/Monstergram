import Post from "./Post";

const ARRAY_POSTS = [
  {
    id: 1,
    prompt:
      "A mysterious and dark scene, perfect for the Halloween atmosphere. Pumpkins, crosses, and candles creating an eerie mood. 🎃",
    image:
      "https://images.pexels.com/photos/3089532/pexels-photo-3089532.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    prompt:
      "A mysterious and dark scene, perfect for the Halloween atmosphere. Pumpkins, crosses, and candles creating an eerie mood. 🎃",
    image:
      "https://images.pexels.com/photos/5477427/pexels-photo-5477427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const ListPost = () => {
  return ARRAY_POSTS.map((post) => <Post key={post.id} post={post} />);
};

export default ListPost;
