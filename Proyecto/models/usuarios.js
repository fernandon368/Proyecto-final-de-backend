const modeloUsuarios = {
    queryGetUsers: "SELECT * FROM Usuarios",
    querygetUserByID: `SELECT * FROM Usuarios WHERE ID = ?`,
    querydeleteUserByID: `UPDATE Usuarios SET Activo = 'N' WHERE ID = ?`,
    queryUserExists: `SELECT Usuario FROM Usuarios WHERE Usuario = ?`,
    queryaddUser: `
    INSERT INTO Usuarios (
        Usuario,
        Nombre,
        Apellidos,
        Contrasena,
        Activo
    ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?)`,
    queryGetUserInfo:
    `SELECT Usuario, Nombre, Apellidos 
        FROM Usuarios 
        WHERE Usuario = ?`,
    queryUpdateByUsuario:
    `UPDATE Usuarios SET  
        Nombre = ?,
        Apellidos = ?
        WHERE Usuario = ?`,
    
    querySignIn: `SELECT Usuario, Contrasena, Activo FROM Usuarios WHERE Usuario = ?`
    }
    
    const updateUsuario = (
        Nombre,
        Apellidos,
        Usuario
    ) =>{
        return `
        UPDATE Usuarios SET
        Nombre = '${Nombre}',
        Apellidos = '${Apellidos}',
        WHERE Usuario = '${Usuario}'
        ` }

    module.exports = {modeloUsuarios,updateUsuario}