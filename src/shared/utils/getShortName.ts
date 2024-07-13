const getShortName = (name: string) => {
  if (name.split(' ').length < 8)
    return name
      .split(' ')
      .map((string) => string[0].toUpperCase() + string.slice(1).toLowerCase())
      .join(' ');
  return `${name
    .split(' ')
    .slice(0, 8)
    .map((string) => string[0].toUpperCase() + string.slice(1).toLowerCase())
    .join(' ')}...`;
};

export default getShortName;
