const userRoutes = (router) => {

  router.route('/')
    .get(function(req, res, next) {
      res.send("Hello From UserRoutes!!!");
    })
};
export default userRoutes;
