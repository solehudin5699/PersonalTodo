// const { admin, db } = require("../util/admin");
// const config = require("../util/config");

// const firebase = require("firebase");

// firebase.initializeApp(config);

import db, { auth } from "../firebase";

// const { validateLoginData, validateSignUpData } = require('../util/validators');

// Login
export const loginUser = (request) => {
  const user = {
    email: request.email,
    password: request.password,
  };
  auth
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      console.log(data);
      return data.user.getIdToken();
    })
    .then((token) => {
      db.collection("users")
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
          return dataLogin;
        })
        .catch((err) => {
          return { status: 500, msg: "Something is wrong" };
        });
    })
    .catch((error) => {
      return { status: 500, msg: "wrong credentials, please try again" };
    });
};

// // Sign up
export const signUpUser = (request) => {
  const newUser = {
    name: request.name,
    email: request.email,
    password: request.password,
    username: request.username,
  };
  let token, userId;
  db.doc(`/users/${newUser.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("1");
        return { status: 500, msg: "Username is already registered" };
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
            console.log("4");
            return { status: 200, msg: "Registration is suceess" };
          })
          // .catch((err) => {
          //   console.log("5");
          //   return {
          //     status: 500,
          //     msg: "Registration is failed, please try again",
          //   };
          // });
      }
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return { status: 500, email: "Email already in use" };
      } else {
        return {
          status: 500,
          general: "Something went wrong, please try again",
        };
      }
    });
};
// // // Sign up
// export const signUpUser = (request) => {
//   const newUser = {
//     name: request.name,
//     email: request.email,
//     password: request.password,
//     username: request.username,
//   };

//   // const { valid, errors } = validateSignUpData(newUser);

//   // if (!valid) return response.status(400).json(errors);

//   let token, userId;
//   db.doc(`/users/${newUser.username}`)
//     .get()
//     .then((doc) => {
//       if (doc.exists) {
//         return {status:500, msg: "Username is already registered" };
//       } else {
//         return auth.createUserWithEmailAndPassword(
//           newUser.email,
//           newUser.password
//         );
//       }
//     })
//     .then((data) => {
//       userId = data.user.uid;
//       return data.user.getIdToken();
//     })
//     .then((idtoken) => {
//       token = idtoken;
//       const userCredentials = {
//         name: newUser.name,
//         username: newUser.username,
//         email: newUser.email,
//         createdAt: new Date().toISOString(),
//         userId,
//       };
//       return db.doc(`/users/${newUser.username}`).set(userCredentials);
//     })
//     .then(() => {
//       return { status: 200, msg: "Registration is suceess" };
//     })
//     .catch((err) => {
//       console.error(err);
//       if (err.code === "auth/email-already-in-use") {
//         return { status: 500, email: "Email already in use" };
//       } else {
//         return {
//           status: 500,
//           general: "Something went wrong, please try again",
//         };
//       }
//     });
// };

// deleteImage = (imageName) => {
//     const bucket = admin.storage().bucket();
//     const path = `${imageName}`
//     return bucket.file(path).delete()
//     .then(() => {
//         return
//     })
//     .catch((error) => {
//         return
//     })
// }

// // Upload profile picture
// exports.uploadProfilePhoto = (request, response) => {
//     const BusBoy = require('busboy');
// 	const path = require('path');
// 	const os = require('os');
// 	const fs = require('fs');
// 	const busboy = new BusBoy({ headers: request.headers });

// 	let imageFileName;
// 	let imageToBeUploaded = {};

// 	busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
// 		if (mimetype !== 'image/png' && mimetype !== 'image/jpeg') {
// 			return response.status(400).json({ error: 'Wrong file type submited' });
// 		}
// 		const imageExtension = filename.split('.')[filename.split('.').length - 1];
//         imageFileName = `${request.user.username}.${imageExtension}`;
// 		const filePath = path.join(os.tmpdir(), imageFileName);
// 		imageToBeUploaded = { filePath, mimetype };
// 		file.pipe(fs.createWriteStream(filePath));
//     });
//     deleteImage(imageFileName);
// 	busboy.on('finish', () => {
// 		admin
// 			.storage()
// 			.bucket()
// 			.upload(imageToBeUploaded.filePath, {
// 				resumable: false,
// 				metadata: {
// 					metadata: {
// 						contentType: imageToBeUploaded.mimetype
// 					}
// 				}
// 			})
// 			.then(() => {
// 				const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
// 				return db.doc(`/users/${request.user.username}`).update({
// 					imageUrl
// 				});
// 			})
// 			.then(() => {
// 				return response.json({ message: 'Image uploaded successfully' });
// 			})
// 			.catch((error) => {
// 				console.error(error);
// 				return response.status(500).json({ error: error.code });
// 			});
// 	});
// 	busboy.end(request.rawBody);
// };

// exports.getUserDetail = (request, response) => {
//     let userData = {};
// 	db
// 		.doc(`/users/${request.user.username}`)
// 		.get()
// 		.then((doc) => {
// 			if (doc.exists) {
//                 userData.userCredentials = doc.data();
//                 return response.json(userData);
// 			}
// 		})
// 		.catch((error) => {
// 			console.error(error);
// 			return response.status(500).json({ error: error.code });
// 		});
// }

// exports.updateUserDetails = (request, response) => {
//     let document = db.collection('users').doc(`${request.user.username}`);
//     document.update(request.body)
//     .then(()=> {
//         response.json({message: 'Updated successfully'});
//     })
//     .catch((error) => {
//         console.error(error);
//         return response.status(500).json({
//             message: "Cannot Update the value"
//         });
//     });
// }
