import os
import sys

from facebook import BOT
from stats import stats

eff_privacy = sys.argv[1]
key = sys.argv[2]
email = sys.argv[3]
password = sys.argv[4]
keyword = sys.argv[5]
user_id = sys.argv[6]

if __name__ == '__main__':
	bot = BOT()
	eff_privacy = float(eff_privacy)
	bot.start_bot(eff_privacy=eff_privacy,key=key,email=email,password=password,keyword=keyword,usage_number=2,user_id=int(user_id))
