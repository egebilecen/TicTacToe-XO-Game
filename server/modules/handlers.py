def client(cSock,conn):
    print("[?]-Client handler started.")
    while True:
        cData = cSock.recv(4096)
        if cData == b"" or cData == "":
            cSock.close()
            print("[!]-A client has disconnected.")
            break
        else:
            print("[?]-Message from client: {}".format(cData))