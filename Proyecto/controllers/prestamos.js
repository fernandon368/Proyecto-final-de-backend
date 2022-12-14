const { request, response } = require("express");
const pool = require("../db/connection")
const modeloPrestamos = require("../models/prestamos");


const getUsers = async (req = request, res = response) =>{
    //Estructura basica de cualquier endpoint al conectar en su BD
    
    let conn;
    //Control de exepciones
    try {
        conn = await pool.getConnection()
        //Esta es la consulta mas basica, se pueden hacer mas complejas
        const users = await conn.query(modeloPrestamos.quieryGetUsers, (error) => {throw new Error(error) })
        //Siempre validar que no se obtuvieron resultados
        if (!users) {
            res.status(404).json({msg:"No se encontraron registros"})
            return
        }
        res.json({users})
        //Lo del catch y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const getUserByID = async (req = request, res = response) =>{
    //Estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const {id} = req.params

    let conn;
    //Control de exepciones
    try {
        conn = await pool.getConnection()
        //Esta es la consulta mas basica, se pueden hacer mas complejas
        const [user] = await conn.query(modeloPrestamos.quieryGetUsersByeID, [id], (error) => {throw new Error(error) })
        //Siempre validar que no se obtuvieron resultados
        if (!user) {
            res.status(404).json({msg:`No se encontro registro con el id ${id}`})
            return
        }
        res.json({user})
        //Lo del catch y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const deleteUserByID = async (req = request, res = response) =>{
    //Estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const {id} = req.query

    let conn;
    //Control de exepciones
    try {
        conn = await pool.getConnection()
        //Esta es la consulta mas basica, se pueden hacer mas complejas en esta se actualizara el usuario
        const {affectedRows} = await conn.query(modeloPrestamos.quieryDeleteUsersByeID, [id], (error) => {throw new Error(error) })
        
        //Siempre validar que no se obtuvieron resultados
        if (affectedRows === 0) {
            res.status(404).json({msg:`No se pudo eliminar el registro con el id ${id}`})
            return
        }
        res.json({msg: `El usuario con id ${id} se elimino correctamente.`})
        //Lo del catch y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const addUser = async (req = request, res = response) =>{
    //Estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const{
        Persona,
        Horaprestamos,
        Tiempoprestamos,
        Horaentrega,
        Fechaprestamos,
        Activo
      
    } = req.body

    if (
        !Persona||
        !Horaprestamos||
        !Tiempoprestamos||
        !Horaentrega||
        !Fechaprestamos||
        !Activo
       
    ){
        res.status(400).json({msg:"Falta informacion del usuario"})
        return
    }
  
    let conn;
    //Control de exepciones
    try {
        conn = await pool.getConnection()
        
        //Tarea aqui que el usuario no se duplique
       const user = await conn.query(modeloPrestamos.quieryUsersExists,[Persona])
       
        if(!user){
            res.status(403).json({msg: `La persona ${Persona} ya se encuentra registrado`})
            return
        }
            //Esta es la consulta mas basica, se pueden hacer mas complejas en esta se actualizara el usuario
        const {affectedRows} = await conn.query(modeloPrestamos.quieryAddUser, [
            Persona,
            Horaprestamos,
            Tiempoprestamos,
            Horaentrega,
            Fechaprestamos,
            Activo
        ], (error) => {throw new Error(error)})
        //'${Genero || ''}',
        //Siempre validar que no se obtuvieron resultados
       
        if (affectedRows === 0) {
            res.status(404).json({msg:`No se pudo agregar el registro del usuario ${Persona}`})
            return
        }
        res.json({msg: `El usuario ${Persona} se agrego correctamente.`})
        //Lo del catch y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
        conn.end()
        }
    }
}

const updateUserByUsuario = async (req = request, res = response) =>{
    //Estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const {
        Persona,
        Horaprestamos, 
        Tiempoprestamos, 
        Horaentrega,
        Fechaprestamos

    } = req.body

    if (
        !Persona||
        !Horaprestamos||
        !Tiempoprestamos||
        !Horaentrega||
        !Fechaprestamos

    ){
        res.status(400).json({msg:"Falta informacion de la persona"})
        return
    }

    let conn;
    //Control de exepciones
    try {
        conn = await pool.getConnection()

        //Tarea aqui que el usuario no se duplique
       const [user] = await conn.query(modeloPrestamos.quieryGetUsersInfo,[Persona])

       if (!user){
        res.status(403).json({msg: `El usuario ${Persona} no se encuentra registrado`})
       }
        //Esta es la consulta mas basica, se pueden hacer mas complejas EN ESTA SE ACTUALIZARA EL USUARIO
        //Arreglar esta
        const {affectedRows} = await conn.query(modeloPrestamos.quieryUpdateByeUsuario,[
            Persona|| user.Persona,
            Horaprestamos|| user.Horaprestamos,
            Tiempoprestamos|| user.Tiempoprestamos,
            Horaentrega|| user.Horaentrega,
            Fechaprestamos|| user.Fechaprestamos,
            Persona,
            ]
            , (error) => {throw new Error(error) })
            //'${Genero || ''}',
        //Siempre validar que no se obtuvieron resultados
        if (affectedRows === 0) {
            res.status(404).json({msg:`No se pudo actualizar el registro de la persona ${Persona}`})
            return
        }
        res.json({msg: `La persona ${Persona} se actualizo correctamente.`})
        //Lo del catch y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

module.exports = {getUsers, getUserByID, deleteUserByID, addUser, updateUserByUsuario}