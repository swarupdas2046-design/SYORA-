import jwt from "jsonwebtoken";

export const generateToken = (id, username) => {
  return jwt.sign({id: id, username: username }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};


