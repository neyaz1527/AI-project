ALTER TABLE users ADD COLUMN name_new VARCHAR(100);
UPDATE users SET name_new = name;
ALTER TABLE users DROP COLUMN name;
ALTER TABLE users RENAME COLUMN name_new TO name;
ALTER TABLE users ALTER COLUMN name SET NOT NULL;
