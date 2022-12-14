const express = require('express') 
const usuariosRouter = require('./routes/usuarios')
const prestamosRouter = require('./routes/prestamos')
const cors = require("cors")

class Server{
    constructor(){
      this.app = express()
      this.paths = {
         usuarios:"/api/v1/usuarios",
         prestamos:"/api/v1/prestamos"

        }
        this.middlewares()
        this.routes()
      
    }

routes(){
    
  //this.app.get('/', (req, res) => {
    //res.send('Hello World')
    //  }
    this.app.use(this.paths.usuarios, usuariosRouter)
    this.app.use(this.paths.prestamos, prestamosRouter)
}

middlewares() {
  this.app.use(cors()) //Permite solicitudes de origen cruzado//
  this.app.use(express.json()) //Habilita la lectura de contenido en formato JSON//
}

listen(){
    this.app.listen(process.env.PORT,() => { //Poner un this aqui xd//
    console.log("Servidor corriendo en el puerto", process.env.PORT)
})
}
}

module.exports = Server
