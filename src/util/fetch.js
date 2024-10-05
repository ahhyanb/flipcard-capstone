import db from "./db.js";

/////////////////////////////////////////////////////////
////// HELPERS
/////////////////////////////////////////////////////////

// Splits apart the URL.
const getUrlParts = (url) =>
  new URL(url).pathname.split("/").filter((part) => part);

/*
  Checks that the URL is valid by comparing all parts of the path to the
  keys within the database file, or checking to ensure that it is a number.
*/
const UrlIsValid = (url) => {
  return getUrlParts(url).every(
    (part) => Number(part) || db.keys.includes(part)
  );
};

// Retrieves data from the appropriate level.
const getData = (url) => {
  const parts = getUrlParts(url);
  return parts.reduce((acc, part) => {
    const id = Number(part);
    const accessor = isNaN(id) ? part : id - 1;
    return acc[accessor];
  }, db.data);
};

/////////////////////////////////////////////////////////
////// MOCK REQUEST FUNCTIONS
/////////////////////////////////////////////////////////

const retrieve = (url) => {
  const data = getData(url);
  if (!data) {
    return {
      status: 404,
      message: "Not Found",
      json: () =>
        new Promise((resolve, reject) => {
          const error = new Error(`${url} not found.`);
          return reject(error);
        }),
    };
  } else {
    return {
      status: 200,
      message: "OK",
      json: () =>
        new Promise((resolve) => {
          return resolve(data);
        }),
    };
  }
};

const create = (url, options) => {
  const data = getData(url);
  const last = data[data.length - 1];
  const body =
    typeof options.body === "string" ? JSON.parse(options.body) : options.body;
  const newRecord = {
    id: last ? last.id + 1 : 1,
    ...body,
  };

  data.push(newRecord);

  return {
    status: 201,
    message: "Created",
    json: () =>
      new Promise((resolve) => {
        resolve(newRecord);
      }),
  };
};

const update = (url, options) => {
  const data = getData(url);
  const body =
    typeof options.body === "string" ? JSON.parse(options.body) : options.body;

  for (let key in body) {
    if (key !== "id") {
      data[key] = body[key];
    }
  }

  return {
    status: 201,
    message: "Created",
    json: () =>
      new Promise((resolve) => {
        resolve(data);
      }),
  };
};

const destroy = (url) => {
  const parts = getUrlParts(url);
  const id = Number(parts[parts.length - 1]);
  const parentPath = ["http://mockhost", ...parts.slice(0, -1)].join("/");
  const data = getData(parentPath);

  const index = data.findIndex((resource) => resource.id === id);
  data.splice(index, 1);

  return {
    status: 200,
    message: "OK",
    json: () => {
      new Promise((resolve) => resolve({ id }));
    },
  };
};

const MOCK_REQUEST_METHODS = {
  GET: retrieve,
  POST: create,
  PUT: update,
  DELETE: destroy,
};

const generateMockRequest = (url, options = {}) => {
  const fn = MOCK_REQUEST_METHODS[options.method] || MOCK_REQUEST_METHODS.GET;
  return fn(url, options);
};

/////////////////////////////////////////////////////////
////// MOCK REQUEST FUNCTIONS
/////////////////////////////////////////////////////////

// Store local version of fetch.
let typicalFetch;
try {
  typicalFetch = fetch;
} catch (error) {
  typicalFetch = () => {};
}

// Reassign fetch if the URL path includes 'mockhost'
global.fetch = (url, options) => {
  if (url.match(/http(s?):\/\/mockhost/i)) {
    return new Promise((resolve, reject) => {
      if (UrlIsValid(url)) {
        const response = generateMockRequest(url, options);
        return resolve(response);
      } else {
        return reject({ status: 500, message: "Internal server error" });
      }
    });
  } else {
    return typicalFetch(url, options);
  }
};

export default global.fetch;