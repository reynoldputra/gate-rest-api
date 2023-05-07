from fastapi import FastAPI
from pydantic import BaseModel
from mssql import cursor 

app = FastAPI()

class GateRequest(BaseModel):
    idkartu: str 
    idgate: str

@app.get("/")
def hello_world():
    return {"message": "OK"}

@app.post("/masuk")
async def masuk_gate(request: GateRequest):
    cursor.execute("SELECT * FROM kartu_akses WHERE id_kartu_akses = %s", (request.idkartu,))
    kartu = cursor.fetchone()
    cursor.execute("SELECT * FROM register_gate WHERE id_register_gate = %d", (request.idgate,))
    gate = cursor.fetchone()
    if kartu is not None and gate is not None:
        return {"message" : "Berhasil memasuki gerbang"}
    else:
        return {"message" : "Gagal memasuki gerbang"}

@app.post("/keluar")
async def keluar_gate(request: GateRequest):
    cursor.execute("SELECT * FROM kartu_akses WHERE id_kartu_akses = %s", (request.idkartu,))
    kartu = cursor.fetchone()
    cursor.execute("SELECT * FROM register_gate WHERE id_register_gate = %d", (request.idgate,))
    gate = cursor.fetchone()
    if kartu is not None and gate is not None:
        return {"message" : "Berhasil keluar gerbang"}
    else:
        return {"message" : "Gagal keluar gerbang"}

# @app.post("/masuk")
# async def masuk_gate(request: GateRequest):
#     cursor.execute("SELECT is_aktif FROM kartu_akses WHERE id_kartu_akses = %s", (request.idkartu,))
#     result = cursor.fetchone()
#     if(result[0] == 0):
#         cursor.execute("UPDATE kartu_akses SET is_aktif = 1 WHERE id_kartu_akses = %s", (request.idkartu,))
#         return {"message" : "Berhasil memasuki gerbang"}
#     else:
#         return {"message" : "Kartu sedang aktif"}

# @app.post("/keluar")
# async def keluar_gate(request: GateRequest):
#     cursor.execute("SELECT is_aktif FROM kartu_akses WHERE id_kartu_akses = %s", (request.idkartu,))
#     result = cursor.fetchone()
#     if(result[0] == 0):
#         cursor.execute("UPDATE kartu_akses SET is_aktif = 0 WHERE id_kartu_akses = %s", (request.idkartu,))
#         return {"message" : "Berhasil keluar gerbang"}
#     else:
#         return {"message" : "Kartu sedang tidak aktif"}
