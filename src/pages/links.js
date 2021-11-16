/*
  This example requires Tailwind CSS v2.0+ 
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Example() {
  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
      <div className="min-h-full min-w-full flex">
        <div className="flex-1 flex flex-col justify-center">
          <div className="mx-auto w-full max-w-md text-center">
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">More info</h2>
              <p className="mt-8 text-lg text-gray-600">
              Here you can find more info related to movers, boxes, shipping and more!              
              </p>
            </div>

            <div>
              <div className="mt-8">
                <a href="https://www.uhaul.com/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  U-Haul
                </a>
              </div>
              <div className="mt-8">
                <a href="https://fewmoves.com/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Few Moves
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
