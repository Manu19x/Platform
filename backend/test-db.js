require('dotenv').config(); // Asigură-te că .env este încărcat
const pool = require('./config/db'); // Importă configurația bazei de date

async function testDB() {
    try {
        const result = await pool.query('SELECT NOW()'); // Testează conexiunea
        console.log('Database connected:', result.rows[0].now);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

testDB();
