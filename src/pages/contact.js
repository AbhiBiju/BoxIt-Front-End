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
      <div className="min-h-full flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-48">
          <div className="mx-auto w-full max-w-md lg:w-96">
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

        
        <div className="bg-purple-100 min-h-full lg:block relative w-full flex">
          <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-10 xl:px-52">
            <form action="#" method="POST" className="mt-6 space-y-6">

              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name:
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email:
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject:
                </label>
                <div className="mt-1">
                  <input
                    id="subject"
                    name="subject"
                    type="subject"
                    autoComplete="subject"
                    required
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message:
                </label>
                <div className="mt-1">
                  <input
                    id="message"
                    name="message"
                    type="message"
                    autoComplete="message"
                    required
                    className="appearance-none block w-full px-3 py-12 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <div>
                    <button className="mt-6 py-2 px-4 bg-green-100 rounded-md border border-gray-900 hover:bg-green-300">
                      Submit
                    </button>
                  </div>
                </div>
              </div>             
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
