"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const pg = require("pg");
const client = new pg.Client({
    connectionString: "postgresql://darshankhairnar72:dm3bV9LcvlMr@ep-old-dawn-a5v5s3n0.us-east-2.aws.neon.tech/testdb?sslmode=require",
});
const createUserTable = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const result = yield client.query(`
          CREATE TABLE users (
              id SERIAL PRIMARY KEY,
              username VARCHAR(50) UNIQUE NOT NULL,
              email VARCHAR(255) UNIQUE NOT NULL,
              password VARCHAR(255) NOT NULL,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
              );
          `);
        console.log(result);
    }
    catch (err) {
        console.log(err);
    }
    finally {
        yield client.end();
    }
});
const createAddressTable = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const result = yield client.query(`
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
    }
    catch (err) {
        console.log(err);
    }
    finally {
        yield client.end();
    }
});
const insertIntoUsersTable = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const queryString = "INSERT INTO users(username,email,password) VALUES($1,$2,$3)";
        const values = [username, email, password];
        const result = yield client.query(queryString, values);
        console.log(result);
    }
    catch (err) {
        console.log(err);
    }
    finally {
        yield client.end();
    }
});
// insertIntoUsersTable("darshankhairnar72","darshankhairnar72@gmail.com","darshan123");
const selectUserWithUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const queryString = "SELECT * FROM users WHERE username = $1";
        const values = [username];
        const result = yield client.query(queryString, values);
        // console.log(result);
        if (result.rows.length > 0) {
            console.log(result.rows[0]);
        }
    }
    catch (err) {
        console.log(err);
    }
    finally {
        yield client.end();
    }
});
// selectUserWithUsername("darshankhairnar72");
// createAddressTable();
const getUserDetailsWithAddress = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const queryString = `
            SELECT username,email,city,country 
            FROM users U
            JOIN addresses A
            ON U.id = A.user_id;
        `;
        const result = yield client.query(queryString);
        // console.log(result);
        if (result.rows.length > 0) {
            for (let i = 0; i < result.rows.length; i++) {
                console.log(JSON.stringify(result.rows[i]) + "\n");
            }
        }
    }
    catch (err) {
        console.log(err);
    }
    finally {
        yield client.end();
    }
});
getUserDetailsWithAddress();
