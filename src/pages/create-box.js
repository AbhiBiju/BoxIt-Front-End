/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MenuIcon, XIcon, ChevronDownIcon } from "@heroicons/react/outline";

import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";
import dynamic from "next/dynamic";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faBed, faUmbrellaBeach, faCouch, faBriefcase, faBath } from "@fortawesome/free-solid-svg-icons";

import iconList from "../utils/iconList";
import { kebab, formatDate } from "../utils/helpers";

import { useMutation } from "@apollo/client";
import { ADD_BOX } from "../utils/mutations";
import auth from "../utils/auth";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CreateBox() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isIcons, setIconState] = useState(true);

  /* Icon variables */
  const [categories, setCategories] = useState([
    { name: "Kitchen", icon: faUtensils, current: true },
    { name: "Bedroom", icon: faBed, current: false },
    { name: "Bathroom", icon: faBath, current: false },
    { name: "Office", icon: faBriefcase, current: false },
    { name: "Living Room", icon: faCouch, current: false },
    { name: "Patio", icon: faUmbrellaBeach, current: false },
  ]);

  const [icons, setIcons] = useState(iconList["Kitchen"]);
  const [boxList, setBoxList] = useState([]);

  const handleIconChange = (name) => {
    let iconArr = iconList[name] || [];
    setIcons(iconArr);
  };

  const handleIconClick = (name) => {
    let updatedBox = boxList.indexOf(name) === -1 ? [...boxList, name] : boxList;
    setBoxList(updatedBox);
  };

  const handleRemoveItem = (name) => {
    let removedItemArr = [...boxList].filter((item) => item !== name);
    setBoxList(removedItemArr);
  };

  /* Dropbox variables */
  const [files, setFiles] = useState([]);
  const [imageSrc, setImageSrc] = useState(undefined);

  const updateFiles = (incommingFiles) => {
    setFormState({ ...formState, images: [...incommingFiles] });
    setFiles(incommingFiles);
  };
  const onDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };
  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };
  const handleClean = (files) => {
    console.log("list cleaned", files);
  };

  /* Form variables */
  const [formState, setFormState] = useState({
    packingDate: new Date(),
    name: "",
    description: "",
    images: [],
    price: 0.99,
    isMoving: true,
    isFragile: false,
    userId: "",
  });

  const [submit, setSubmit] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const { packingDate, name, description, price, images, isMoving, isFragile, userId } = formState;

  useEffect(() => {
    const userInfo = auth.getProfile();
    setFormState({ ...formState, userId: userInfo.data._id });
  }, []);

  const encode = (data) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const [addBox] = useMutation(ADD_BOX);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let test = [];
    if (formState.images[0].file) {
      const url = "https://api.cloudinary.com/v1_1/dxqvdgvul/image/upload";
      let urlArr = [];

      for (let i = 0; i < images.length; i++) {
        const imgData = new FormData();
        let img = images[i].file;
        imgData.append("file", img);
        imgData.append("upload_preset", "box_app");

        fetch(url, { method: "POST", body: imgData })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            urlArr.push(data.url);
            test.push(data.url);
          });
      }
      setFormState({ ...formState, images: test });
    }

    const boxData = await addBox({
      variables: {
        packingDate: formState.packingDate,
        name: formState.name,
        description: formState.description,
        images: formState.images,
        isMoving: formState.isMoving,
        isFragile: formState.isFragile,
        price: formState.price,
        userId: formState.userId
      },
    });

    if (boxData.data) {
      setSubmit(true);
    }

    if (!errorMessage) {
      console.log("Submit Form", formState);
    }
  };

  const handleChange = (e) => {
    if (e.target.name.split("-").pop() === "num") {
      let iconsArr = [...images];

      let name = e.target.name.split("-");
      name.pop();

      let formatted = name.map((word) => word[0].toUpperCase() + word.substring(1)).join(" ");
      let value = e.target.value;

      let item = value + " " + formatted;

      let purgedArr = iconsArr.filter((icon) => !icon.includes(formatted));
      purgedArr.push(item);

      setFormState({ ...formState, images: purgedArr });
    }

    if (e.target.name === "isFragile") {
      let checked = e.target.checked;
      setFormState({ ...formState, isFragile: checked });
    }

    if (e.target.name === "price") {
      let val = e.target.value != "" ? parseInt(e.target.value) : 0;
      setFormState({ ...formState, price: val });
    }

    if (!e.target.value.length) {
      setErrorMessage(
        `${e.target.name[0].toUpperCase() + e.target.name.substring(1, e.target.name.length)} is required!`
      );
    } else {
      setErrorMessage("");
    }

    if (
      !errorMessage &&
      e.target.name !== "price" &&
      e.target.name !== "isFragile" &&
      e.target.name.split("-").pop() !== "num"
    ) {
      setFormState({ ...formState, [e.target.name]: e.target.value });
      console.log("Handle Form", formState);
    }
  };

  return (
    <>
      <div className="h-screen flex">
        {/* Sidebar for smaller screens*/}
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setSidebarOpen}>
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
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
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
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-900-text.svg"
                      alt="Workflow"
                    />
                  </div>
                  <div className="justify-center mt-4 flex">
                    <button
                      onClick={() => {
                        setIconState(true);
                      }}
                      className="bg-green-400 text-black text-sm mx-2 hover:bg-green-300 transition-all duration-300 transform hover:scale-105 rounded-lg p-3"
                    >
                      Pick Icons
                    </button>
                    <button
                      onClick={() => {
                        setIconState(false);
                      }}
                      className="bg-purple-500 text-white text-sm mx-2 hover:bg-purple-400 transition-all duration-300 transform hover:scale-105 rounded-lg p-3"
                    >
                      Upload Pics
                    </button>
                  </div>
                  <nav aria-label="Sidebar" className="mt-5">
                    <ul className="px-2 space-y-1">
                      {categories.map((item) => (
                        <li
                          key={item.name}
                          href={item.href}
                          onClick={() => {
                            const updatedCategories = categories.map((category) => {
                              const currentVal = category.name === item.name ? true : false;
                              return { ...category, current: currentVal };
                            });
                            handleIconChange(item.name);
                            setCategories(updatedCategories);
                          }}
                          className={classNames(
                            item.current
                              ? "bg-red-100 text-red-500"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md transition duration-200"
                          )}
                        >
                          <FontAwesomeIcon
                            icon={item.icon}
                            key={item.name}
                            className={classNames(
                              item.current ? "text-red-500" : "text-gray-400 group-hover:text-gray-500",
                              "mr-4 h-6 w-6 text-lg"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                  <a href="#" className="flex-shrink-0 group block">
                    <div className="flex items-center">
                      {/* <div>
                        <img
                          className="inline-block h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">Whitney Francis</p>
                        <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                      </div> */}
                    </div>
                  </a>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-gray-100">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-900-text.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="text-center mx-auto mt-4 flex">
                  <button
                    onClick={() => {
                      setIconState(true);
                    }}
                    className="bg-green-400 text-black text-sm mx-2 hover:bg-green-500 transition-all duration-300 transform hover:scale-105 rounded-lg p-3"
                  >
                    Pick Icons
                  </button>
                  <button
                    onClick={() => {
                      setIconState(false);
                    }}
                    className="bg-purple-400 text-black text-sm mx-2 hover:bg-purple-500 transition-all duration-300 transform hover:scale-105 rounded-lg p-3"
                  >
                    Upload Pics
                  </button>
                </div>
                <nav className="mt-5 flex-1" aria-label="Sidebar">
                  <ul className="px-2 space-y-1">
                    {categories.map((item) => (
                      <li
                        key={item.name}
                        onClick={() => {
                          const updatedCategories = categories.map((category) => {
                            const currentVal = category.name === item.name ? true : false;
                            return { ...category, current: currentVal };
                          });
                          handleIconChange(item.name);
                          setCategories(updatedCategories);
                        }}
                        className={classNames(
                          item.current
                            ? "bg-red-100 text-red-500"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "group flex items-center cursor-pointer px-2 py-2 text-sm font-medium rounded-md transition duration-200"
                        )}
                      >
                        <FontAwesomeIcon
                          icon={item.icon}
                          key={item.name}
                          className={classNames(
                            item.current ? "text-red-500" : "text-gray-400 group-hover:text-gray-500",
                            "mr-3 h-6 w-6 text-lg"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <div className="lg:hidden">
            <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
              <div>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
              </div>
              <div>
                <button
                  type="button"
                  className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-5 grid-rows-5 md:grid-cols-5 md:grid-rows-1 h-full overflow-hidden">
            <main className="col-span-5 row-start-1 row-end-3 md:col-start-1 md:col-end-4 md:row-span-1 overflow-y-auto h-full focus:outline-none">
              {/* Start main area*/}
              <div className="h-full py-6 overflow-hidden px-4 sm:px-6 lg:px-8">
                <div className="h-full flex justify-center items-start bg-purple-100 border-2 border-gray-600 border-dashed rounded-lg">
                  {isIcons ? (
                    <div className="grid grid-cols-5 grid-rows-5 gap-3 m-5">
                      {icons.map((icon) => (
                        <div key={icon.name}>
                          <img
                            className="w-20 cursor-pointer transform hover:scale-110 hover:opacity-70 transition-all duration-200"
                            data-for="icon"
                            data-iscapture="true"
                            data-tip={icon.name}
                            alt={icon.name}
                            src={icon.path}
                            onClick={() => handleIconClick(icon.name)}
                          />
                          <ReactTooltip
                            key={"tooltip " + icon.name}
                            className="text-xl font-black opacity-100"
                            id="icon"
                            place="top"
                            type="light"
                            effect="solid"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Dropzone
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        padding: "50px 0 0 0",
                        backgroundColor: "rgba(237, 233, 254)",
                      }}
                      onChange={updateFiles}
                      minHeight="190px"
                      onClean={handleClean}
                      value={files}
                      maxFiles={10}
                      maxFileSize={2998000}
                      label="Drag'n drop files here or click to browse"
                      accept=".png, .jpeg, image/*"
                      uploadingMessage={"Uploading..."}
                      url=""
                      clickable={true}
                    >
                      <div className="m-5 p-2 grid gap-10 grid-cols-2 lg:grid-cols-3 grid-rows-auto">
                        {files.map((file) => (
                          <FileItem {...file} key={file.id} onDelete={onDelete} onSee={handleSee} preview info hd />
                        ))}
                      </div>
                      <FullScreenPreview
                        imgSource={imageSrc}
                        openImage={imageSrc}
                        onClose={(e) => handleSee(undefined)}
                      />
                    </Dropzone>
                  )}
                </div>
              </div>
              {/* End main area */}
            </main>
            <aside className="mb-4 flex flex-col col-span-5 row-start-3 row-end-6 md:col-start-4 md:col-end-6 md:row-span-1 border-l border-gray-200 overflow-y-auto">
              {/* Start secondary column (hidden on smaller screens) */}
              <div className="h-full py-6 px-4 sm:px-6 lg:px-8">
                <form
                  name="create-box"
                  method="post"
                  onSubmit={handleSubmit}
                  className="h-full bg-purple-100 border-2 border-gray-600 border-dashed overflow-scroll rounded-lg"
                >
                  {isIcons && (
                    <div>
                      <ul className="m-5 p-3 h-48 flex-col overflow-y-scroll">
                        {boxList.map((item) => (
                          <li
                            className="w-full group bg-purple-200 hover:bg-purple-300 transition duration-200 transform hover:scale-105 rounded-lg p-2 my-2 flex justify-between"
                            key={item}
                          >
                            {item}
                            <div className="flex justify-between gap-2">
                              <input
                                min="1"
                                max="99"
                                key={item + "-input"}
                                name={kebab(item) + "-num"}
                                defaultValue="1"
                                className="w-12 rounded-lg px-2 appearance-none"
                                type="number"
                                onChange={handleChange}
                              />
                              <button
                                onClick={() => {
                                  handleRemoveItem(item);
                                }}
                                className="flex justify-center items-center h-7 w-7 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group-hover:bg-gray-100 transition-all duration-200"
                              >
                                <XIcon className="h-6 w-6 text-black" aria-hidden="true" />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                        }}
                        className="w-8 h-8 mx-auto group flex items-center justify-center rounded-full border border-black transition duration-500 transform hover:scale-110 active:scale-80"
                      >
                        <ChevronDownIcon className="h-6 w-6 text-lg text-black" />
                      </button>
                    </div>
                  )}
                  <div className="px-5 w-full md:w-1/2 gap-4 flex flex-col">
                    <div>
                      <label>Packing Date: </label>
                      <input
                        onBlur={handleChange}
                        disabled
                        defaultValue={formatDate(packingDate)}
                        name="packingDate"
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="mx-1" htmlFor="name">
                        Name of Box:
                      </label>
                      <input
                        onBlur={handleChange}
                        className="rounded-sm px-1 border border-gray-600"
                        type="text"
                        name="name"
                      />
                    </div>
                    <div>
                      <label className="mx-1" htmlFor="description">
                        Box Info:
                      </label>
                      <input
                        onBlur={handleChange}
                        className="rounded-sm px-1 border border-gray-600"
                        type="text"
                        name="description"
                      />
                    </div>
                    <div>
                      <label className="mx-1" htmlFor="price">
                        Box Value:
                      </label>
                      <input
                        onBlur={handleChange}
                        className="rounded-sm px-1 border border-gray-600"
                        type="text"
                        name="price"
                      />
                    </div>
                    <div className="flex items-center">
                      <label className="mx-1" htmlFor="description">
                        Fragile:
                      </label>
                      <input
                        onChange={handleChange}
                        className="rounded-sm w-5 h-5 px-1 border border-gray-600"
                        type="checkbox"
                        name="isFragile"
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div className="flex gap-5 mb-2 justify-center">
                <button className="rounded-lg p-3 bg-red-400 hover:bg-red-500 transition duration-300 transform hover:scale-105">
                  Delete Box
                </button>
                <button
                  onClick={handleSubmit}
                  className="rounded-lg p-3 bg-green-400 hover:bg-green-500 transition duration-300 transform hover:scale-105"
                >
                  Confirm Box
                </button>
              </div>
              {/* End secondary column */}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
