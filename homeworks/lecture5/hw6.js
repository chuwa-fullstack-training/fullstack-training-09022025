/**
 * write a function to have an arbitrary number of promises run in sequence
 * and return an array of the results
 * @param {string[]} urls - an array of urls
 * @returns {any[]} - an array of responses
 */
function sequencePromise(urls) {
  const results = [];
  function fetchOne(url) {
    // for `getJSON` function you can choose either from the implementation of hw5 or `fetch` version provided by browser
    // if you use `fetch`, you have to use browser console to test this homework
    return getJSON(url).then((response) => results.push(response));
  }
  // implement your code here
  let promiseChain = Promise.resolve();

  urls.forEach((url) => {
    promiseChain = promiseChain.then(() => fetchOne(url));
  });

  return promiseChain.then(() => results);
}

function getJSON(url) {
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  });
}

// test your code
const urls = [
  "https://api.github.com/search/repositories?q=javascript",
  "https://api.github.com/search/repositories?q=react",
  "https://api.github.com/search/repositories?q=nodejs",
];

sequencePromise(urls)
  .then((results) => {
    console.log("All results:", results);
  })
  .catch((err) => {
    console.error("Error fetching:", err);
  });
