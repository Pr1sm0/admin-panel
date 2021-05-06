import { User } from '../../interfaces';
import pool from '../dbConnector';
import * as bcrypt from 'bcrypt';

export async function signupUser(user: User) {
  let { name, role, email, password } = user;
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  password = hash;
  const client = await pool.connect();
  try {
    const res = await client.query(
      'INSERT INTO users (name, role, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, role, email, password]
    );
    client.release();
  } catch (err) {
    client.release();
  }
}

export async function loginUser(email: string, password: string) {
  const client = await pool.connect();
  try {
    const res = await client.query(
      'SELECT * FROM users WHERE email=$1', 
      [email]
    );
    client.release();
    if(res.rows[0]){
      const user = res.rows[0];
      const matches = await bcrypt.compare(password, user.password);
      if(matches){
        return user;
      } else {
        return 'Incorrect password!';
      }
    }
  } catch (err) {
    client.release();
  }
}