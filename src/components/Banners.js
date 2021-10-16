import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function () {

  let [banners, setBanners] = useState(null);
  let [error, setError] = useState();
  let [isAddingBanner, setIsAddingBanner] = useState();
  let [isSavingBanner, setIsSavingBanner] = useState();
  let [newBannerText, setNewBannerText] = useState("");

  useEffect(() => {
    let isCurrent = true;
    setBanners(null);
    let url = "/api/banners";

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (isCurrent) {
          setBanners(json.banners);
        }
      })
      .catch((e) => {
        if (isCurrent) {
          setError("We couldn't load your banners. Try again soon.");
          console.error(e);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  function createBanner(e) {
    e.preventDefault();

    if (!newBannerText) {
      return;
    }

    setIsSavingBanner(true);

    fetch("/api/banners", {
      method: "POST",
      body: JSON.stringify({
        bannerText: newBannerText
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setNewBannerText("");
        setBanners((banners) => [...banners, json.banner]);
        setIsAddingBanner(false);
      })
      .catch((e) => {
        setError("Your Banner wasn't saved. Try again.");
        console.error(e);
      })
      .finally(() => {
        setIsSavingBanner(false);
      });
  }

  function updateBanner(id){
    console.log('attempting to update banner')
    setIsSavingBanner(true);

    fetch(`/api/banners/${id}`, {
       method: "PATCH"
       })
      .then((res) => res.json())
      .then((json) => {
        console.log('attempting to update with', json)
      })
      .catch((e) => {
        setError("Your Banner wasn't saved. Try again.");
        console.error(e);
      })
      
      .finally(() => {
        fetch("/api/banners", {
        method: "GET",
        })
        .then((res) => res.json())
        .then((json) => {
          console.log('freshly gotten banners', json)
          setBanners((banners) => json.banners);
        })
        .catch((e) => {
          setError("Your Banner was saved but we couldn't get the updated banners");
          console.error(e);
        })
        .finally(() => {
          setIsSavingBanner(false);
        })
      });
  }

  function deleteBanner(id) {
    fetch(`/api/banners/${id}`, { method: "DELETE" });
    setBanners((banners) =>
      banners.filter((banner) => banner.id !== id)
    );
  }

  let hasRenderedBannersRef = useRef(false);
  useEffect(() => {
    if (banners) {
      hasRenderedBannersRef.current = true;
    } else {
      hasRenderedBannersRef.current = false;
    }
  }, [banners]);

  return (
    <div className="flex justify-center">
      <div className="flex mx-auto overflow-hidden rounded-md shadow-lg">          

        <div className="flex flex-1 bg-white w-md">
          
          <div className="flex-1 pt-12 pb-12 pr-12 pl-12">
            <div className="flex items-center justify-between mb-10">
              <h1
                className="flex items-center justify-between text-3xl font-bold leading-none"
              >
                Banners
              </h1>

              <button
                data-testid="add-banner"
                onClick={() => setIsAddingBanner(!isAddingBanner)}
                className="p-2 border border-transparent rounded hover:border-cool-gray-300 text-cool-gray-600"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <div>
              {error && (
                <div className="fixed bottom-0 right-0 mb-8 mr-8 bg-white border-b-4 border-red-500 rounded-md shadow-xl">
                  <div className="flex p-4 pr-5 rounded-md">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 mr-1 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium leading-5 text-red-600 text">
                        Network error
                      </h3>
                      <div className="mt-2 text-sm leading-5">
                        <p>{error}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {banners?.length > 0 ? (
                <div>
                  <ul className="divide-y divide-cool-gray-100">
                    <AnimatePresence>
                      {banners.map((banner, i) => (
                        <motion.li
                          variants={{
                            hidden: (i) => ({
                              opacity: 0,
                              y: -50 * i,
                            }),
                            visible: (i) => ({
                              opacity: 1,
                              y: 0,
                              transition: {
                                delay: i * 0.025,
                              },
                            }),
                            removed: {
                              opacity: 0,
                            },
                          }}
                          initial={
                            hasRenderedBannersRef.current
                              ? "visible"
                              : "hidden"
                          }
                          animate="visible"
                          exit="removed"
                          custom={i}
                          className="flex items-center justify-between py-2 group"
                          key={i}
                          data-testid="banner"
                        >
                          <div>
                            {banner.bannerText}
                          </div>
                          <button
                            className="flex items-center invisible px-2 py-1 opacity-50 hover:opacity-100 group-hover:visible"
                            onClick={() => updateBanner(banner.id)}
                            data-testid="update-banner"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="red"
                              viewBox="0 0 20 20"
                            >
                              <path
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                                fillRule="evenodd"
                              ></path>
                            </svg>
                            ️
                          </button>
                          <button
                            className="flex items-center invisible px-2 py-1 opacity-50 hover:opacity-100 group-hover:visible"
                            onClick={() => deleteBanner(banner.id)}
                            data-testid="delete-banner"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                                fillRule="evenodd"
                              ></path>
                            </svg>
                            ️
                          </button>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </div>
              ) : banners ? (
                <p className="pt-3 pb-3 font-medium text-cool-gray-400">
                  All done!
                </p>
              ) : !error ? (
                <p className="pt-3 pb-3 font-medium text-cool-gray-400">
                  Loading...
                </p>
              ) : null}

              {isAddingBanner && (
                <form
                  onSubmit={createBanner}
                  className={`-mx-3 ${
                    isSavingBanner ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  <div>
                    <div className="relative py-1">
                      <input
                        id="email"
                        autoFocus
                        className="block w-full py-2 transition duration-150 ease-in-out border-2 border-transparent focus form-input focus:shadow-none focus:border-blue-300 sm:leading-5"
                        placeholder="New banner..."
                        data-testid="new-banner-text"
                        value={newBannerText}
                        onChange={(e) => setNewBannerText(e.target.value)}
                      />
                      <div className="absolute inset-y-0 right-0 flex py-1">
                        <button
                          type="submit"
                          data-testid="save-new-banner"
                          className="items-center px-4 text-sm text-cool-gray-700 hover:text-cool-gray-400"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
