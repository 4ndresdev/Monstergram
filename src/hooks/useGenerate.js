import { getDatabase, ref, set, update } from "firebase/database";

const useGenerate = () => {
  const createPost = async (data) => {
    const { public_id } = data;
    const db = getDatabase();
    return await set(ref(db, "posts/" + public_id), data);
  };

  const addUserLike = async (public_id, userId) => {
    const db = getDatabase();
    const postRef = ref(db, `posts/${public_id}/likes`);
    return await update(postRef, { [userId]: true });
  };

  const removeUserLike = async (public_id, userId) => {
    const db = getDatabase();
    const postRef = ref(db, `posts/${public_id}/likes/${userId}`);
    return await set(postRef, null);
  };

  return { createPost, addUserLike, removeUserLike };
};

export default useGenerate;
