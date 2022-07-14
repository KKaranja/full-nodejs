const User = require("../model/User");

const handleLogout = async (req, res) => {
  // On client side also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //no content to send back

  const refreshToken = cookies.jwt;
  // is refresh token in the DB
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }
  // delete the refreshToken from the DB
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); //on production add "secure: true" - only serve on https
  res.sendStatus(204);
};

module.exports = { handleLogout };
