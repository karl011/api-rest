const { db } = require('../routes/dbConfig');

class School {
    constructor(id, code, nom, localisation) {  
        this.id = id;
        this.code = code;
        this.nom = nom;
        this.localisation = localisation;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM school WHERE id = ?', [id]);
        if (rows.length === 0) {
        return null;
        }
        const { id: schoolId, code, nom, localisation} = rows[0];
        return new School(schoolId, code, nom, localisation);
    }

    static async findAll() {
        const [rows] = await db.query('SELECT * FROM school');
        return rows;
    }

    static async create(code, nom, localisation) {
        await db.query('INSERT INTO school (code, nom, localisation) VALUES (?, ?, ?)', [code, nom, localisation]);
    }

    static async update(id, code, nom, localisation) {
        await db.query('UPDATE users SET code = ?, nom = ?, localisation = ? WHERE id = ?', [code, nom, localisation, id]);
    }

    static async delete(id) {
        await db.query('DELETE FROM school WHERE id = ?', [id]);
    }
}

module.exports = School;
