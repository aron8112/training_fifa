const { userProvider, playerProvider } = require('../providers');
const { encryptPassword, decryptPassword } = require('../auth/encryption');
const { tokenSign } = require('../auth/authorization');

const login = async (data) => {
  const { email, password } = data;

  let loggedUser = await userProvider.login(email);
  // console.log(loggedUser);

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

const signIn = async (data) => {
  // console.log(newUserData);
  let newUser = await userProvider.createNew(data);

  if (newUser) {
    const token = tokenSign(newUser);
    return token;
  }
  throw new Error('Something happened while creating new user. Please try again!');
};

const findById = async (id) => {
  let foundUser = await userProvider.login(id);
  // console.log(foundUser);

  if (foundUser) {
    return foundUser;
  } else {
    throw new Error('User not found');
  }
};

const updateUser = async (id, data) => {
  let idInt = parseInt(id);
  let userExist = await findById(idInt);
  if (userExist) {
    return (await playerProvider.updateData(data, { where: { id: idInt } }))
      ? true
      : new Error('Unable to fulfill request');
  } else {
    throw new Error('User not found');
  }
};

const delUser = async () => {
  let idInt = parseInt(id);
  let userExist = await findById(idInt);
  if (userExist) {
    return (await playerProvider.deleteData(idInt)) ? true : new Error('Unable to fulfill request');
  } else {
    throw new Error('User not found');
  }
};

module.exports = {
  login,
  signIn,
  findById,
  updateUser,
  delUser,
};
