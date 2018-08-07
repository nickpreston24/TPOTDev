//to install, use:  npm install --save-dev mocha chai
var expect = require('chai').expect
const sqlite3 = require('sqlite3').verbose();
///Create a database in local memory
describe('sqlite test', () => {
    it('should connect to db', () => {
        //ARRANGE
        let database = new sqlite3.Database(':memory:', (error) => {
            if (error) return console.error(error.message);
            console.log('Connected to the in-memory SQLite database...');
        });

        //ACT

        //ASSERT
        // expect(db).to.not.throw();
        database.close((error) => {
            if (error) return console.error(error.message);
            console.log('Closed the db connection.');
        });
    })
});

//Create database local to this project:
describe('tutorial - create db', () => {
    it('should create local db', () => {
        var database = new sqlite3.Database('tpot.db');
        // var check;

        database.serialize(() => {
            database.run("CREATE TABLE if not exists user_info (info TEXT)");
            var statement = database.prepare("INSERT INTO user_info VALUES (?)");

            for (var i = 0; i < 10; i++) {
                statement.run("Ipsum " + i);
            }

            statement.finalize();


            database.each("SELECT rowid AS id, info FROM user_info", (error, row) => {
                console.log(row.id + ": " + row.info);
            });
        });

        // database.run("delete from user_info");
        console.log('cleared user_info table');

        database.close();
    });
});