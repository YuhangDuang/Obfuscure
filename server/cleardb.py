import os
import sqlite3


def clear_table(db_file, table_name):
    try:
        conn = sqlite3.connect(db_file)
        cursor = conn.cursor()
        cursor.execute(f"DELETE FROM {table_name}")
        conn.commit()
        print(f"Data cleared from table '{table_name}'")
    except sqlite3.Error as e:
        print(f"SQLite error: {e}")
    finally:
        if conn:
            conn.close()


def clear_database(db_file):
    try:
        # Delete the database file if it exists
        if os.path.exists(db_file):
            os.remove(db_file)
            print(f"Database file '{db_file}' deleted.")

        # Create a new database file
        conn = sqlite3.connect(db_file)
        conn.close()
        print(f"New database file '{db_file}' created.")
    except sqlite3.Error as e:
        print(f"SQLite error: {e}")
    except OSError as e:
        print(f"OS error: {e}")

def main():
    try:
        # Table name to be emptied
        table_name = 'my_table'

        # Empty table data
        clear_table('userdata/pages.db', 'categories')
        clear_table('userdata/pages.db', 'pages')
        clear_database('userdata/watched_videos.db')
        clear_database('userdata/clicked_links.db')
        clear_database('userdata/likes.db')

    except sqlite3.Error as e:
        print(f"SQLite error: {e}")


if __name__ == "__main__":
    main()
