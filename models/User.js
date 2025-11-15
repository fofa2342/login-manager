import pool from '../configs/db.js';
import bcrypt from 'bcryptjs';

class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static async create(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

export default User;
