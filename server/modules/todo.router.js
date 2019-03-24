const express = require('express');
const router = express.Router();
const pool = require('./pool');

router.get('/todo', (req, res) => {
    console.log('asking for todo list');
    // Get the koalas from the database
    pool.query('SELECT * FROM "todo" ORDER BY "due";')
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log(`Error getting todo list`, error);
        res.sendStatus(500); 
      })
  })

router.post('/todo', (req, res) => {
    let todo = req.body;
    console.log('Adding todo', todo);
    let sqlText = `INSERT INTO "todo" ("todo", "due", "status")
    VALUES ($1, $2, $3);`;
    pool.query(sqlText, [todo.todo, todo.due, todo.status])
        .then( (response) => {
        res.sendStatus(201);
        })
        .catch( (error) => {
        console.log('Failed to add todo', todo);
        console.log(error);
        res.sendStatus(500);
        })
})

router.put('/todo/:id', (req,res) => {
    let todo = req.body;    
    console.log('this koala has been updated');
    let sqlText = `UPDATE "todo" SET "status" = $1 WHERE "id" = $2;`;
    pool.query(sqlText, [todo.status,todo.id]
    ).then( (result)=> {
        res.sendStatus(201);
    }).catch ( (error) => {
        res.sendStatus(500);
    })
})


router.delete('/todo/:id', (req, res) => {
    let id = req.params.id;
    console.log('Deleting todo with id:', id);
    let sqlText = `DELETE FROM "todo" WHERE "id" = $1`;
    pool.query(sqlText, [id])
        .then( (result) => {
            res.sendStatus(200);
        })
        .catch( (error) => {
            console.log('Failed to delete todo item: ', id);
            console.log(error);
            res.sendStatus(500);
        })
})

module.exports = router;