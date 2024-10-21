import { useEffect, useState } from "react";
import Post from "./Post";
import {
  getDatabase,
  ref,
  onValue,
  query,
  orderByChild,
} from "firebase/database";

const ListPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const postsRef = ref(db, "posts/");
    const recentUsersQuery = query(postsRef, orderByChild("timestamp"));

    const unsubscribe = onValue(recentUsersQuery, async (snapshot) => {
      const data = snapshot.val();
      const array_posts = [];

      const promises = Object.keys(data).map(async (key) => {
        const userId = data[key].userId;
        const userRef = ref(db, `users/${userId}`);

        return new Promise((resolve) => {
          onValue(userRef, (userSnapshot) => {
            const userData = userSnapshot.val();
            array_posts.push({
              id: data[key].public_id,
              prompt: data[key].prompt,
              image: data[key].transformed_image_url,
              likes: data[key]?.likes || {},
              timestamp: data[key].timestamp,
              user: {
                userId: userId,
                ...userData,
              },
            });
            resolve();
          });
        });
      });

      await Promise.all(promises);

      const sorted_posts = array_posts.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );

      setPosts(sorted_posts);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return posts.map((post) => <Post key={post.id} post={post} />);
};

export default ListPost;
