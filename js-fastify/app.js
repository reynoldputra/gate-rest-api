// ESM
import Fastify from "fastify";
import recordset from "./mssql.js";

const fastify = Fastify({
  logger: true,
});

fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

fastify.post("/masuk", async (request, reply) => {
  const body = request.body;
  const idkartu = body.idkartu;

  const statusKartuReq = await recordset(
    `SELECT is_aktif FROM kartu_akses WHERE id_kartu_akses = '${idkartu}' `
  );
  const statusKartu = statusKartuReq[0].is_aktif;

  if (statusKartu) {
    reply
      .code(400)
      .header("Content-Type", "application/json")
      .send({ message: "Kartu sedang aktif" });
  }

  await recordset(
    `UPDATE kartu_akses SET is_aktif = 1 WHERE id_kartu_akses = '${idkartu}'`
  );
  reply
    .code(200)
    .header("Content-Type", "application/json")
    .send({ message: "Kartu berhasil diaktifkan" });
});

fastify.post("/keluar", async (request, reply) => {
  const body = request.body;
  const idkartu = body.idkartu;

  const statusKartuReq = await recordset(
    `SELECT is_aktif FROM kartu_akses WHERE id_kartu_akses = '${idkartu}' `
  );
  const statusKartu = statusKartuReq[0].is_aktif;

  if (!statusKartu) {
    reply
      .code(400)
      .header("Content-Type", "application/json")
      .send({ message: "Kartu sedang tidak aktif" });
  }

  await recordset(
    `UPDATE kartu_akses SET is_aktif = 0 WHERE id_kartu_akses = '${idkartu}'`
  );
  reply
    .code(200)
    .header("Content-Type", "application/json")
    .send({ message: "Kartu berhasil dinonaktifkan" });
});

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
