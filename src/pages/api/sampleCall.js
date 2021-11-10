import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => {
  const session = getSession(req, res);
  return new Promise((resolve) => {
    if (req.method !== 'GET') {
      res.status(405).json({ msg: 'Method not allowed' });
      return resolve();
    }

    fetch('https://jsonplaceholder.typicode.com/todos/')
      .then((response) => response.json())
      .then((data) => {
        res.status(200).json(JSON.stringify(data));
        return resolve();
      })
      .catch((e) => {
        res.status(500).json({ msg: 'Something Went Wrong' });
        return resolve();
      });
  });
});
