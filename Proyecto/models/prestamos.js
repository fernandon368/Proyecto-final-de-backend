const modeloPrestamos ={
quieryGetUsers: "SELECT * FROM Prestamos",

//Se sustituye cada elemento del arreglo por cada signo de interrogacion, y se acomodan en el orden respectivo
//Si se usa 2 veces se pasa las 2 veces
quieryGetUsersByeID: `SELECT * FROM Prestamos WHERE ID = ?`,
quieryDeleteUsersByeID: `UPDATE Prestamos SET Activo = 'N' WHERE ID = ?`,
quieryUsersExists: `SELECT Persona FROM Prestamos WHERE Persona = ?`,
quieryAddUser:`INSERT INTO Prestamos (
    Persona,
    Horaprestamos,
    Tiempoprestamos,
    Horaentrega,
    Fechaprestamos,
    Activo
    ) VALUES (
    ?,
    ?,
    ?,
    ?,
    ?,
    ?
    )`,

quieryGetUsersInfo: `
SELECT Persona, Horaprestamos, Tiempoprestamos, Horaentrega, Fechaprestamos, Activo
FROM Prestamos
WHERE Persona = ?`,

quieryUpdateByeUsuario: `
UPDATE Prestamos SET 
Persona = ?
Horaprestamos = ?, 
Tiempoprestamos = ?, 
Horaentrega = ?,
Fechaprestamos = ?,
WHERE Persona = ?
`
}

module.exports = modeloPrestamos