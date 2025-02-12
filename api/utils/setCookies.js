const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true, // prevent xss attacks cross site scripting (xss attack)
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevent csrf attacks  cross site request forgery (csrf attack)
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // prevent xss attacks cross site scripting (xss attack)
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevent csrf attacks  cross site request forgery (csrf attack)
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export default setCookies;
