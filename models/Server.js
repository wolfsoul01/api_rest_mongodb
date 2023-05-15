const express = require("express");
const cors = require("cors");
const route = require("../routers/userRouter");

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT;

    //middlewares
    this.middlewares();

    //rutas de la app
    this.rutas();
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
