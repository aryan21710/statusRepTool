exports.userSignupValidator = (req, res, next) => {
    console.log('req.body in userSignupValidator',req.body)
    req
      .check("name", "Invalid or Missing Name")
      .notEmpty()
      .withMessage("Missing Name")
      .matches(/[a-zA-Z]+(.*)/g)
      .withMessage("Invalid Name")
      .trim()
      .isLength({ min: 3, max: 32 })
      .withMessage("Name must be between 3 to 32 characters");
    req
      .check("email", "Email must be between 3 to 32 characters")
      .notEmpty()
      .withMessage("Missing Email")
      .matches(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      .withMessage("Invalid Email")
      .isLength({
        min: 4,
        max: 32,
      });
  
    req
      .check("password")
      .notEmpty()
      .withMessage("Missing Password")
      .isLength({ min: 6 })
      .withMessage("Password must contain at least 6 characters")
      .matches(/\d/)
      .withMessage("Password must contain a number");
    const errors = req.validationErrors();
    if (errors) {
      const firstError = errors.map((error) => error.msg)[0];
      return res.status(400).json({ error: firstError });
    }
    next();
  };