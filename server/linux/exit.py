import os
import sys

import psutil

def find_and_kill_processes(script_name, args):
    for proc in psutil.process_iter(['pid', 'cmdline']):
        if proc.info['cmdline'] and 'python' in proc.info['cmdline'][0]:
            script_path = proc.info['cmdline'][1]
            script_file = os.path.basename(script_path)
            if (script_file == script_name):
                if proc.info['cmdline'][7] == args:
                    print(f"Killing process with PID {proc.pid}")
                    proc.kill()

bot_param = sys.argv[1]
if __name__ == '__main__':
    find_and_kill_processes('bot.py',bot_param)
