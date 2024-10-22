import { useContext, useEffect, useState } from "react";
import { Image } from "@nextui-org/image";
import { Avatar } from "@nextui-org/avatar";
import { AuthContext } from "../context/AuthContext";
import { emailFormatter } from "../utils/string.format";
import { getDatabase, ref, onValue, query } from "firebase/database";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const { email, displayName, photoURL, uid } = user;
  const [tricks, setTricks] = useState(0);

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, "posts/");
    const recentUsersQuery = query(usersRef);
    const unsubscribe = onValue(recentUsersQuery, (snapshot) => {
      const data = snapshot.val();
      let count = 0;

      for (let key in data) {
        if (data[key]?.likes) {
          if (data[key]?.likes && data[key].userId === uid) {
            count += Object.keys(data[key].likes).length;
          }
        }
      }

      setTricks(count);
    });

    return () => {
      unsubscribe();
    };
  }, [uid]);

  return (
    <div className="bg-gray-900 text-white rounded-lg mt-5 border-4 border-gray-800">
      <div className="w-full h-20 flex justify-center items-center overflow-hidden rounded-t-lg relative">
        <Image
          width="100%"
          height="100%"
          alt="User profile image"
          src="https://res.cloudinary.com/monstergram/image/upload/c_crop,ar_16:9,e_improve/v1729301633/pexels-aleksandar-cvetanovic-605352-1480861_no0t4z.jpg"
          className="w-full object-cover rounded-t-lg"
        />
        <p className="text-center text-sm text-gray-300 absolute bottom-0 z-20 right-0 m-1">
          <span className="font-bold">{tricks}</span> Tricks! 🎃
        </p>
      </div>
      <Avatar
        isBordered
        color="default"
        src={photoURL}
        className="mx-auto -mt-7 z-10"
        size="lg"
      />
      <div className="body px-5 pt-3 pb-10">
        <h2 className="text-xl font-semibold text-center">{displayName}</h2>
        <p className="text-sm text-slate-500 truncate text-center">
          {emailFormatter(email)}
        </p>
        <p className="text-center text-sm text-gray-300 mt-2">
          This profile is so full of mystery that even ghosts are scared of it!
          🎃
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
