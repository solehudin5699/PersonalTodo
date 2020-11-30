import authModel from "./authmodels";

const authController = {
  loginUser: (data) => {
    authModel
      .loginUser(data)
      .then((result) => {
        console.log(result);
        return { status: 200, ...result };
      })
      .catch((err) => {
        return { status: 500, ...err };
      });
  },
};

export default authController;
