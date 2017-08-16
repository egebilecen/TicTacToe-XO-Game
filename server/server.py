import socket
from _thread import *
from modules import handshake, handlers

#-Global variables
HOST, PORT = "localhost", 6969 #-Configuration
sock = None

try:
    #-Create socket
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    #-Bind socket
    sock.bind((HOST, PORT))

    #-Listen socket
    sock.listen() #-unlimited client count

    print("[?]-Server waiting for connections.","\n","-"*35,sep="")
    while True:
        cSock, conn = sock.accept()  #-cSock = client socket
        print("[?]-New connection.")
        hsResponse = cSock.recv(4096).decode()
        cSock.send(handshake.create(HOST,PORT,hsResponse).encode())
        start_new_thread(handlers.client,(cSock,conn))

except KeyboardInterrupt:
    sock.close()

except Exception as err:
    sock.close()
    print(err)