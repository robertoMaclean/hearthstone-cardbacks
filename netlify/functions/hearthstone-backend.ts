import fetch from 'node-fetch';

exports.handler = async function(event, context) {
  const API_KEY = process.env.API_KEY;
  const API_HOST = process.env.API_HOST;
  const API_URL = `https://${API_HOST}/cardbacks`
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY || '',
      'X-RapidAPI-Host': API_HOST || '',
    },
  };

  try {
    const response = await fetch(API_URL, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};
