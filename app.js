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
const { query } = require('express');
const bcryptjs = require('bcryptjs');
const { get } = require('express/lib/response');
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

app.post('/sign-in', async (req, res)=>{
	const email = req.body.email;
	const contraseña = req.body.password;
	let passwordHassh = await bcryptjs.hash(contraseña, 8);
	if(email && contraseña){
		connection.query('SELECT * FROM tfg.usuarios WHERE email = ?', [email], async (error, results)=>{
			if(results.length == 0 || !(await bcryptjs.compare(contraseña, results[0].contraseña))){
				res.render('sign-up',{
					alert:true,
					alertTitle: "Error",
					alertMessage: "Email y/o contraseña incorrectos",
					alertIcon: "error",
					showConfirmButton: true,
					time:3000,
					ruta:'sign-in.ejs'
				});
			}else{
				req.session.loggedin = true;
				req.session.name = results[0].name
				res.render('sign-up',{
					alert:true,
					alertTitle: "Bienvenid@",
					alertMessage: "Email y coontraseña correctos",
					alertIcon: "success",
					showConfirmButton:false,
					time:3000,
					ruta:''
				});
			}
		})
			}else{
				res.render('sign-up',{
					alert:true,
					alertTitle: "Advertencia",
					alertMessage: "¡Por favor ingrese un usuario y/o contraseña",
					alertIcon: "warning",
					showConfirmButton:true,
					time:false,
					ruta:'sign-in.ejs'
				});
			}
})

app.get('/', (req, res)=>{
	if(req.session.loggedin){
		res.render('index',{
			login: true,
			name: req.session.name
		});
	}else{
		res.render('index',{
			login: false,
			name: 'Debe iniciar sesión'
		});
	}
})



app.get('/sign-up.ejs', (req, res)=> {
	res.render('sign-up',{		
	});			
});

app.post('/sign-up', async (req, res)=> {
	
	const nombre = req.body.name;
	const email = req.body.email;
	const contraseña = req.body.password;
	const rol = req.body.rol;
	let passwordHassh = await bcrypt.hash(contraseña, 8);
	connection.query('INSERT INTO tfg.usuarios SET ?', {rol: rol, nombre: nombre, email: email, contraseña: passwordHassh}, async(error, results)=>{
		if(error){
			console.log(error);
		}else{
			console.log('Nuevo cliente agregado correctamente')
			res.render('sign-up',{
				alert: true,
				alertTitle: "Registro",
				alertMessage:"¡Todo correcto!",
				alertIcon:'success',
				showConfirmButton:false,
				time:3000,
				ruta:''

			});	
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