
export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken(); // Call the method on the instance
    const tokenName = user.role == "Admin" ? "admintoken" : "patienttoken";
                                                             
    res
        .status(statusCode)
        .cookie(tokenName, token, {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
        })
        .json({
            success: true,
            message,
            user,
            token,
        });
};
