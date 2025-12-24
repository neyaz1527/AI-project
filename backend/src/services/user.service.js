const pool = require("../db/connection");

const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

// const createUser = async (name, email) => {
//   const client = await pool.query(
//     "INSERT INTO users(name,email) VALUES($1,$2) RETURNING *",
//     [name, email]
//   );
//   return result.rows[0];
// };

const createUser = async (name, email) => {
  const client = await pool.connect();
  try{
    await client.query("BEGIN");
    const result = await client.query(
      "INSERT INTO users(name, email) VALUES($1, $2) RETURNING *",
      [name, email]
    );
    await client.query("COMMIT");
    return result.rows[0];
  } catch (e) {
    await client.query("ROLLBACK");
    console.error("INSERT FAILED:", e.message);
    throw e;
  } finally {
    client.release();
  }
}

const deleteUser = async (id) =>{
  const client = await pool.connect();
  try{
    await client.query("BEGIN");
    const result = await client.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    await client.query("COMMIT");
    return result.rows[0];
  }catch (e){
    await client.query("ROLLBACK");
    console.error("DELETION FAILED", e,message);
    throw e
  }finally{
    client.release();
  }
}



module.exports = {
  getAllUsers,
  createUser,
  deleteUser
};
