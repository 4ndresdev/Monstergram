import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Header />
      <div className="container grid gap-4 grid-cols-12 mt-5">
        <div className="hidden md:flex col-span-3 bg-slate-400">sdf</div>
        <div className="col-span-12 md:col-span-6 bg-slate-400">sdf</div>
        <div className="hidden md:flex md:col-span-3 bg-slate-400">sdfsd</div>
      </div>
    </>
  );
};

export default Home;
