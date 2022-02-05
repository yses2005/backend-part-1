-- Database User
DROP USER IF EXISTS 'testdb'@'localhost';
CREATE USER 'testdb'@'localhost' IDENTIFIED BY 'testdb';

-- Database
CREATE DATABASE testdb;

-- Privileges
GRANT SUPER ON *.* TO 'testdb'@'localhost';
GRANT ALL PRIVILEGES ON testdb.* TO 'testdb'@'localhost';
