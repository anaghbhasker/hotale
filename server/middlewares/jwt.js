import jwt from "jsonwebtoken";

export async function generateAuthToken(user) {
  const jwtSecretKey = process.env.JWT_SECRET;
  const token = jwt.sign(
    { _id: user._id, username: user.username, email: user.email },
    jwtSecretKey
  );
  return token;
}
export async function generateOwnerToken(owner) {
  const jwtSecretKey = process.env.JWT_SECRET;
  const token = jwt.sign(
    { _id: owner._id, username: owner.firstname, email: owner.email },
    jwtSecretKey
  );
  return token;
}

export async function generateAdminToken(admin) {
  const jwtSecretKey = process.env.JWT_SECRET;
  const token = jwt.sign({ _id: admin._id, email: admin.email }, jwtSecretKey);
  return token;
}

export async function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;
    return userId;
  } catch (err) {
    console.log(err.message);
  }
}

export async function adminJwt(req, res, next) {
  const token = req.headers["admintoken"];

  if (!token) {
    res.send({ status: "failed", message: "You need token" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({
          auth: false,
          status: "failed",
          message: "failed to authenticate",
        });
      } else {
        req.adminId = decoded._id;
        next();
      }
    });
  }
}

export async function ownerJwt(req, res, next) {
  const token = req.headers["ownertoken"];
  if (!token) {
    res.send({ status: "failed", message: "You need token" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({
          auth: false,
          status: "failed",
          message: "failed to authenticate",
        });
      } else {
        req.ownerId = decoded._id;
        next();
      }
    });
  }
}
