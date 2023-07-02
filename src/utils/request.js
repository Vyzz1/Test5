const DOMAIN = `https://json-demo-sigma.vercel.app/`;

export const get = async (path) => {
  const response = await fetch(DOMAIN + path);
  const result = await response.json();
  return result;
};

export const post = async (path, options) => {
  const response = await fetch(DOMAIN + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const result = await response.json();
  return result;
};

export const patch = async (path, options) => {
  const response = await fetch(DOMAIN + path, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const result = await response.json();
  return result;
};

export const del = async (path) => {
  const response = await fetch(DOMAIN + path, {
    method: "DELETE",
  });

  const result = await response.json();
  return result;
};
export const formatDateTime = (milliseconds) => {
  let d = new Date(milliseconds);
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "short" });
  let date = d.getDate();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();

  return `${d
    .toString()
    .slice(0, 3)} ${month} ${date} ${year} ${hours}:${minutes}:${seconds}`;
};
export const findUsers = (arr, cookie) => {
  arr.find((value) => {
    return value.token === cookie;
  });
};
