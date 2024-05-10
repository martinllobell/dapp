import logo from "../../assets/logo.svg";

export default function Footer({ darkMode }) {
    return (
        <footer class="flex mt-5 justify-center flex-col items-center px-10">
            <img src={logo} alt="Logo" className={`w-[3rem] mt-5 transition-transform transform scale-95 rounded-full transition-colors`} />
            <p class="mx-auto text-center leading-relaxed text-gray-400">
                The best betting site in the P2P market.
            </p>
            <div class="relative mx-auto max-w-screen-xl  sm:px-6 lg:px-2 lg:pt-8">
                <div class="lg:flex lg:items-end lg:justify-between">
                    <ul
                        className={"flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:gap-12"}
                    >
                        <li>
                            <a className={darkMode ? "text-gray-900 transition hover:text-blue-400/75 " : "text-white-900 transition hover:text-cyan-500"} href="#"> About us </a>
                        </li>

                        <li>
                            <a className={darkMode ? "text-gray-900 transition hover:text-blue-400/75 " : "text-white-900 transition hover:text-cyan-500"} href="#"> Contact Us </a>
                        </li>

                        <li>
                            <a className={darkMode ? "text-gray-900 transition hover:text-blue-400/75 " : "text-white-900 transition hover:text-cyan-500"} href="#"> Cookies </a>
                        </li>

                        <li>
                            <a className={darkMode ? "text-gray-900 transition hover:text-blue-400/75 " : "text-white-900 transition hover:text-cyan-500"} href="#"> Help </a>
                        </li>
                    </ul>
                </div>

                <p class="mt-8 mb-5 flex justify-center items-center text-center text-sm text-gray-500 ">
                    <p className="mr-2">© 2024 DBetting </p>| <p className="ml-2">All rights reserved.</p>
                </p>
            </div>
        </footer>
    );
};


