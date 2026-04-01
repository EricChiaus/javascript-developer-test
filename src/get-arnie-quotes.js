const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
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
      return { 'FAILURE': error.message };
    }
  });
  
  return Promise.all(promises);
};

module.exports = {
  getArnieQuotes,
};
