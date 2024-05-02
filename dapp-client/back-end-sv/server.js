const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000; // Puedes cambiar el puerto si lo deseas
const API_KEY = '3de55fc27fb14b629b19442dac8a5d95'; // Tu API key de football-data.org

app.use(cors());

app.get('/matches', async (req, res) => {
  try {
    const response = await axios.get(`https://api.football-data.org/v2/matches`, {
      headers: {
        'X-Auth-Token': API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data from API');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
