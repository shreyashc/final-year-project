import { env } from "../env";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { Startup, User, Visitor, StartupDetails } from "../models/entities";

// import firebase from "../firebase/config";
// import { v4 as uuid } from "uuid";

const MAX_AGE = 21 * 12 * 30 * 24 * 60 * 60;

/**
 * @param  {number} id
 * @param  {string} role
 * @param  {string} email
 */
const generateToken = (
  id: number,
  role: string,
  email: string,
  options?: {
    /**
     * extra data for token
     */
  }
) => {
  console.log(options);

  let tokenBody: any = { id, role, email };
  /**
   * to add extra data
   */
  return jwt.sign(tokenBody, env.app.accessTokenSecret, {
    expiresIn: MAX_AGE,
  });
};

/**
 * @param  {string} email
 * @param  {string} plainPassword
 * @param  {"customer"|"restaurant"} role
 * @param  {{restaurantDet?:restaurantDetIntf;customerDet?:customerDetInt;}} options
 */
const signUpUser = async (
  email: string,
  plainPassword: string,
  role: "investor" | "visitor" | "incubator" | "jobseeker" | "startup",
  options: any
) => {
  const password = await argon2.hash(plainPassword);
  try {
    const user = await User.create({ email, password, role });
    await user.save();

    if (role === "visitor") {
      await Visitor.create({
        displayName: options.displayName,
        userId: user.id,
      }).save();
    } else if (role === "startup") {
      await Startup.create({
        displayName: options.displayName,
        website: options.website,
        userId: user.id,
      }).save();
    }
    let returningUser = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    return { savedUser: returningUser, error: null };
  } catch (err) {
    if (err?.code === "23505") {
      return {
        savedUser: null,
        error: { message: "Email already registered" },
      };
    }
    return { savedUser: null, error: err };
  }
};

/**
 * @param  {string} email
 * @param  {string} plainPassword
 */
const loginUser = async (email: string, plainPassword: string) => {
  try {
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      const error = {
        field: "email",
        message: "Email not registered",
      };
      return { loggedInUser: null, error };
    }

    const valid = await argon2.verify(user.password, plainPassword);

    if (!valid) {
      const error = {
        field: "password",
        message: "incorrect password",
      };
      return { loggedInUser: null, error };
    }
    return {
      loggedInUser: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      error: null,
    };
  } catch (error) {
    return { loggedInUser: null, error };
  }
};

// const multer = multer2({
//   storage: multer2.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024,
//   },
// });

// const getImageURL = (file: Express.Multer.File): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     if (!file) {
//       reject("No image file");
//     }

//     const filename = `${file.originalname}_${Date.now()}`;

//     const bucket = firebase.storage().bucket();
//     const fileUpload = bucket.file("foodzy/" + filename);
//     const token = uuid();

//     const blobStream = fileUpload.createWriteStream({
//       gzip: true,
//       resumable: false,
//       contentType: file.mimetype,
//       public: true,
//       metadata: {
//         contentType: file.mimetype,
//         metadata: {
//           firebaseStorageDownloadTokens: token,
//         },
//       },
//     });

//     blobStream.on("error", () => {
//       reject("Something is wrong! Unable to upload at the moment.");
//     });

//     blobStream.on("finish", () => {
//       const url = new URL(
//         `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/foodzy%2F${filename}?alt=media&token=${token}`
//       );
//       resolve(url.toString());
//     });

//     blobStream.end(file.buffer);
//   });
// };

export { generateToken, MAX_AGE, signUpUser, loginUser };
