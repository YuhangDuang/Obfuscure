# Obfuscure

An upgraded version of MetaPriv is now available as a Firefox extension, enabling Facebook users to obfuscate their data and conceal their true interests and habits from Facebook. The user can stop the process whenever they want, just by clicking "Logout Facebook" or "Logout MetaPriv" if the user wants to switch to another account.

# How to use?

# Client side:

1. Download the "client" folder.
2. Open Firefox and input "about:debugging" into the search bar.
3. Click "This Firefox" on the left side.
4. Click "Load Temporary Add-on" and select the "manifest.json" file in the "client" folder.
5. Click "Extensions" on the upper right toolbar (there is a puzzle icon), and select "Pin to Toolbar".

On the first run:

1. Click "Register" and input credentials.

On next runs:

1. Click the Obfuscure icon and input the credentials you created on the first run.
2. Set up the desired privacy level and the seed keyword, then click "Save Keywords" to save these settings.
3. Click "Login Facebook" to start the process.

# Server side:

On Windows:

1. Download the "server" folder.
2. Download and install XAMPP from the official website, then open "XAMPP Control Panel" and click the start buttons of "Apache" and "MySQL".
3. Under the "xampp" folder, replace the contents of the "htdocs" folder with the ones of the "server" folder.
4. Open a random browser and input "http://localhost/phpmyadmin", then create a database namely "metapriv_db".
5. Imported tables for metapriv_db.
6. Set up "venv" virtual environment: cd path\to\your\project, .\venv\Scripts\activate
7. Install requirements.txt: pip install -r requirements.txt
8. Open Command Prompt and input: cd C:\xampp\htdocs, C:\\xampp\htdocs\\myvenv\\Scripts\\python.exe C:\\xampp\\htdocs\\linux\\stats.py
