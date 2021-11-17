import { Fragment, useState } from "react";
import { Dialog, Menu, Transition, Tab, Disclosure } from "@headlessui/react";
import {
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon,
  PlusSmIcon,
  MinusSmIcon,
} from "@heroicons/react/outline";

const product = {
  name: "Name of Box",
  price: "$4.99",
  rating: 4,
  images: [
    {
      id: 1,
      name: "Angled view",
      src: "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
      alt: "Angled front view with bag zipped and handles upright.",
    },
    // More images...
  ],
  colors: [
    {
      name: "Washed Black",
      bgColor: "bg-gray-700",
      selectedColor: "ring-gray-700",
    },
    { name: "White", bgColor: "bg-white", selectedColor: "ring-gray-400" },
    {
      name: "Washed Gray",
      bgColor: "bg-gray-500",
      selectedColor: "ring-gray-500",
    },
  ],
  description: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. .</p>
  `,
  details: [
    {
      name: "Edit Box Content",
      items: [],
    },
    // More sections...
  ],
};

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
  { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Documents", href: "#", icon: InboxIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
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
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-700">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-indigo-800 text-white"
                            : "text-indigo-100 hover:bg-indigo-600",
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow pt-5 bg-indigo-700 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg"
                alt="Workflow"
              />
            </div>
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-indigo-800 text-white"
                        : "text-indigo-100 hover:bg-indigo-600",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <item.icon
                      className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <main>
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8"></div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-4">
                  <div className="lg:grid lg:grid-cols-3 lg:gap-x-8 lg:items-start">
                    {/* Image gallery */}
                    <div>
                    <Tab.Group as="div" className="flex flex-col-reverse">
                      {/* Image selector */}
                      <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                        <Tab.List className="grid grid-cols-3 gap-6">
                          {product.images.map((image) => (
                            <Tab
                              key={image.id}
                              className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                            >
                              {({ selected }) => (
                                <>
                                  <span className="sr-only">{image.name}</span>
                                  <span className="absolute inset-0 rounded-md overflow-hidden">
                                    <img
                                      src={image.src}
                                      alt=""
                                      className="w-full h-full object-center object-cover"
                                    />
                                  </span>
                                  <span
                                    className={classNames(
                                      selected
                                        ? "ring-gray-500"
                                        : "ring-transparent",
                                      "absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none"
                                    )}
                                    aria-hidden="true"
                                  />
                                </>
                              )}
                            </Tab>
                          ))}

                          {product.images.map((image) => (
                            <Tab
                              key={image.id}
                              className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                            >
                              {({ selected }) => (
                                <>
                                  <span className="sr-only">{image.name}</span>
                                  <span className="absolute inset-0 rounded-md overflow-hidden">
                                    <img
                                      src={image.src}
                                      alt=""
                                      className="w-full h-full object-center object-cover"
                                    />
                                  </span>
                                  <span
                                    className={classNames(
                                      selected
                                        ? "ring-gray-500"
                                        : "ring-transparent",
                                      "absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none"
                                    )}
                                    aria-hidden="true"
                                  />
                                </>
                              )}
                            </Tab>
                          ))}

                          {product.images.map((image) => (
                            <Tab
                              key={image.id}
                              className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                            >
                              {({ selected }) => (
                                <>
                                  <span className="sr-only">{image.name}</span>
                                  <span className="absolute inset-0 rounded-md overflow-hidden">
                                    <img
                                      src={image.src}
                                      alt=""
                                      className="w-full h-full object-center object-cover"
                                    />
                                  </span>
                                  <span
                                    className={classNames(
                                      selected
                                        ? "ring-gray-500"
                                        : "ring-transparent",
                                      "absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none"
                                    )}
                                    aria-hidden="true"
                                  />
                                </>
                              )}
                            </Tab>
                          ))}
                        </Tab.List>
                      </div>

                      <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
                        {product.images.map((image) => (
                          <Tab.Panel key={image.id}>
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="w-full h-full object-center object-cover sm:rounded-lg"
                            />
                          </Tab.Panel>
                        ))}
                      </Tab.Panels>
                    </Tab.Group>
                    <button className="bg-purple-500 text-white py-2 px-5 rounded-md mx-auto mt-10 block">Edit Images</button>
                    </div>

                    {/* Product info */}
                    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        {product.name}
                      </h1>

                      <div className="mt-3">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl text-gray-900">
                          {product.price}
                        </p>
                      </div>

                      {/* Reviews */}

                      <div className="mt-6">
                        <h3 className="sr-only">Description</h3>

                        <div
                          className="text-base text-gray-700 space-y-6"
                          dangerouslySetInnerHTML={{
                            __html: product.description,
                          }}
                        />
                      </div>

                      <form className="mt-6">
                        {/* Colors */}
                        <div></div>

                        <div className="mt-10 flex sm:flex-col1">
                          <button
                            type="submit"
                            className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-50 focus:ring-indigo-400 sm:w-full"
                          >
                            Mark Moved
                          </button>
                        </div>
                      </form>

                      <section
                        aria-labelledby="details-heading"
                        className="mt-12"
                      >
                        <h2 id="details-heading" className="sr-only">
                          Additional details
                        </h2>

                        <div className="border-t divide-y divide-gray-200">
                          <h3 className="text-center text-lg mt-2 mb-8 font-bold">
                            Edit Box Content
                          </h3>
                          <div className="rounded-md border border-gray-50 h-16 w-full mt-2"></div>
                          <div className="rounded-md border border-gray-50 h-16 w-full mt-2"></div>
                          <div className="rounded-md border border-gray-50 h-16 w-full mt-2"></div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
