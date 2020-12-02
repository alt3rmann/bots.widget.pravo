const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 6789;
const webhook = 'https://bots.ikigai.art/api/yandex-dialogs/webhook/5e7c5c91d2ce71081ce68d40';

app.use(cors());
app.use(bodyParser.json());
app.post('/proxy', async (req, res) => {
  try {
    const answer = await axios({
      method: 'post',
      url: webhook,
      data: req.body,
    });

    res.json(answer.data);
  } catch (e) {
    console.error(e);
    res.json({});
  }
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
