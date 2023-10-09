const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRepository = require("../repository/user-repository");
const { JWT_KEY } = require("../config/serverConfig");
class UserService {
  constructor() {
    this.userRepository = new userRepository();
  }
  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }
  async signIn(email, plainPassword) {
    try {
        // step 1 -> fetch the user using email
        const user = await this.userRepository.getByEmail(email);
        // step 2 -> compare the the incoming plain password with the stored encrypted password
        const passwordsMatch = this.checkPassword(plainPassword, user.password);
        if(!passwordsMatch){
            console.log("Passwords don't match");
            throw {error: "Incorrect password"};
        }
        // step 3 -> if passwords match, create a new JWT and return it
        const newJWT = this.createToken({email: user.email, id: user.id});
        return newJWT;
    } catch (error) {
      console.log("Something went wrong in the sign in process");
      throw error;
    }
  }
  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return result;
    } catch (error) {
      console.log("Something went wrong in token creation");
      throw error;
    }
  }
  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something went wrong in token validation", error);
      throw error;
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in password comparison");
      throw error;
    }
  }
}
module.exports = UserService;
