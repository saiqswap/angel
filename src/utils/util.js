/* eslint-disable eqeqeq */
export const objToUrlParams = (obj) => {
  var str = "";
  for (var key in obj) {
    if (str != "") {
      str += "&";
    }
    if (!Array.isArray(obj[key])) {
      str += key + "=" + encodeURIComponent(obj[key]);
    } else {
      for (let i = 0; i < obj[key].length; i++) {
        const element = obj[key][i];
        if (i > 0) {
          str += "&";
        }
        str += key + "=" + encodeURIComponent(element);
      }
    }
  }

  return `?${str}`;
};

export const objFromUrlParams = (search) => {
  if (!search) return {};

  search = search.replace("?", "");

  return JSON.parse(
    '{"' +
      decodeURI(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
};
