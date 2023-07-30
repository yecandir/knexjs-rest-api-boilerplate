PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
COMMIT;

-- CREATE TABLES

CREATE TABLE users (
    id serial primary key,
    name text
);

CREATE TABLE posts (
    id serial primary key,
    body text
);

-- SEED DB

insert into users(name)
values ('test1'), ('test2'), ('test3'), ('test4');

insert into posts(body)
values ('body1'), ('body2'), ('body3'), ('body4');
