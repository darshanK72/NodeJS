const pg = require("pg");

const client = new pg.Client({
  connectionString:
    "postgresql://darshankhairnar72:dm3bV9LcvlMr@ep-old-dawn-a5v5s3n0.us-east-2.aws.neon.tech/testdb?sslmode=require",
});

const createUserTable = async () => {
  try {
    await client.connect();
    const result = await client.query(`
          CREATE TABLE users (
              id SERIAL PRIMARY KEY,
              username VARCHAR(50) UNIQUE NOT NULL,
              email VARCHAR(255) UNIQUE NOT NULL,
              password VARCHAR(255) NOT NULL,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
              );
          `);
    console.log(result);
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
};

const createAddressTable = async () => {
  try {
    await client.connect();
    const result = await client.query(`
      CREATE TABLE addresses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        city VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        street VARCHAR(255) NOT NULL,
        pincode VARCHAR(20),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
            `);
    console.log(result);
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
};

const insertIntoUsersTable = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    await client.connect();
    const queryString =
      "INSERT INTO users(username,email,password) VALUES($1,$2,$3)";
    const values = [username, email, password];
    const result = await client.query(queryString, values);
    console.log(result);
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
};

// insertIntoUsersTable("darshankhairnar72","darshankhairnar72@gmail.com","darshan123");

const selectUserWithUsername = async (username: string) => {
  try {
    await client.connect();
    const queryString = "SELECT * FROM users WHERE username = $1";
    const values = [username];
    const result = await client.query(queryString, values);
    // console.log(result);
    if (result.rows.length > 0) {
      console.log(result.rows[0]);
    }
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
};

// selectUserWithUsername("darshankhairnar72");

// createAddressTable();

const getUserDetailsWithAddress = async () => {
    try {
        await client.connect();
        const queryString = `
            SELECT username,email,city,country 
            FROM users U
            JOIN addresses A
            ON U.id = A.user_id;
        `;
        const result = await client.query(queryString);
        // console.log(result);
        if (result.rows.length > 0) {
          for(let i = 0; i < result.rows.length ; i++ ){
            console.log(JSON.stringify(result.rows[i])  + "\n")
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        await client.end();
      }
}

getUserDetailsWithAddress();