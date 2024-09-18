const { userProvider } = require('../providers');
const { decryptPassword } = require('../auth/encryption');
const { tokenSign } = require('../auth/authorization');

const login = async (data) => {
  const { email, password } = data;

  let loggedUser = await userProvider.login(email);
  console.log(loggedUser);

  if (loggedUser) {
    let passwordToCompare = await decryptPassword(password, loggedUser.password);
    // console.log(passwordToCompare);
    if (passwordToCompare) {
      const token = tokenSign(loggedUser);
      return token;
    } else {
      throw new Error('Wrong email or password');
    }
  }
  throw new Error('Wrong email or password');
};

module.exports = {
  login,
};
