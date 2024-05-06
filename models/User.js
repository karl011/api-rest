const { db } = require('../routes/dbConfig');
const School = require('./School');

class User {
  constructor(id, nom, prenom, mail, telephone, residence, sexe, schoolId) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.mail = mail;
    this.telephone = telephone;
    this.residence = residence;
    this.sexe = sexe;
    this.schoolId = schoolId;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length === 0) {
      return null;
    }
    const { id: userId, nom, prenom, mail, telephone, residence, sexe, schoolId  } = rows[0];
    return new User(userId, nom, prenom, mail, telephone, residence, sexe, schoolId );
  }

  static async findAll() {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  }

  // static async create(nom, prenom, mail, telephone, residence, sexe, schoolId) {
  //   await db.query('INSERT INTO users (nom, prenom, mail, telephone, residence, sexe, schoolId) VALUES (?, ?, ?, ?, ?, ?, ?)', [nom, prenom, mail, telephone, residence, sexe, schoolId]);
  // }
  static async create(nom, prenom, mail, telephone, residence, sexe, schoolId) {
    await db.query('INSERT INTO users (nom, prenom, mail, telephone, residence, sexe, schoolId) VALUES (?, ?, ?, ?, ?, ?, ?)', [nom, prenom, mail, telephone, residence, sexe, schoolId]);
  }
  
  
  static async update(id, nom, prenom, mail, telephone, residence, sexe, schoolId) {
    await db.query('UPDATE users SET nom = ?, prenom = ?, mail = ?, telephone = ?, residence = ?, sexe = ?, schoolId = ? WHERE id = ?', [nom, prenom, mail, telephone, residence, sexe, schoolId, id]);
  }

  static async delete(id) {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
  }

  // Méthode pour récupérer l'école à laquelle appartient l'utilisateur
  async getSchool() {
    if (!this.schoolId) {
      return null;
    }
    return await School.findById(this.schoolId);
  }
}

module.exports = User;
