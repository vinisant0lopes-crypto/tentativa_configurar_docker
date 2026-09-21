const express = require('express')

const app = express()

const port = 3000

const path = require('path');

app.listen(port,()=>{
    console.log(`Executando na porta: ${port}`)
});




// Libera os arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'src', 'public'))); 

// Rota principal que entrega o arquivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});