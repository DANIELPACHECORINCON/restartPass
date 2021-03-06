import jwt from "jsonwebtoken";
import moment from "moment";

const generateToken = async (user) => {//user es el json
  let message =false;
  try {
    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        iat: moment().unix(),
      },
      process.env.SK_JWT
    );
  } catch (e) {
    return (message);
  }
};

export default { generateToken };
