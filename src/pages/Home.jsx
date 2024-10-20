import Header from "../components/Header";
import UserProfile from "../components/UserProfile";
import ListPost from "../components/ListPost";
import LastUsers from "../components/LastUsers";

const Home = () => {
  return (
    <div className="relative">
      <Header />
      <div className="container grid gap-4 grid-cols-12 mb-5">
        <div className="col-span-12 lg:flex lg:col-span-3 max-h-80 order-1">
          <UserProfile />
        </div>
        <div className="col-span-12 lg:col-span-6 order-3 lg:order-2">
          <ListPost />
        </div>
        <div className="col-span-12 lg:flex lg:col-span-3 max-h-96 order-2 lg:order-3">
          <LastUsers />
        </div>
      </div>
    </div>
  );
};

export default Home;
