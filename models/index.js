var path=require('path');

//cargar modelo ORM
var Sequelize=require('sequelize');

//usar BBDD SQLite
var sequelize= new Sequelize(null,null,null,{dialect:"sqlite", storage:"quiz.sqlite"});

//importar la def. de la tabla de models/quiz.js
var Quiz=sequelize.import(path.join(__dirname,'quiz'));


//sequelize.sync crea e inicializa la tabla de preguntas en db
sequelize.sync().then(function(){
	return Quiz.count().then(function(c){ //count cuenta las filas de la tabla, cuando termina las pasa a then como param
		if(c===0){//tabla vacia
			return Quiz.create({question: 'Capital de Italia',answer: 'Roma'})//inicializamos la tabla con una pregunta
			.then(function(){console.log('Base de datos inicializada con datos');});
		}
	});
}).catch(function(error){
	console.log("Error sincronizando las tablas de la BBDD:", error);
	process.exit(1);
});

exports.Quiz=Quiz;//exportar definicion de la tabla Quiz