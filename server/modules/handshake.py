import hashlib
from base64 import b64encode

def create(host,port,clientHandshake): #-Create server's handshake http request
    HANDSHAKE = 'HTTP/1.1 101 Switching Protocols\r\nConnection: Upgrade\r\nUpgrade: websocket\r\nWebSocket-Origin: {host}\r\nWebSocket-Location: ws://{host}:{port}/\r\n'\
                .format(host=host, port=port)
    MAGIC_KEY = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
    clientHandshake = clientHandshake.split("\r\n")
    clientKey = None

    for row in clientHandshake:
        if "Sec-WebSocket-Key" in row:
            clientKey = row[19:]
            break
        else: continue
    serverKey = b64encode(hashlib.sha1((clientKey+MAGIC_KEY).encode()).digest()) #-byte
    return HANDSHAKE + "Sec-WebSocket-Accept: "+serverKey.decode()+"\r\n\r\n"