const userRoutes = (router) => {
  router.route('/api/users')
    .get((req, res) => {
      res.send('Hello From UserRoutes!!!');
    });
};
export default userRoutes;
