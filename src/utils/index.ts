const parseBool = (value: any): boolean => {
  if (!value) return false;
  if (typeof value === "object") return Object.keys(value).length > 0;

  switch (value) {
    case true:
    case "true":
    case 1:
    case "1":
    case "on":
    case "yes":
      value = true;
      break;
    case false:
    case "false":
    case 0:
    case "0":
    case "off":
    case "no":
      value = false;
      break;
    default:
      break;
  }
  return value;
};

export { parseBool };