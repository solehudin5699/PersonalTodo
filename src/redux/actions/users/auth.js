import db, { auth } from "../../../services/firebase";
import { login, regist, logout, reset } from "./actionTypes";

// SIGN IN
export const loginUser = (data) => {
  return (dispatch) => {
    dispatch(loginPending());
    dispatch(resetError());
    const user = {
      email: data.email,
      password: data.password,
    };
    return (
      auth
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
          if (!data.user.emailVerified) {
            let error = {
              status: 500,
              msg:
                "Email has not been verified, please check email for verifying",
            };
            dispatch(loginRejected(error));
          } else {
            return data.user.getIdToken().then((token) => {
              return db
                .collection("users")
                .where("email", "==", user.email)
                .get()
                .then((dataUser) => {
                  let dataLogin;
                  dataUser.forEach((doc) => {
                    dataLogin = {
                      userId: doc.data().userId,
                      name: doc.data().name,
                      username: doc.data().username,
                      email: doc.data().email,
                      token,
                      status: 200,
                    };
                  });
                  dispatch(loginFulfilled(dataLogin));
                });
              // .catch((err) => {
              //   let error = { status: 500, msg: "Something is wrong" };
              //   dispatch(loginRejected(error));
              // });
            });
          }
        })
        // .then((token) => {
        //   return db
        //     .collection("users")
        //     .where("email", "==", user.email)
        //     .get()
        //     .then((dataUser) => {
        //       let dataLogin;
        //       dataUser.forEach((doc) => {
        //         dataLogin = {
        //           userId: doc.data().userId,
        //           name: doc.data().name,
        //           username: doc.data().username,
        //           email: doc.data().email,
        //           token,
        //           status: 200,
        //         };
        //       });
        //       dispatch(loginFulfilled(dataLogin));
        //     });
        //   // .catch((err) => {
        //   //   let error = { status: 500, msg: "Something is wrong" };
        //   //   dispatch(loginRejected(error));
        //   // });
        // })
        .catch((err) => {
          let error = {
            status: 500,
            msg: "Email or password is wrong, please try again",
          };
          dispatch(loginRejected(error));
        })
    );
  };
};
const loginPending = () => {
  return {
    type: login.pending,
  };
};
const loginFulfilled = (data) => {
  return {
    type: login.fulfilled,
    payload: data,
  };
};
const loginRejected = (error) => {
  return {
    type: login.rejected,
    payload: error,
  };
};

// SIGN UP
export const registUser = (data) => {
  return (dispatch) => {
    dispatch(registPending());
    dispatch(resetError());
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      username: data.username,
    };
    let token, userId;
    db.doc(`/users/${newUser.username}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          let error = { status: 500, msg: "Username is already registered" };
          dispatch(registRejected(error));
        } else {
          return auth
            .createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then((data) => {
              userId = data.user.uid;
              console.log("2");
              return data.user.getIdToken();
            })
            .then((idtoken) => {
              token = idtoken;
              const userCredentials = {
                name: newUser.name,
                username: newUser.username,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId,
              };
              console.log("3");
              return db.doc(`/users/${newUser.username}`).set(userCredentials);
            })
            .then(() => {
              auth.currentUser
                .sendEmailVerification()
                .then(() => {
                  let result = {
                    status: 200,
                    msg:
                      "Registration is suceess, please check your email for verivication",
                  };
                  dispatch(registFulfilled(result));
                })
                .catch((err) => {
                  let error = {
                    status: 500,
                    msg: "Can't send email verification",
                  };
                  dispatch(registRejected(error));
                });
            });
          // .catch((err) => {
          //   let error = {
          //     status: 500,
          //     msg: "Registration is failed, please try again",
          //   };
          //   dispatch(registRejected(error));
          // });
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.code === "auth/email-already-in-use") {
          let error = { status: 500, msg: "Email already in use" };
          dispatch(registRejected(error));
        } else {
          let error = {
            status: 500,
            msg: "Something went wrong, please try again",
          };
          dispatch(registRejected(error));
        }
      });
  };
};

const registPending = () => {
  return {
    type: regist.pending,
  };
};
const registFulfilled = (result) => {
  return {
    type: regist.fulfilled,
    payload: result,
  };
};
const registRejected = (error) => {
  return {
    type: regist.rejected,
    payload: error,
  };
};

//LOG OUT
export const logoutUser = () => {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch({
          type: logout.logout,
          payload: true,
        });
      })
      .catch((err) => {
        dispatch({
          type: logout.logout,
          payload: false,
        });
      });
  };
};

export const resetError = () => {
  return {
    type: reset.error,
  };
};
export const resetRegist = () => {
  return {
    type: reset.fulfilledRegist,
  };
};
