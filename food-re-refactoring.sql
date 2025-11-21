CREATE DATABASE IF NOT EXISTS food_re_refactoring
DEFAULT CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

CREATE USER 'Foodie'@'localhost' IDENTIFIED BY '0000';

GRANT ALL PRIVILEGES ON food_re_refactoring.* TO 'Foodie'@'localhost';
FLUSH PRIVILEGES;

USE food_re_refactoring;

CREATE TABLE IF NOT EXISTS users (
    user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE allergies(
	allergy_id   INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    allergyname  VARCHAR(20) NOT NULL UNIQUE
);

INSERT INTO allergies (allergyname) VALUES
('우유'), ('계란'), ('밀'), ('땅콩'), ('대두'), ('호두'), ('고등어'), ('게'), ('새우'), ('돼지고기'), 
('쇠고기'), ('닭고기'), ('오징어'), ('메밀'), ('조개류'), ('생선'), ('견과류'), ('바나나'), ('토마토');

CREATE TABLE IF NOT EXISTS users_allergies (
    user_id INT UNSIGNED NOT NULL,
    allergy_id INT NOT NULL,
    PRIMARY KEY (user_id, allergy_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (allergy_id) REFERENCES allergies(allergy_id) ON DELETE CASCADE
);