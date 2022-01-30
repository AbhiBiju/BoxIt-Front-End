import { Fragment, useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { MenuIcon, SearchIcon, ShoppingCartIcon, UserIcon, XIcon } from "@heroicons/react/outline";

const navigation = {
  categories: [
    {
      name: "Women",
      featured: [
        { name: "Sleep", href: "#" },
        { name: "Swimwear", href: "#" },
        { name: "Underwear", href: "#" },
      ],
      collection: [
        { name: "Everything", href: "#" },
        { name: "Core", href: "#" },
        { name: "New Arrivals", href: "#" },
        { name: "Sale", href: "#" },
      ],
      categories: [
        { name: "Basic Tees", href: "#" },
        { name: "Artwork Tees", href: "#" },
        { name: "Bottoms", href: "#" },
        { name: "Underwear", href: "#" },
        { name: "Accessories", href: "#" },
      ],
      brands: [
        { name: "Full Nelson", href: "#" },
        { name: "My Way", href: "#" },
        { name: "Re-Arranged", href: "#" },
        { name: "Counterfeit", href: "#" },
        { name: "Significant Other", href: "#" },
      ],
    },
    {
      name: "Men",
      featured: [
        { name: "Casual", href: "#" },
        { name: "Boxers", href: "#" },
        { name: "Outdoor", href: "#" },
      ],
      collection: [
        { name: "Everything", href: "#" },
        { name: "Core", href: "#" },
        { name: "New Arrivals", href: "#" },
        { name: "Sale", href: "#" },
      ],
      categories: [
        { name: "Artwork Tees", href: "#" },
        { name: "Pants", href: "#" },
        { name: "Accessories", href: "#" },
        { name: "Boxers", href: "#" },
        { name: "Basic Tees", href: "#" },
      ],
      brands: [
        { name: "Significant Other", href: "#" },
        { name: "My Way", href: "#" },
        { name: "Counterfeit", href: "#" },
        { name: "Re-Arranged", href: "#" },
        { name: "Full Nelson", href: "#" },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

/* Getting Box Info */
import { useLazyQuery } from "@apollo/client";
import { QUERY_BOXES } from "../utils/queries";
import auth from "../utils/auth";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [boxes, setBoxes] = useState([]);
  const user = auth.getProfile();
  const [id, setId] = useState("");
  const [getUserBoxes, { data, loading }] = useLazyQuery(QUERY_BOXES);

  const handleClick = () => {
    let userId = user.data._id;
    setId(userId);

    getUserBoxes({ variables: { userId: id } });
    if (data) {
      setBoxes(data.getUserBoxes);
    }
  };

  return (
    <div className="bg-white h-full w-full grid grid-cols-10">
      <div className="float-left mr-5 col-span-2 h-full hidden lg:flex lg:flex-shrink-0">
        <Sidebar user={user} />
      </div>
      {/* Mobile menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex px-4 space-x-8">
                    {navigation.categories.map((category) => (
                      <Tab
                        key={category.name}
                        className={({ selected }) =>
                          classNames(
                            selected ? "text-indigo-600 border-indigo-600" : "text-gray-900 border-transparent",
                            "flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
                          )
                        }
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  {navigation.categories.map((category, categoryIdx) => (
                    <Tab.Panel key={category.name} className="px-4 pt-10 pb-6 space-y-12">
                      <div className="grid grid-cols-1 items-start gap-y-10 gap-x-6">
                        <div className="grid grid-cols-1 gap-y-10 gap-x-6">
                          <div>
                            <p id={`mobile-featured-heading-${categoryIdx}`} className="font-medium text-gray-900">
                              Featured
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`mobile-featured-heading-${categoryIdx}`}
                              className="mt-6 space-y-6"
                            >
                              {category.featured.map((item) => (
                                <li key={item.name} className="flex">
                                  <a href={item.href} className="text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p id="mobile-categories-heading" className="font-medium text-gray-900">
                              Categories
                            </p>
                            <ul role="list" aria-labelledby="mobile-categories-heading" className="mt-6 space-y-6">
                              {category.categories.map((item) => (
                                <li key={item.name} className="flex">
                                  <a href={item.href} className="text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-y-10 gap-x-6">
                          <div>
                            <p id="mobile-collection-heading" className="font-medium text-gray-900">
                              Collection
                            </p>
                            <ul role="list" aria-labelledby="mobile-collection-heading" className="mt-6 space-y-6">
                              {category.collection.map((item) => (
                                <li key={item.name} className="flex">
                                  <a href={item.href} className="text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p id="mobile-brand-heading" className="font-medium text-gray-900">
                              Brands
                            </p>
                            <ul role="list" aria-labelledby="mobile-brand-heading" className="mt-6 space-y-6">
                              {category.brands.map((item) => (
                                <li key={item.name} className="flex">
                                  <a href={item.href} className="text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a href={page.href} className="-m-2 p-2 block font-medium text-gray-900">
                      {page.name}
                    </a>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                <div className="flow-root">
                  <a href="#" className="-m-2 p-2 block font-medium text-gray-900">
                    Create an account
                  </a>
                </div>
                <div className="flow-root">
                  <a href="#" className="-m-2 p-2 block font-medium text-gray-900">
                    Sign in
                  </a>
                </div>
              </div>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {/* Currency selector */}
                <form>
                  <div className="inline-block">
                    <label htmlFor="mobile-currency" className="sr-only">
                      Currency
                    </label>
                    <div className="-ml-2 group relative border-transparent rounded-md focus-within:ring-2 focus-within:ring-white">
                      {/* <select
                        id="mobile-currency"
                        name="currency"
                        className="bg-none border-transparent rounded-md py-0.5 pl-2 pr-5 flex items-center text-sm font-medium text-gray-700 group-hover:text-gray-800 focus:outline-none focus:ring-0 focus:border-transparent"
                      >
                        {currencies.map((currency) => (
                          <option key={currency}>{currency}</option>
                        ))}
                      </select> */}
                      <div className="absolute right-0 inset-y-0 flex items-center pointer-events-none">
                        <svg
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                          className="w-5 h-5 text-gray-500"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M6 8l4 4 4-4"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      {/* <header className="relative">TODO: Add Navbar Component Here</header> */}

      <main className="content-center col-span-10 lg:col-span-8">
        <section className="mx-auto text-center w-full">
          <h1
            onClick={handleClick}
            className="text-2xl w-1/2 mt-5 mx-auto py-5 cursor-pointer font-bold text-gray-900 rounded-lg bg-green-100 transform transition duration-200 hover:scale-105 hover:bg-green-300"
          >
            Load Saved Boxes
          </h1>
        </section>
        <div className="">
          {boxes &&
            boxes.map((box) => (
              <div className="flow-root">
                <div key={box._id} className="py-0 sm:flex">
                  <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
                    <div className="grid grid-cols-2 grid-rows-2 gap-4">
                      {box.images.map((imageUrl) =>
                        imageUrl.split(":")[0] === "http" ? (
                          <img
                            src={imageUrl}
                            alt="box-img"
                            className="flex-none w16 h-16 transform hover:scale-105 transition duration-200 rounded-md object-center object-cover"
                          />
                        ) : (
                          <li>{imageUrl}</li>
                        )
                      )}
                    </div>
                    <div className="pt-1.5 min-w-0 flex-1 sm:pt-0">
                      {
                        <h3 className="text-md font-medium text-gray-900">
                          <a href={"/box/" + box._id}>{box.name}</a>
                          <p>{box.packingDate}</p>
                        </h3>
                      }
                      <p className="text-md text-gray-500 truncate">
                        <span>{box.description}</span>{" "}
                        <span className="mx-1 text-gray-400" aria-hidden="true">
                          &middot;
                        </span>{" "}
                        <span>{box.isFragile === true ? "Fragile Box" : ""}</span>
                      </p>
                      <p className="mt-1 font-medium text-gray-900">{box.price}</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4 mx-5 sm:mt-0 sm:ml-6 sm:flex-none sm:w-40">
                    <button
                      type="button"
                      className="w-full mb-5 flex items-center justify-center bg-purple-400 py-2 px-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-full sm:flex-grow-0"
                    >
                      Moving
                    </button>
                    <a href={"/box/" + box._id}>
                      <button
                        type="button"
                        className="w-full flex items-center justify-center bg-green-400 py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-full sm:flex-grow-0"
                      >
                        More info
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          {(loading || !boxes.length) && (
            <div className="">
              <div className="flow-root">
                <div className="py-0 sm:flex">
                  <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
                    <div className="grid grid-cols-2 grid-rows-2 gap-4">
                      <div className="flex-none w16 h-16 transform hover:scale-105 transition duration-200 rounded-md object-center object-cover bg-gray-400"></div>
                    </div>
                    <div className="pt-1.5 min-w-0 flex-1 sm:pt-0">
                      <h3 className="text-md font-medium text-gray-900">
                        <a href={"/profile"} className="bg-gray-400 rounded-lg h-2"></a>
                        <p className="bg-gray-400 rounded-lg h-2"></p>
                      </h3>
                      <p className="text-md text-gray-500 truncate">
                        <span className="bg-gray-400 rounded-lg h-2"></span>{" "}
                        <span className="mx-1 text-gray-400" aria-hidden="true">
                          &middot;
                        </span>{" "}
                        <span className="bg-gray-400 rounded-lg h-2"></span>
                      </p>
                      <p className="mt-1 font-medium text-gray-900"></p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4 mx-5 sm:mt-0 sm:ml-6 sm:flex-none sm:w-40">
                    <button
                      type="button"
                      className="w-full mb-5 flex items-center justify-center bg-purple-400 py-2 px-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-full sm:flex-grow-0"
                    ></button>
                    <a href={"/profile"}>
                      <button
                        type="button"
                        className="w-full flex items-center justify-center bg-green-400 py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-full sm:flex-grow-0"
                      ></button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/*  <footer aria-labelledby="footer-heading" className="">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 grid grid-cols-2 gap-8 sm:gap-y-0 sm:grid-cols-2 lg:grid-cols-4">
            <div className="grid grid-cols-1 gap-y-10 lg:col-span-2 lg:grid-cols-2 lg:gap-y-0 lg:gap-x-8">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Account</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.account.map((item) => (
                    <li key={item.name} className="text-sm">
                      <a href={item.href} className="text-gray-500 hover:text-gray-600">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Service</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.service.map((item) => (
                    <li key={item.name} className="text-sm">
                      <a href={item.href} className="text-gray-500 hover:text-gray-600">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-10 lg:col-span-2 lg:grid-cols-2 lg:gap-y-0 lg:gap-x-8">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Company</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.company.map((item) => (
                    <li key={item.name} className="text-sm">
                      <a href={item.href} className="text-gray-500 hover:text-gray-600">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Connect</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.connect.map((item) => (
                    <li key={item.name} className="text-sm">
                      <a href={item.href} className="text-gray-500 hover:text-gray-600">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 py-10 sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center justify-center text-sm text-gray-500">
              <p>Shipping to Canada ($CAD)</p>
              <p className="ml-3 border-l border-gray-200 pl-3">English</p>
            </div>
            <p className="mt-6 text-sm text-gray-500 text-center sm:mt-0">&copy; 2021 Clothing Company, Ltd.</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
