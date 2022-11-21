const app = require('./app');
require('dotenv').config();

app.listen(process.env.PORT, async () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
