import socket
from _thread import *
from modules import handshake, handlers

#-Global variables
HOST, PORT = "localhost", 6969 #-Configuration
sock = None

try:
    # -Create socket
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    # -Bind socket
    sock.bind((HOST, PORT))

    # -Listen socket
    sock.listen() # unlimited client count

    print("[?]-Server waiting for connections.")
    while True:
        cSock, conn = sock.accept()  #-cSock = client socket
        hsResponse = cSock.recv(4096).decode()
        cSock.send(handshake.create(HOST,PORT,hsResponse).encode())
except Exception as err:
    sock.close()
    print(err)