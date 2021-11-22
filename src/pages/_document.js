import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>{/* <link rel='shortcut icon' href='/favicon.ico' /> */}</Head>
        <body>
          <Main />
          <NextScript />
          <footer aria-labelledby="footer-heading" className="flex justify-between bg-purple-500 bg-gradient-to-t from-purple-700 border-t border-gray-200 py-10 px-8">
        <p className="text-white">
          © BoxIt 2021:        
          <span className="ml-2 py-1 px-2 bg-green-100 rounded-lg border text-gray-800 border-gray-900 hover:bg-green-300">
            Abhinav Biju
          </span>
          <span className="ml-2 py-1 px-2 bg-green-100 rounded-lg border text-gray-800 border-gray-900 hover:bg-green-300">
            Ralph Pierre
          </span>
          <span className="ml-2 py-1 px-2 bg-green-100 rounded-lg border text-gray-800 border-gray-900 hover:bg-green-300">
            Catherine Clifford
          </span>
          <span className="ml-2 py-1 px-2 bg-green-100 rounded-lg border text-gray-800 border-gray-900 hover:bg-green-300">
            Malik Harris
          </span>
          <span className="ml-2 py-1 px-2 bg-green-100 rounded-lg border text-gray-800 border-gray-900 hover:bg-green-300">
            Tysean Hill
          </span>
        </p>
        <a href="contact" className="text-white">
          Contact Us
        </a>
      </footer>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
