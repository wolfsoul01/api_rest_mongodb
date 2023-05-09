const express =require('express');
const app =express();

const PORT=8080;

app.get('/',(req,res)=>{
    res.send('Hola mundo ')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })