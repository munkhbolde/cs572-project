const jwt = require('jsonwebtoken')

//:1 check token for admin
check_token = function (req, res, next) {
  if (!req.headers.authorization) {
    res.status(401)
    res.json({ status: 401, url: req.url })
    return
  }

  const token = req.headers.authorization.split(' ')[1]
  jwt.verify(token, 'secret', function (err, decoded) {
    if (err || decoded.type !== 'admin') {
      res.status(401)
      res.json({ status: 401, url: req.url })
      return
    }
  })
  next()
}

//:1 check token for student
student_token = function (req, res, next) {
  if (!req.headers.authorization) {
    res.status(401);
    res.json({ status: 401, url: req.url });
    return;
  }
  next();
}

//:1 check token for admision staff
authenticatestaff = function (req, res, next) {
  const token = req.headers.authorization.split(' ')[1]
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
}
// endfold

exports.check_token = check_token
exports.studen_token = student_token
exports.authenticatestaff = authenticatestaff
