import ButtonShadowGradient from "../../components/buttoms/ButtonShadowGradient "

function NotFound() {
  return (
    <div className="">
      <div className=" w-10/12 m-auto py-16 min-h-screen flex items-center justify-center">
        <div className="backdrop-blur-xl bg-indigo-100 drop-shadow-xl shadow-sm shadow-black/10 overflow-hidden sm:rounded-lg pb-8">
          <div className="text-center pt-8">
            <h1 className="text-9xl font-bold text-purple-500">404</h1>
            <h1 className="text-6xl font-medium py-8">Oops! Page not found</h1>
            <p className="text-2xl pb-8 px-12 font-medium">The page you are looking for does not exist. It might have been moved or deleted.</p>
            <ButtonShadowGradient buttonText="HOME" linkTo="/" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
