const emailFormatter = (email) => {
  return `@${email.split("@")[0]}`;
};

const displayNameFormatter = (displayName) => {
  return `${displayName.slice(0, 10)}...`;
};

export { emailFormatter, displayNameFormatter };
