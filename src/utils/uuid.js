const guid = () => {
  const s4 = () => (
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  );
  const s8 = () => s4() + s4();
  return `${s8()}${s8()}`;
};

export default guid;
