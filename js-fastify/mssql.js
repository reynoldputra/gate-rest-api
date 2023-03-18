import sql from 'mssql'
const sqlConfig = {
  user: 'integratif',
  password: 'G3rb4ng!',
  database: 'GATE_DEV',
  server: '10.199.14.47',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
}
const pool = new sql.ConnectionPool(sqlConfig);

pool.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Connected to database');
});

async function executeQuery(query) {
  try {
    await pool.connect()
    const result = await pool.request().query(query)
    return result.recordset
  } catch (err) {
    console.error(err)
    throw err
  }
}

export default executeQuery