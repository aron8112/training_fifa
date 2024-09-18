const regexForQueryParamsPag = (paramSent) => {
  const regex = /\?page=\d+$/;
  return regex.test(paramSent);
};

module.exports = {
  regexForQueryParamsPag,
};
