import logo from "../../assets/icons/loge.svg";

const Footer = () => {
    return (
        <footer class="flex justify-between items-center px-10">
            <div class="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
                <div class="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
                    <a
                        class="inline-block rounded-full backdrop-blur-xl bg-white/10 drop-shadow-xl p-2 text-white"
                        href="#MainContent"
                    >
                        <span class="sr-only">Back to top</span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </a>
                </div>

                <div class="lg:flex lg:items-end lg:justify-between">
                    <div>
                        <div class="flex justify-center text-teal-600 lg:justify-start">
                            <img src={logo} alt="Logo" />
                        </div>

                        <p class="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-400 lg:text-left">
                            The best betting site in the P2P market.
                        </p>
                    </div>

                    <ul
                        class="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12"
                    >
                        <li>
                            <a class="text-gray-900 transition hover:text-gray-700/75" href="#"> About us </a>
                        </li>

                        <li>
                            <a class="text-gray-900 transition hover:text-gray-700/75" href="#"> Contact Us </a>
                        </li>

                        <li>
                            <a class="text-gray-900 transition hover:text-gray-700/75" href="#"> Cookies </a>
                        </li>

                        <li>
                            <a class="text-gray-900 transition hover:text-gray-700/75" href="#"> Help </a>
                        </li>
                    </ul>
                </div>

                <p class="mt-12 text-center text-sm text-gray-500 lg:text-right">
                    © 2024 ...Name Company... | All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;

