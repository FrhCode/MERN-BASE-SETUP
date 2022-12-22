import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import jwt_payload_value from "../types/jwt_payload_value";
dotenv.config();

type props = {
  name: string;
  id: string;
  roles: string[];
};

const signToken = ({ name, id, roles }: props) => {
  const jwtData: jwt_payload_value = { userName: name, userId: id, roles };

  return jwt.sign(jwtData, process.env.SECRET_KEY!, {
    expiresIn: "4h"
  });
};

export default signToken;
