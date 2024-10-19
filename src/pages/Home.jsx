import Header from "../components/Header";
import UserProfile from "../components/UserProfile";
import Post from "../components/Post";

const Home = () => {
  return (
    <>
      <Header />
      <div className="container grid gap-4 grid-cols-12">
        <div className="hidden lg:flex col-span-3 rounded-t-lg max-h-80 sticky top-0">
          <UserProfile />
        </div>
        <div className="col-span-12 lg:col-span-6 bg-slate-400 mt-5">
          <Post />
        </div>
        <div className="hidden lg:flex lg:col-span-3 max-h-80 sticky top-0">
          <UserProfile />
        </div>
      </div>
    </>
  );
};

export default Home;
