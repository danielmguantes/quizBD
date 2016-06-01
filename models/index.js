var path = require('path');

// Cargar ORM
var Sequelize = require('sequelize');

var url, storage;
if (!process.env.DATABASE_URL) {
    url = "sqlite:///";
    storage = "quiz.sqlite";
} else {
    url = process.env.DATABASE_URL;
    storage = process.env.DATABASE_STORAGE || "";
}
var sequelize = new Sequelize(url, 
	 						  { storage: storage,
				              	omitNull: true 
				              });

// Importar las definiciones de las tablas Quiz de quiz.js y Comment comment.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

var Comment = sequelize.import(path.join(__dirname,'comment'));

var User= sequelize.import(path.join(__dirname,'user'));

//Relaciones
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

//
exports.Quiz = Quiz; // exportar definición de tabla Quiz
exports.Comment=Comment;
exports.User=User;