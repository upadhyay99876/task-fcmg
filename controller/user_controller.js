const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const User = require("../model/user_model");
const { registerValidation, loginValidation } = require("../middleware/validation");


// user created 
exports.signUp = async (req, res, next) => {
  const { error, value } = registerValidation(req.body);
  if (error) return res.json(error.details[0].message);
//***CHECK IF EMAIL EXISTS */
  const emailExist = await User.findOne({ email: req.body.email }); 
  if (emailExist) return res.json({ message: "Email already exist!" });

  try {
    const newUser = await createUserObj(req);
    const savedUser = await User.create(newUser);
    return res.json({
      status: 200,
      message: "User created successfully",
      user: savedUser
    })
  } catch (err) {
    return res.json({
      status: 400,
      message: "User creation failed",
      error: err
    })
  }
};

// login
exports.logIn = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error)
    return res.json({
      status: 400,
      message: error.details[0].message,
    })



  const foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser)
    return res.json({
      status: 400,
      message: "invalid login credential"
    })

  try {
    const isMatch = await bcrypt.compareSync(req.body.password, foundUser.password);
    if (!isMatch) 
    return res.json({
      status: 400,
      message: "invalid login credential"
    })

    // create and assign jwt
    //here jwt key=12345
    const token = await jwt.sign({ _id: foundUser._id }, "12345");

    return res.status(200).header("auth-token", token).send({ "auth-token": token, userId: foundUser._id });

  } catch (error) {
    return res.json({
      status: 400,
      error
    })
  }
};

/***********UPDATE USER USING TOKEN */
exports.updateUser = async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10); //encrypt the password before updating
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, { $set: req.body }, { new: true });

    if (!updatedUser) {
      return res.json({ message: "Could not update user" });
    }
    return res.json({ message: "User updated successfully",status:200, updatedUser });

  } catch (error) {
    return res.json({ error: "An error has occurred, unable to update user",status:400 });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId); 
    if (!deletedUser) {
      return res.json({ message: "Could not delete user",status:400 });
    }
    return res.json({ message: "User deleted successfully",status:200, user: deletedUser });
  } catch (error) {
    return res.json({ error: "An error has occurred, unable to delete user",status:400 });
  }
};

exports.data = async (req, res) => {
  return res.json({
    posts: {
      title: "User Authentication",
      description: "random data you can access because you\'re authenticated",
    },
  });
};

const createUserObj = async (req) => {
  return {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
  };
}
