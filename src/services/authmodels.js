import db, { auth } from "../firebase";

// const { validateLoginData, validateSignUpData } = require('../util/validators');

const authModel = {
  loginUser: (data) => {
    return new Promise((resolve, reject) => {
      const user = {
        email: data.email,
        password: data.password,
      };
      let checkUser = auth.signInWithEmailAndPassword(
        user.email,
        user.password
      );
      if (checkUser) {
        let idToken = data.user.getIdToken();
        if (idToken) {
          let dataUser = db
            .collection("users")
            .where("email", "==", user.email)
            .get();
          if (dataUser) {
            let dataLogin;
            dataUser.forEach((doc) => {
              dataLogin = {
                userId: doc.data().userId,
                name: doc.data().name,
                username: doc.data().username,
                email: doc.data().email,
                token: idToken,
              };
            });
            console.log(dataLogin);
            resolve(dataLogin);
          } else {
            reject({ msg: "Can not get data user" });
          }
        } else {
          reject({ msg: "Something is wrong, please try again" });
        }
      } else {
        reject({ msg: "wrong credentials, please try again" });
      }
    });
  },
};

export default authModel;
