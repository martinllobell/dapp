import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

export default function Footer({ darkMode }) {
  return (
    <footer className="flex mt-5 justify-center flex-col items-center px-10">
      <img
        src={logo}
        alt="Logo"
        className={`w-[3rem] mt-5 transition-transform transform scale-95 rounded-full transition-colors`}
      />
      <p className="mx-auto text-center leading-relaxed text-gray-400">
        Best betting site in the P2P market.
      </p>
      <div className="relative mx-auto max-w-screen-xl  sm:px-6 lg:px-2 lg:pt-8">
        <div className="lg:flex lg:items-end lg:justify-between">
          <ul
            className={
              "flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:gap-12"
            }
          >
            <li>
              <Link
                to="/aboutus"
                className={
                  darkMode
                    ? "transition hover:text-purple-400/75 "
                    : "transition hover:text-purple-500"
                }
              >
                About us
              </Link>
            </li>

            <li>
              <a
                className={
                  darkMode
                    ? "transition hover:text-purple-400/75 "
                    : "transition hover:text-purple-500"
                }
                href="#"
              >
                {" "}
                Contact Us{" "}
              </a>
            </li>

            <li>
              <a
                className={
                  darkMode
                    ? "transition hover:text-purple-400/75 "
                    : "transition hover:text-purple-500"
                }
                href="#"
              >
                {" "}
                Cookies{" "}
              </a>
            </li>

            <li>
              <a
                className={
                  darkMode
                    ? "transition hover:text-purple-400/75 "
                    : "transition hover:text-purple-500"
                }
                href="#"
              >
                {" "}
                Help{" "}
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-8 mb-5 flex justify-center items-center text-center text-sm text-gray-500 ">
          <p className="mr-2">© 2024 DBetting </p>|{" "}
          <p className="ml-2">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
