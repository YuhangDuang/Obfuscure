import base64  # pip install pycryptodome
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from base64 import b64encode, b64decode
import hashlib


def Hash(text):
	return hashlib.sha256(text.encode()).digest()

def aes_encrypt1(plaintext, key):
	padded_text = pad(plaintext.encode(), 16)
	cipher = AES.new(key, AES.MODE_ECB)
	ciphertext = cipher.encrypt(padded_text)
	return b64encode(ciphertext).decode('utf-8')

def aes_decrypt1(ciphertext, key):
	cipher = AES.new(key, AES.MODE_ECB)
	padded_text = cipher.decrypt(b64decode(ciphertext.encode('utf-8')))
	plaintext = unpad(padded_text, 16)
	return plaintext.decode()

def aes_encrypt(message, key):
	key = key.encode('utf-8')[:16]
	cipher = AES.new(key, AES.MODE_CBC)
	ciphertext = cipher.encrypt(pad(message.encode('utf-8'), AES.block_size))
	encrypted_data = cipher.iv + ciphertext
	return base64.b64encode(encrypted_data).decode('utf-8')

def aes_decrypt(encoded_data, key):
	key = key.encode('utf-8')[:16]
	encrypted_data = base64.b64decode(encoded_data.encode('utf-8'))
	iv = encrypted_data[:AES.block_size]
	cipher = AES.new(key, AES.MODE_CBC, iv)
	decrypted_message = unpad(cipher.decrypt(encrypted_data[AES.block_size:]), AES.block_size)
	return decrypted_message.decode('utf-8')

if __name__ == '__main__':
	key = "123123123123123123"
	text = aes_encrypt("123123123123123123", key)
	print(text)
	text_1 = aes_decrypt(text, key)
	print(text_1)

