import pymssql

# host = '10.199.14.47'
# user = 'integratif'
# password = 'G3rb4ng!'
# database = 'GATE_DEV'
# conn = pymssql.connect(host, user, password, database)  

server = 'localhost'
user = 'sa'
password = 'P4ssW0ordDB!1'
database = 'GATE_DEV'
conn = pymssql.connect(server, user, password, database)  

cursor = conn.cursor()
