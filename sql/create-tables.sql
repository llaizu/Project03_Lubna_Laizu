DROP TABLE IF EXISTS schedules;

CREATE TABLE IF NOT EXISTS schedules (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(200) NOT NULL,
    day VARCHAR(200) NOT NULL,
    start_at VARCHAR(200) NOT NULL,
    end_at VARCHAR(200) NOT NULL                                                                                          
); 