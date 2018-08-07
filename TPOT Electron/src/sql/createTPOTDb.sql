--Create sqlite3 Database

 CREATE TABLE
 if not exists TPOT.documents
 (docName TEXT,
 docExtension TEXT,
 Status TEXT); --todo: see about making enum

--Create any Stored Procedures