import os
import sqlite3
import time

import mysql.connector


class Keyword:
    def __init__(self):
        self.video_list = []
        self.pages = {}

    def add_videos(self, video_list):
        for vid in video_list:
            post, page, liked, _ = vid
            self.video_list.append([post, page, liked])

    def get_videos(self):
        return self.video_list

    def add_page(self, page, post_list):
        self.pages[page] = post_list

    def get_pages_dict(self):
        return self.pages


def stats():
    if check_sqllite():
        create_data()


def database_exists(db_file):
    try:
        conn = sqlite3.connect(db_file)
        conn.close()
        return True
    except sqlite3.Error:
        return False


def table_exists(db_file, table_name):
    try:
        conn = sqlite3.connect(db_file)
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name=?", (table_name,))
        result = cursor.fetchone()
        conn.close()
        return result is not None
    except sqlite3.Error:
        return False


def check_sqllite():
    if not table_exists('userdata/pages.db', 'categories'):
        return False
    else:
        return True


def getKeyword():
    words = {}
    liked_videos_list = watched_videos_list = liked_pages_list = liked_posts_list = keyword_list = []
    conn = sqlite3.connect('userdata/pages.db')
    c = conn.cursor()
    c.execute("SELECT * FROM categories")
    keywords_in_db = c.fetchall()
    conn.close()
    for keyword in keywords_in_db:
        liked_posts = 0
        liked_pages = 0
        ID, word,_ = keyword
        words[word] = Keyword()  ###
        conn = sqlite3.connect('userdata/pages.db')
        c = conn.cursor()
        c.execute('SELECT URL FROM pages WHERE categID IS ' + str(ID))
        urls = c.fetchall()
        conn.close()

        conn = sqlite3.connect('userdata/likes.db')
        c = conn.cursor()
        c.execute("SELECT name FROM sqlite_master WHERE type='table';")
        liked_pages_urls = c.fetchall()
        for url in urls:
            if url in liked_pages_urls:
                c.execute('SELECT post FROM "' + url[0] + '"')
                posts = c.fetchall()
                p = []
                for post in posts:
                    p.append(post[0])
                words[word].add_page(url[0], p)
                table_length = len(posts)
                liked_posts += table_length
                liked_pages += 1

        conn.close()
        n_watched_videos = 0
        watched_videos = []
        n_liked_videos = 0
        liked_videos = []
        try:
            conn = sqlite3.connect('userdata/watched_videos.db')
            c = conn.cursor()
            c.execute('SELECT * FROM "' + word + '"')
            watched_videos = c.fetchall()
            n_watched_videos = len(watched_videos)
            c.execute('SELECT * FROM "' + word + '" WHERE liked IS 1')
            liked_videos = c.fetchall()
            n_liked_videos = len(liked_videos)
            conn.close()
        except:
            pass
        keyword_list.append(word)
        liked_posts_list.append(liked_posts)
        liked_pages_list.append(liked_pages)
        watched_videos_list.append(n_watched_videos)
        liked_videos_list.append(n_liked_videos)

        # Add videos to keyword object
        words[word].add_videos(watched_videos)

        ad_list = []
        try:
            conn = sqlite3.connect('userdata/clicked_links.db')
            c = conn.cursor()
            c.execute("SELECT post_URL FROM clicked_links")
            ad_posts = c.fetchall()
            for ad in ad_posts:
                ad_list.append(ad[0])
        except:
            pass
    return watched_videos_list


# print(words)
# print("Liked Posts: " + str(liked_posts_list) + " | Liked Pages: " + str(liked_pages_list))
# print("Watched Videos: " + str(watched_videos_list) + " | Liked Videos: " + str(liked_videos_list))
def update_data(stats_data, keywords):
    # Create connection with database
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="metapriv_db"
    )
    db_cursor = db.cursor()
    # db_cursor.execute("INSERT INTO stats (stats_data,keywords) VALUES (%s) ON DUPLICATE KEY UPDATE stats_data=VALUES(stats_data), keywords=VALUES(keywords)", (stats_data,keywords))
    db_cursor.execute("UPDATE stats SET stats_data=%s, keywords=%s WHERE id=1", (stats_data, keywords))
    db.commit()
    db_cursor.close()
    db.close()


def create_data():
    original_list = getKeyword()
    # original_list = ['hello', 37, 7, 0, 0, 'cat', 2, 8, 0, 0, 'phone', 0, 1, 0, 0]

    # Get the index of a string element
    string_indices = [index for index, element in enumerate(original_list) if isinstance(element, str)]
    # Extract string elements
    string_elements = [original_list[index] for index in string_indices]

    # Extract numeric elements
    numeric_elements = [original_list[i:i + 4] for i in range(1, len(original_list), 5)]
    update_data(stats_data=str(numeric_elements), keywords=str(string_elements).replace("'", "\""))
    print(str(string_elements).replace("'", "\""))
    print(numeric_elements)

######################################new add#########################
def new_update_data(stats_data,keywords,user_id):
	# Connect database
	db = mysql.connector.connect(
		host="localhost",
		user="root",
		password="",
		database="metapriv_db"
	)
	db_cursor = db.cursor()
	db_cursor.execute(
		"INSERT INTO stats (stats_data, keywords, user_id) VALUES (%s, %s, %s) ON DUPLICATE KEY UPDATE stats_data=VALUES(stats_data), keywords=VALUES(keywords)",
		(stats_data, keywords, user_id))
	#db_cursor.execute("INSERT INTO stats (stats_data,keywords,user_id) VALUES (%s,%s,%d) ON DUPLICATE KEY UPDATE stats_data=VALUES(stats_data), keywords=VALUES(keywords)", (stats_data,keywords,user_id))
	db.commit()
	db_cursor.close()
	db.close()

def get_db_keywords():
	conn = sqlite3.connect('userdata/pages.db')
	c = conn.cursor()
	c.execute("SELECT * FROM categories")
	keywords_in_db = c.fetchall()
	conn.close()
	return keywords_in_db

def write_db():
	original_list = getKeyword()
	keywords_in_db = get_db_keywords()
	result = {}
	res = {}

	for i in range(len(original_list)):
		if i < len(original_list) - 4:
			if isinstance(original_list[i], str):
				result[original_list[i]] = original_list[i + 1:i + 5]

	user_word = {}
	for keyword in keywords_in_db:
		word = keyword[1]
		user_id = keyword[2]
		if user_id in user_word:
			user_word[user_id].append(word)
		else:
			user_word[user_id] = [word]

	generated_data = {}
	for key, words in user_word.items():
		temp_data = []
		for word in words:
			temp_data.append(result[word])
		generated_data[key] = temp_data

	# print(generated_data)
	# print(result)
	# print(user_word)
	for key, value in generated_data.items():
		# print(user_word[key])
		new_update_data(stats_data=str(value), keywords=str(user_word[key]).replace("'", "\""), user_id=key)

if __name__ == '__main__':
    # Specify task execution time
    interval = 30
    if not check_sqllite():
        print("Database not found!")
    else:
        while True:
            write_db()
            time.sleep(interval)
            print("Successful implementation!")
