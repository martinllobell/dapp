import logo from "../../assets/logo.svg";

const FOOTER_ITEMS = (darkMode) => [
  {
    text: "About us",
    href: "#",
    darkModeClass: "text-gray-500 transition hover:text-gray-100/75",
    lightModeClass: "text-gray-900 transition hover:text-cyan-500",
  },
  {
    text: "Contact Us",
    href: "#",
    darkModeClass: "text-gray-500 transition hover:text-gray-100/75",
    lightModeClass: "text-gray-900 transition hover:text-cyan-500",
  },
  {
    text: "Cookies",
    href: "#",
    darkModeClass: "text-gray-500 transition hover:text-gray-100/75",
    lightModeClass: "text-gray-900 transition hover:text-cyan-500",
  },
  {
    text: "Help",
    href: "#",
    darkModeClass: "text-gray-500 transition hover:text-gray-100/75",
    lightModeClass: "text-gray-900 transition hover:text-cyan-500",
  },
];

export default function Footer({ darkMode }) {
  const footerItems = FOOTER_ITEMS(darkMode);
    return (
        <footer className="flex mt-5 justify-center flex-col items-center px-10">
            <img src={logo} alt="Logo" className={`w-[3rem] mt-5 transition-transform transform scale-95 rounded-full transition-colors`} />
            <p className="mx-auto text-center leading-relaxed text-gray-400">
                 Best betting site in the P2P market.
            </p>
            <div className="relative mx-auto max-w-screen-xl  sm:px-6 lg:px-2 lg:pt-8">
                <div className="lg:flex lg:items-end lg:justify-between">
                    <ul
                        className={"flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:gap-12"}
                    >
                        <li>
                            <a className={darkMode ? "transition hover:text-secundary" : "transition hover:text-primary"} href="#"> About us </a>
                        </li>

                        <li>
                            <a className={darkMode ? "transition hover:text-secundary" : "transition hover:text-primary"} href="#"> Contact Us </a>
                        </li>

                        <li>
                            <a className={darkMode ? "transition hover:text-secundary" : "transition hover:text-primary"} href="#"> Cookies </a>
                        </li>

                        <li>
                            <a className={darkMode ? "transition hover:text-secundary" : "transition hover:text-primary"} href="#"> Help </a>
                        </li>
                    </ul>
                </div>

                <div className="mt-8 mb-5 flex justify-center items-center text-center text-sm text-gray-500 ">
                    <p className="mr-2">© 2024 DBetting </p>| <p className="ml-2">All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

