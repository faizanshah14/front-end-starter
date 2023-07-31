export function splitCamelCaseString(input) {
    return input.replace(/([A-Z])/g, ' $1').trim();
  }
export function splitCamelCaseKeys(objArray) {
    const newArray = objArray.map((obj) => {
      const newObj = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const newKey = splitCamelCaseString(key);
          newObj[newKey] = obj[key];
        }
      }
      return newObj;
    });
    return newArray;
  }
  