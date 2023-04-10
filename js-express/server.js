const sql = require('mssql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const { Console } = require('console');
const cors = require('cors');

// Enable cors for development purposes only
app.use(cors());

// For parsing application/json
app.use(bodyParser.json());

// For parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const sqlConfig = {
  user: 'integratif',
  password: 'G3rb4ng!',
  database: 'GATE_DEV',
  server: '10.199.14.47',
  options: {
    encrypt: false, // for azure
    trustServerCertificate: false, // change to true for local dev / self-signed certs
  },
};

// Function to run a query and return a promise
function runQuery(query) {
  return sql
    .connect(sqlConfig)
    .then((pool) => {
      return pool.query(query);
    })
    .catch((err) => {
      console.log(`[${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}] ${err}`);
      throw err;
    });
}

// Log activity to log table
function logActivity(idKartu, idGate, jenisAktivitas, is_valid) {
  let table;
  if (jenisAktivitas == 'MASUK') table = 'log_masuk';
  else table = 'log_keluar';
  // console.log(idKartu);x
  const query = `INSERT INTO ${table} (id_kartu_akses, id_register_gate, is_valid) VALUES ('${idKartu}', ${idGate}, ${is_valid})`;
  // VALUES (NULL, ${idKartu}, ${idGate}, "${new Date().toISOString()}", ${is_valid})
  runQuery(query)
    .then(() => {
      console.log(`[${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}] Aktivitas telah berhasil di-logging.`);
    })
    .catch((err) => {
      console.log(`[${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}] ${err}`);
    });
}

// Masuk Gate Endpoint
// app.post('/masuk', async (req, res) => {
//   const idkartu = req.body.idkartu;
//   console.log(`[${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}] ID Kartu: ${idkartu}`);
//   const idgate = req.body.idgate;
//   console.log(`[${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}] ID Gate: ${idgate}`);
//   try {
//     const result = await runQuery(`select * from kartu_akses WHERE id_kartu_akses = '${idkartu}' AND is_aktif=1`);
//     const _res = result.recordsets[0].length;
//     console.log(_res);
//     const result2 = await runQuery(`select * from register_gate WHERE id_register_gate = '${idgate}'`);
//     const _res2 = result2.recordsets[0].length;
//     console.log(_res2);
//     if (Boolean(_res) && Boolean(_res2)) res.send('Berhasil masuk gerbang');
//     else res.send('Gagal masuk gerbang');
//   } catch (err) {
//     console.log(`[${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}] ${err}`);
//   }
// });
app.post('/masuk', async (req, res) => {
  const idkartu = req.body.idkartu;
  console.log(`[${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}] ID Kartu: ${idkartu}`);
  const idgate = req.body.idgate;
  console.log(`[${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}] ID Gate: ${idgate}`);

  try {
    // Check if idkartu is active and idgate exists
    const result = await runQuery(`SELECT * FROM kartu_akses WHERE id_kartu_akses = '${idkartu}'`);
    const _res = result.recordsets[0].length;
    const result2 = await runQuery(`SELECT * FROM register_gate WHERE id_register_gate = '${idgate}'`);
    const _res2 = result2.recordsets[0].length;
    if (Boolean(_res) && Boolean(_res2)) {
      // Log activity
      const is_aktif = result.recordset[0]['is_aktif'];
      if (Boolean(is_aktif)) {
        logActivity(idkartu, idgate, 'MASUK', 1);
        res.send('1');
      } else {
        logActivity(idkartu, idgate, 'MASUK', 0);
        res.send('0');
      }
    } else {
      res.send('0');
    }
  } catch (err) {
    console.log(`[${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}] ${err}`);
  }
});

// app.post('/keluar', async (req, res) => {
//   const idkartu = req.body.idkartu;
//   console.log(`[${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}] ID Kartu: ${idkartu} AND is_aktif=1`);
//   const idgate = req.body.idgate;
//   console.log(`[${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}] ID Gate: ${idgate}`);
//   try {
//     const result = await runQuery(`select * from kartu_akses WHERE id_kartu_akses = '${idkartu}'`);
//     const _res = result.recordsets[0].length;
//     // console.log(_res);
//     const result2 = await runQuery(`select * from register_gate WHERE id_register_gate = '${idgate}'`);
//     const _res2 = result2.recordsets[0].length;
//     // console.log(_res2);
//     if (_res && _res2) res.send('Berhasil keluar gerbang');
//     else res.send('Gagal keluar gerbang');
//   } catch (err) {
//     console.log(`[${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}] ${err}`);
//   }
// });

app.post('/keluar', async (req, res) => {
  const idkartu = req.body.idkartu;
  console.log(`[${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}] ID Kartu: ${idkartu}`);
  const idgate = req.body.idgate;
  console.log(`[${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}] ID Gate: ${idgate}`);

  try {
    // Check if idkartu is active and idgate exists
    const result = await runQuery(`SELECT * FROM kartu_akses WHERE id_kartu_akses = '${idkartu}'`);
    const _res = result.recordsets[0].length;
    const result2 = await runQuery(`SELECT * FROM register_gate WHERE id_register_gate = '${idgate}'`);
    const _res2 = result2.recordsets[0].length;
    if (Boolean(_res) && Boolean(_res2)) {
      // Log activity
      const is_aktif = result.recordset[0]['is_aktif'];
      if (Boolean(is_aktif)) {
        logActivity(idkartu, idgate, 'KELUAR', 1);
        res.send('1');
      } else {
        logActivity(idkartu, idgate, 'KELUAR', 0);
        res.send('0');
      }
    } else {
      res.send('0');
    }
  } catch (err) {
    console.log(`[${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}] ${err}`);
  }
});

app.listen(5000);
