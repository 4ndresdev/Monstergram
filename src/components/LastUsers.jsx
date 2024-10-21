import { useEffect, useState } from "react";
import { Avatar } from "@nextui-org/avatar";
import { emailFormatter } from "../utils/string.format";
import {
  getDatabase,
  ref,
  onValue,
  query,
  orderByChild,
  limitToLast,
} from "firebase/database";
import Lottie from "lottie-react";
import spider from "../assets/lotties/spider.json";

const LastUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, "users/");
    const recentUsersQuery = query(
      usersRef,
      orderByChild("timestamp"),
      limitToLast(4)
    );
    const unsubscribe = onValue(recentUsersQuery, (snapshot) => {
      const data = snapshot.val();
      const users = [];
      for (let key in data) {
        users.push(data[key]);
      }
      setUsers(users);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="w-full bg-gray-900 text-white rounded-lg mt-5 p-3 border-4 border-gray-800 relative overflow-hidden">
      <Lottie
        animationData={spider}
        loop={false}
        className="absolute translate-y-[-10rem] lg:translate-y-[-5rem] translate-x-10"
      />
      <h2 className="text-lg font-semibold">Recent users</h2>
      <ul role="list" className="mt-2 flex flex-col gap-2">
        {users.map((user) => (
          <li
            key={user.uid}
            className="flex items-center bg-gray-800 px-5 py-3 rounded-lg border-t-4 border-gray-700"
          >
            <Avatar isBordered color="default" src={user.photoURL} size="sm" />
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">
                {user.displayName}
              </p>
              <p className="text-sm text-slate-500 truncate">
                {emailFormatter(user.email)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LastUsers;
