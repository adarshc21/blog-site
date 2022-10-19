module.exports = sendToken = async (res, user) => {
  const token = await user.getJwtToken();
  res
    .cookie("token", token, {
      expiresIn: "30d",
      httpOnly: true,
    })
    .json({
      success: true,
      user,
      token,
    });
};
