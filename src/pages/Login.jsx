import { useContext, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import logo from "../assets/login/logo.webp";
import google from "../assets/login/google.webp";
import grass from "../assets/login/grass.webp";
import tombstones from "../assets/login/tombstones.webp";
import tree from "../assets/login/tree.webp";
import halloweenPhotos from "../assets/login/halloweenPhotos.webp";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import { getDatabase, ref, child, get, set } from "firebase/database";

const Login = () => {
  const navigate = useNavigate();
  const { signWithGoogle, user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (user?.uid) {
      navigate("/home");
      return;
    }
  }, [user, navigate, loading]);

  if (loading || user?.uid) {
    return <Loading />;
  }

  const handleSignWithGoogle = () => {
    signWithGoogle()
      .then((response) => {
        const user = {
          uid: response.user.uid,
          displayName: response.user.displayName,
          email: response.user.email,
          photoURL: response.user.photoURL,
        };

        const db = getDatabase();
        const dbRef = ref(db);

        get(child(dbRef, `users/${user.uid}`))
          .then((snapshot) => {
            if (!snapshot.exists()) {
              set(ref(db, "users/" + user.uid), user);
            }
          })
          .catch((error) => {
            toast.error(`Error fetching user data: ${error.message}`);
          })
          .finally(() => {
            toast.success("Successfully signed in with Google");
            navigate("/home");
          });
      })
      .catch((error) => {
        toast.error(`Error signing in with Google: ${error.message}`);
      });
  };

  return (
    <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 bg-primary">
      <div className="left md:h-screen w-full order-last md:order-first relative">
        <div className="mist w-[60%] h-2 bg-white blur-3xl fixed top-0 translate-x-[-50px]"></div>
        <div className="m-8">
          <Image
            className="z-40"
            alt="Spooky logo with Halloween theme"
            src={logo}
            isBlurred
          />
          <div className="mt-12 md:mt-16">
            <h1 className="z-40 text-3xl md:text-4xl 2xl:text-6xl font-bold text-white">
              Create your spooky image with{" "}
              <span className="text-orange-500">AI</span> and share with your
              friends 🧟
            </h1>
            <p className="z-40 text-white mt-2 text-sm xl:text-lg">
              Connect your account... but remember, some <br /> doors are better
              left unopened. 🎃
            </p>
            <Button
              className="mt-5 z-40 bg-white w-full md:w-auto"
              variant="shadow"
              aria-label="Sign in with Google"
              isLoading={loading}
              onClick={handleSignWithGoogle}
            >
              <Image
                alt="Google logo for sign-in button"
                width={20}
                height={20}
                src={google}
              />
              Sign with Google
            </Button>
          </div>
        </div>
        <div className="mist w-[60%] h-4 bg-white blur-3xl fixed bottom-0 translate-x-[-50px]"></div>
        <Image
          alt="Spooky tree"
          className="z-20 fixed bottom-0 pr-5 translate-x-[-2rem] md:translate-x-[0]"
          src={tree}
        />
        <Image alt="Grass" className="z-20 fixed bottom-0" src={grass} />
        <Image
          alt="Tombstones in the background for Halloween"
          className="z-10 fixed bottom-0 translate-x-5"
          src={tombstones}
        />
      </div>
      <div className="right md:h-screen w-full overflow-hidden ">
        <Image
          alt="Spooky photos"
          className="z-20 object-cover w-full h-screen"
          src={halloweenPhotos}
        />
      </div>
    </div>
  );
};

export default Login;
