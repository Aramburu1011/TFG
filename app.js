//1- LLamamos a las librerias
const express = require('express');
const passport = require('passport');
const app = express();

//2 - Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({extended:false}));
app.use(express.json());//además le decimos a express que vamos a usar json

//4 -seteamos el directorio de assets
app.use('/resources',express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//5 - Establecemos el motor de plantillas
app.set('view engine','ejs');

//6 -Invocamos a bcrypt
const bcrypt = require('bcryptjs');

//7- variables de session
const session = require('express-session');
app.use(session({
	secret:'secret',
	resave: true,
	saveUninitialized: true
}));

// 8 - Invocamos a la conexion de la DB
const connection = require('./database/db');
const req = require('express/lib/request');
// const { session } = require('passport/lib');

//9 - Rutas
app.get('/', (req, res)=> {
		res.render('index',{		
		});			
});

app.get('/sign-in.ejs', (req, res)=> {
	res.render('sign-in',{		
	});			
});



app.get('/sign-up.ejs', (req, res)=> {
	res.render('sign-up',{		
	});			
});

app.post('/sign-up', async (req, res)=> {
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;
	const rol = req.body.rol;
	let passwordHassh = await bcrypt.hash(password, 8);
	connection.query('INSERT INTO tfg.usuarios (`id`, `rol`, `nombre`, `contraseña`, `email`) VALUES', {name: name, email: email, rol: rol, password: passwordHassh }, async(error, results)=>{
		if(error){
			console.log(error);
		}else{
			console.log('Se agregó correctamente')
		}
	})
});



app.get('/payments.ejs', (req, res)=> {
	res.render('payments',{		
	});			
});

app.get('/profile.ejs', (req, res)=> {
	res.render('profile',{		
	});			
});

app.get('/contact.ejs', (req, res)=> {
	res.render('contact',{		
	});			
});

app.listen(8080, (req, res)=>{
    console.log('SERVER RUNNING IN http://localhost:8080');
});