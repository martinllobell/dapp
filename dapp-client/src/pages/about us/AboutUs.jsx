
const AboutUs = () => {
  return (
    <div className="flex items-center justify-center min-h-screen  pt-32">
      <div className="flex flex-col">
        <div className="flex flex-col mt-8">
          <div className="container max-w-3xl px-4">
            <div className="flex flex-wrap justify-center text-center mb-12">
              <div className="w-full lg:w-6/12">
                <h1 className=" text-4xl font-bold mb-8">
                  Meet the team behind the project.
                </h1>
                <p className="text-2xl font-medium text-purple-600">
                  We are a group of programming enthusiasts with a common goal.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center">
              <div className="w-full md:w-6/12 lg:w-4/12 mb-6 px-6 sm:px-6 lg:px-4">
                <div className="flex flex-col">
                  <a href="#" className="mx-auto">
                    <img
                      className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                      src="https://media.licdn.com/dms/image/D4D03AQEf7xE8Tc1u_A/profile-displayphoto-shrink_400_400/0/1694544590481?e=1722470400&v=beta&t=eZH_cavLXJBYfUFrNaEo4ZK6HxM2d5uemcZr1jrWLRg"
                      alt="Profile"
                    />
                  </a>
                  <div className="text-center mt-6">
                    <h1 className="text-xl font-extrabold mb-1">
                      Matías Viglianco
                    </h1>
                    <div className="text-gray-500 font-normal mb-2">
                      Full Stack and system engineer
                    </div>
                    <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300">
                      <a
                        href="https://www.linkedin.com/in/mat%C3%ADas-agust%C3%ADn-viglianco/"
                        target="_blank"
                        className="flex rounded-full hover:bg-blue-300 h-10 w-10 items-center justify-center"
                      >
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="2"
                            y="2"
                            width="28"
                            height="28"
                            rx="14"
                            fill="#1275B1"
                          />
                          <path
                            d="M12.6186 9.69215C12.6186 10.6267 11.8085 11.3843 10.8093 11.3843C9.81004 11.3843 9 10.6267 9 9.69215C9 8.7576 9.81004 8 10.8093 8C11.8085 8 12.6186 8.7576 12.6186 9.69215Z"
                            fill="white"
                          />
                          <path
                            d="M9.24742 12.6281H12.3402V22H9.24742V12.6281Z"
                            fill="white"
                          />
                          <path
                            d="M17.3196 12.6281H14.2268V22H17.3196C17.3196 22 17.3196 19.0496 17.3196 17.2049C17.3196 16.0976 17.6977 14.9855 19.2062 14.9855C20.911 14.9855 20.9008 16.4345 20.8928 17.5571C20.8824 19.0244 20.9072 20.5219 20.9072 22H24V17.0537C23.9738 13.8954 23.1508 12.4401 20.4433 12.4401C18.8354 12.4401 17.8387 13.1701 17.3196 13.8305V12.6281Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                      <a
                        href="https://github.com/MatiViglianco"
                        target="_blank"
                        className="flex rounded-full hover:bg-slate-400 h-10 w-10 items-center justify-center"
                      >
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 20 20"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                        >
                          <g
                            id="Page-1"
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            <g
                              id="Dribbble-Light-Preview"
                              transform="translate(-140.000000, -7559.000000)"
                              fill="#000000"
                            >
                              <g
                                id="icons"
                                transform="translate(56.000000, 160.000000)"
                              >
                                <path
                                  d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                                  id="github-[#142]"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-4/12 mb-6 px-6 sm:px-6 lg:px-4">
                <div className="flex flex-col">
                  <a href="#" className="mx-auto">
                    <img
                      className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                      src="https://media.licdn.com/dms/image/C4E03AQGYYSZHc_EpGQ/profile-displayphoto-shrink_400_400/0/1622559772376?e=1722470400&v=beta&t=UktrrlaZMnTnLeNsUts4c89762l4gUKzmsHJmJuoUWo"
                      alt="Profile"
                    />
                  </a>
                  <div className="text-center mt-6">
                    <h1 className="text-xl font-extrabold mb-1">
                      Martin Llobell
                    </h1>
                    <div className="text-gray-500 font-normal mb-2">
                      Full Stack and software architect
                    </div>
                    <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300">
                      <a
                        href="https://www.linkedin.com/in/martin-llobell-devel0per/"
                        target="_blank"
                        className="flex rounded-full hover:bg-blue-300 h-10 w-10 items-center justify-center"
                      >
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="2"
                            y="2"
                            width="28"
                            height="28"
                            rx="14"
                            fill="#1275B1"
                          />
                          <path
                            d="M12.6186 9.69215C12.6186 10.6267 11.8085 11.3843 10.8093 11.3843C9.81004 11.3843 9 10.6267 9 9.69215C9 8.7576 9.81004 8 10.8093 8C11.8085 8 12.6186 8.7576 12.6186 9.69215Z"
                            fill="white"
                          />
                          <path
                            d="M9.24742 12.6281H12.3402V22H9.24742V12.6281Z"
                            fill="white"
                          />
                          <path
                            d="M17.3196 12.6281H14.2268V22H17.3196C17.3196 22 17.3196 19.0496 17.3196 17.2049C17.3196 16.0976 17.6977 14.9855 19.2062 14.9855C20.911 14.9855 20.9008 16.4345 20.8928 17.5571C20.8824 19.0244 20.9072 20.5219 20.9072 22H24V17.0537C23.9738 13.8954 23.1508 12.4401 20.4433 12.4401C18.8354 12.4401 17.8387 13.1701 17.3196 13.8305V12.6281Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                      <a
                        href="https://github.com/martinllobell"
                        target="_blank"
                        className="flex rounded-full hover:bg-slate-400 h-10 w-10 items-center justify-center"
                      >
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 20 20"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                        >
                          <g
                            id="Page-1"
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            <g
                              id="Dribbble-Light-Preview"
                              transform="translate(-140.000000, -7559.000000)"
                              fill="#000000"
                            >
                              <g
                                id="icons"
                                transform="translate(56.000000, 160.000000)"
                              >
                                <path
                                  d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                                  id="github-[#142]"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-4/12 mb-6 px-6 sm:px-6 lg:px-4">
                <div className="flex flex-col">
                  <a href="#" className="mx-auto">
                    <img
                      className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                      src="https://media.licdn.com/dms/image/D4D03AQHlQWyT3LlHRA/profile-displayphoto-shrink_400_400/0/1705061169745?e=1722470400&v=beta&t=Z-5Huk7-3nTD3VDmSGcMPx1AuBYuYQhZplysDE-QlVE"
                      alt="Profile"
                    />
                  </a>
                  <div className="text-center mt-6">
                    <h1 className="text-xl font-extrabold mb-1">
                      Carlos Alba Gil
                    </h1>
                    <div className="text-gray-500 font-normal mb-2">
                      Computer Engineer and Blockchain Engineer
                    </div>
                    <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300">
                      <a
                        href="https://www.linkedin.com/in/carlosalbagil/"
                        target="_blank"
                        className="flex rounded-full hover:bg-blue-300 h-10 w-10 items-center justify-center"
                      >
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="2"
                            y="2"
                            width="28"
                            height="28"
                            rx="14"
                            fill="#1275B1"
                          />
                          <path
                            d="M12.6186 9.69215C12.6186 10.6267 11.8085 11.3843 10.8093 11.3843C9.81004 11.3843 9 10.6267 9 9.69215C9 8.7576 9.81004 8 10.8093 8C11.8085 8 12.6186 8.7576 12.6186 9.69215Z"
                            fill="white"
                          />
                          <path
                            d="M9.24742 12.6281H12.3402V22H9.24742V12.6281Z"
                            fill="white"
                          />
                          <path
                            d="M17.3196 12.6281H14.2268V22H17.3196C17.3196 22 17.3196 19.0496 17.3196 17.2049C17.3196 16.0976 17.6977 14.9855 19.2062 14.9855C20.911 14.9855 20.9008 16.4345 20.8928 17.5571C20.8824 19.0244 20.9072 20.5219 20.9072 22H24V17.0537C23.9738 13.8954 23.1508 12.4401 20.4433 12.4401C18.8354 12.4401 17.8387 13.1701 17.3196 13.8305V12.6281Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                      <a
                        href="https://github.com/CarlosAlbaWork"
                        target="_blank"
                        className="flex rounded-full hover:bg-slate-400 h-10 w-10 items-center justify-center"
                      >
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 20 20"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                        >
                          <g
                            id="Page-1"
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            <g
                              id="Dribbble-Light-Preview"
                              transform="translate(-140.000000, -7559.000000)"
                              fill="#000000"
                            >
                              <g
                                id="icons"
                                transform="translate(56.000000, 160.000000)"
                              >
                                <path
                                  d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                                  id="github-[#142]"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-4/12 mb-6 px-6 sm:px-6 lg:px-4">
                <div className="flex flex-col">
                  <a href="#" className="mx-auto">
                    <img
                      className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                      src="https://avatars.githubusercontent.com/u/98036179?v=4"
                      alt="Profile"
                    />
                  </a>
                  <div className="text-center mt-6">
                    <h1 className="text-xl font-extrabold mb-1">
                      Gaston Valles
                    </h1>
                    <div className="text-gray-500 font-normal mb-2">
                      Front-End Developer
                    </div>
                    <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300">
                      <a
                        href="https://www.linkedin.com/in/gastonvalles/"
                        target="_blank"
                        className="flex rounded-full hover:bg-blue-300 h-10 w-10 items-center justify-center"
                      >
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="2"
                            y="2"
                            width="28"
                            height="28"
                            rx="14"
                            fill="#1275B1"
                          />
                          <path
                            d="M12.6186 9.69215C12.6186 10.6267 11.8085 11.3843 10.8093 11.3843C9.81004 11.3843 9 10.6267 9 9.69215C9 8.7576 9.81004 8 10.8093 8C11.8085 8 12.6186 8.7576 12.6186 9.69215Z"
                            fill="white"
                          />
                          <path
                            d="M9.24742 12.6281H12.3402V22H9.24742V12.6281Z"
                            fill="white"
                          />
                          <path
                            d="M17.3196 12.6281H14.2268V22H17.3196C17.3196 22 17.3196 19.0496 17.3196 17.2049C17.3196 16.0976 17.6977 14.9855 19.2062 14.9855C20.911 14.9855 20.9008 16.4345 20.8928 17.5571C20.8824 19.0244 20.9072 20.5219 20.9072 22H24V17.0537C23.9738 13.8954 23.1508 12.4401 20.4433 12.4401C18.8354 12.4401 17.8387 13.1701 17.3196 13.8305V12.6281Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                      <a
                        href="https://github.com/gastonvalles"
                        target="_blank"
                        className="flex rounded-full hover:bg-slate-400 h-10 w-10 items-center justify-center"
                      >
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 20 20"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                        >
                          <g
                            id="Page-1"
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            <g
                              id="Dribbble-Light-Preview"
                              transform="translate(-140.000000, -7559.000000)"
                              fill="#000000"
                            >
                              <g
                                id="icons"
                                transform="translate(56.000000, 160.000000)"
                              >
                                <path
                                  d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                                  id="github-[#142]"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-4/12 mb-6 px-6 sm:px-6 lg:px-4">
                <div className="flex flex-col">
                  <a href="#" className="mx-auto">
                    <img
                      className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                      src="https://media.licdn.com/dms/image/D4D03AQFOZZTdcQJ_4w/profile-displayphoto-shrink_400_400/0/1692239518171?e=1722470400&v=beta&t=ZeYbEHJ-meZ2ggzGyaIHpYh38wmCEGZ2UZSvUtvCydM"
                      alt="Profile"
                    />
                  </a>
                  <div className="text-center mt-6">
                    <h1 className="text-xl font-extrabold mb-1">
                      Leonel Behnke
                    </h1>
                    <div className="text-gray-500 font-normal mb-2">
                      Front-End Developer
                    </div>
                    <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300">
                      <a
                        href="https://www.linkedin.com/in/leonelbehnkedev/"
                        target="_blank"
                        className="flex rounded-full hover:bg-blue-300 h-10 w-10 items-center justify-center"
                      >
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="2"
                            y="2"
                            width="28"
                            height="28"
                            rx="14"
                            fill="#1275B1"
                          />
                          <path
                            d="M12.6186 9.69215C12.6186 10.6267 11.8085 11.3843 10.8093 11.3843C9.81004 11.3843 9 10.6267 9 9.69215C9 8.7576 9.81004 8 10.8093 8C11.8085 8 12.6186 8.7576 12.6186 9.69215Z"
                            fill="white"
                          />
                          <path
                            d="M9.24742 12.6281H12.3402V22H9.24742V12.6281Z"
                            fill="white"
                          />
                          <path
                            d="M17.3196 12.6281H14.2268V22H17.3196C17.3196 22 17.3196 19.0496 17.3196 17.2049C17.3196 16.0976 17.6977 14.9855 19.2062 14.9855C20.911 14.9855 20.9008 16.4345 20.8928 17.5571C20.8824 19.0244 20.9072 20.5219 20.9072 22H24V17.0537C23.9738 13.8954 23.1508 12.4401 20.4433 12.4401C18.8354 12.4401 17.8387 13.1701 17.3196 13.8305V12.6281Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                      <a
                        href="https://github.com/griimreaper"
                        target="_blank"
                        className="flex rounded-full hover:bg-slate-400 h-10 w-10 items-center justify-center"
                      >
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 20 20"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                        >
                          <g
                            id="Page-1"
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            <g
                              id="Dribbble-Light-Preview"
                              transform="translate(-140.000000, -7559.000000)"
                              fill="#000000"
                            >
                              <g
                                id="icons"
                                transform="translate(56.000000, 160.000000)"
                              >
                                <path
                                  d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                                  id="github-[#142]"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
