from fastapi import FastAPI
from pydantic import BaseModel
from mssql import cursor 

app = FastAPI()

class GateRequest(BaseModel):
    idkartu: int
    idgate: int

@app.get("/")
def hello_world():
    return {"message": "OK"}

@app.post("/masuk")
async def masuk_gate(request: GateRequest):
    # cursor.execute("SELECT is_aktif FROM kartu_akses WHERE id_kartu_akses = '%s'", request.idkartu)
    return request.idkartu

@app.post("/keluar")
async def keluar_gate(request: GateRequest):
    return request