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
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900"> Get in Touch</h2>
              <p className="mt-8 text-sm text-gray-600">
              They would indulge in prophecies of the last judgment, and back their threats with a string of strange, half-frantic and utterly unmeaning sounds, the sense of which no one with any intelligence could discover.               
              </p>
            </div>

            <div className="mt-8">
              <div>
                <div>
                  <p className="text-sm font-medium text-gray-800">123 Sesame Street</p>
                  <p className="text-sm font-medium text-gray-800">BuckingHam Place</p>
                </div>

                <div className="mt-6 relative">
                  <div className="items-center" aria-hidden="true">
                    <p className="text-sm font-medium text-gray-800">📞 +1 (123) 456-7890</p>
                    <p className="text-sm font-medium text-gray-800">✉ support@gmail.com</p>
                  </div>
                  <div>
                    <p className="mt-6 text-sm font-medium text-gray-700 text-decoration: underline">Github links</p>
                    <p className="text-sm font-medium flex">LINKS TO GITHUB AND LINKEDLN HERE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
