import fetch from 'node-fetch';

exports.handler = async function (event, context): Promise<any> {
  const API_KEY = process.env['HEARTHSTONE_API_KEY'];
  const API_HOST = process.env['HEARTHSTONE_API_HOST'];
  const API_URL = `https://${API_HOST}/cardbacks`;
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
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Fetch error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  }
};
