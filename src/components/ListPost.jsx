import { useEffect, useState } from "react";
import Post from "./Post";
import { getDatabase, ref, query, orderByChild, get } from "firebase/database";
import Loading from "./Loading";

const ListPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      setLoading(true);
      const db = getDatabase();
      const postsRef = ref(db, "posts/");
      const recentPostsQuery = query(postsRef, orderByChild("timestamp"));

      const snapshot = await get(recentPostsQuery);
      const data = snapshot.val();
      if (!data) {
        setLoading(false);
        return;
      }

      const array_posts = [];

      const userIds = new Set();
      Object.keys(data).forEach((key) => {
        userIds.add(data[key].userId);
      });

      const usersRef = ref(db, "users/");
      const usersSnapshot = await get(usersRef);
      const usersData = usersSnapshot.val();

      Object.keys(data).forEach((key) => {
        const postData = data[key];
        const userId = postData.userId;
        const userData = usersData[userId];

        array_posts.push({
          id: postData.public_id,
          prompt: postData.prompt,
          image: postData.transformed_image_url,
          likes: postData?.likes || {},
          timestamp: postData.timestamp,
          user: {
            userId: userId,
            ...userData,
          },
        });
      });

      const sorted_posts = array_posts.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );

      setLoading(false);
      setPosts(sorted_posts);
    };

    fetchPostsAndUsers();
  }, []);

  if (loading) return <Loading />;

  return posts.map((post) => <Post key={post.id} post={post} />);
};

export default ListPost;
