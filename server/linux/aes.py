from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import base64

custom_key = '123123123123123123123123123123123123123'.encode('utf-8')[:16]

def encrypt(message, key):
    cipher = AES.new(key, AES.MODE_CBC)
    ciphertext = cipher.encrypt(pad(message.encode('utf-8'), AES.block_size))
    encrypted_data = cipher.iv + ciphertext
    return base64.b64encode(encrypted_data).decode('utf-8')

def decrypt(encoded_data, key):
    encrypted_data = base64.b64decode(encoded_data.encode('utf-8'))
    iv = encrypted_data[:AES.block_size]
    cipher = AES.new(key, AES.MODE_CBC, iv)
    decrypted_message = unpad(cipher.decrypt(encrypted_data[AES.block_size:]), AES.block_size)
    return decrypted_message.decode('utf-8')

# Example usage:
message_to_encrypt = "Hello, PyCryptodome AES!"
encrypted_data = encrypt(message_to_encrypt, custom_key)
decrypted_message = decrypt(encrypted_data, custom_key)

print("Original message:", message_to_encrypt)
print("Encrypted and Base64 encoded data:", encrypted_data)
print("Decrypted message:", decrypted_message)
