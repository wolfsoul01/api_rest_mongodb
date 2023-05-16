const express = require("express");
const cors = require("cors");
const route = require("../routers/userRouter");
const dbConection = require("../database/configDatabase");

class Server {
  constructor () {
    this.app = express();
    this.PORT = process.env.PORT;

    //dbconecction 
    this.conectarDB()
    
    //middlewares
    this.middlewares();
     
    //rutas de la app
    this.rutas();
  }
  
  async conectarDB(){
    await dbConection();
    
  }

  middlewares() {
    //Cors
    this.app.use(cors());
    //Parseo de las req
    this.app.use(express.json());

    //Carpeta publica
    this.app.use(express.static("public"));
  }

  rutas() {
    //Menejo de las rutas 
    this.app.use("/api/user", route);
  }

  start() {
    //Levantar el servidor 
    this.app.listen(this.PORT, () => {
      console .log(`Server running on port ${this.PORT}`);
    });
  }
}

module.exports = Server;
