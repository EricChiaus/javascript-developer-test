const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  // Create an array of promises, one for each URL to process concurrently
  const promises = urls.map(async (url) => {
    try {
      const response = await httpGet(url);
      const body = JSON.parse(response.body);
      
      if (response.status === 200) {
        return { 'Arnie Quote': body.message };
      } else {
        return { 'FAILURE': body.message };
      }
    } catch (error) {
      // Handle both Error objects and string errors
      const errorMessage = error instanceof Error ? error.message : String(error);
      return { 'FAILURE': errorMessage };
    }
  });
  
  // Using Promise.all() since all promises resolve (no rejections in catch blocks)
  // Each promise handles its own errors and returns consistent objects
  return Promise.all(promises);
};

module.exports = {
  getArnieQuotes,
};
