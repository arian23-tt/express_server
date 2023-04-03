const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express();
const PORT = 5000;
const bd= mysql.createConnection({
    host:"localhost",
    password:"",
    user:"root",
    database:"blog",
});
app.use(cors())
app.use(express.json());

app.get('/getBlog', (req, res)=>{
    bd.query('SELECT * FROM blog_user', (error, result)=>{
        if(error){
            console.log(error);
        } else{
            res.send(result);
        }
    })
})
app.post('/registrUser', (req,res)=>{
    const {FirstName, LastName, Login, Password, token_user = Math.random(1, 1000)}=req.body;
    
    bd.query('INSERT INTO user SET ?',
    {
        FirstName: FirstName,
        LastName: LastName,
        Login: Login,
        Password: Password,
        token_user:token_user
    },
    (error, result)=>{
        if (error){
            console.log(error);
        }else{
            res.send(result)
        }
    })
})

app.put('/logout',(req,res)=>{
    const {token_user}= req.body;
    bd.query('UPDATE user SET token_user = NULL WHERE token_user = ?',
    [token_user],
    (error,result)=>{
        if(error){
            console.log(error)
        }else{
            res.send(result)
        }
    })
})

app.post('/postBlog', (req, res)=>{
    const {title, text, id}= req.body;
    bd.query('INSERT INTO blog_user SET ?', 
    {
        title: title,
        text:text,
        id:id
    },
    (error, result)=>{
        if(error){
            console.log(error);
        } else{
            res.send(result);
        }
    })
})

app.put('/signIn',(req,res)=>{
    const {token_user}=req.body;
    bd.query('UPDATE user token_user = ? WHERE token_user = null',
    [token_user],
    (error, result)=>{
        if(error){
            console.log(error)
        }else{
            res.send(result)
        }
    }
    )
})

app.delete('/delete/:id', (req, res) => {
    const id = req.body.id;
    bd.query('DELETE FROM blog_user WHERE id = ?', id, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
      }
    });
  });

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);