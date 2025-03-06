import jwt from "jsonwebtoken";

export const generateTokens = (userId, name) => {
  const accessToken = jwt.sign(
    { userId, name },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export default generateTokens;
