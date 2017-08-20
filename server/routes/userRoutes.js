const userRoutes = (router) => {
  router.route('/api/users')
    .get(function (req, res, next) {
      res.send('Hello From UserRoutes!!!');
    })
};
export default userRoutes;
