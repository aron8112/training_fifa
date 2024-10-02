const regexForQueryParamsPag = (paramSent) => {
  const regex = /\?page=\d+$/;
  return regex.test(paramSent);
};

let randomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `${r}, ${g}, ${b}`;
};

module.exports = {
  regexForQueryParamsPag,
  randomColor,
};
