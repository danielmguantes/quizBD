var models = require('../models');


exports.load= function(req, res, next,quizId) {
	models.Quiz.findById(quizId)
	 .then(function(quiz){
	 	if(quiz){
	 		req.quiz=quiz;//añade quiz a req como parametro
	 		next();
	 	}else{
	 		next(new Error('No existe quizId='+ quizId));
	 	}
	 }).catch(function(error){next(error);});

};


// GET /quizzes
exports.index = function(req, res, next) {
	if(req.query.search){
		var search=req.query.search;
		var searchArray=search.split(" ");
		search="%";
		search+=searchArray.join("%");
		search+="%";

		models.Quiz.findAll({where: ["question like ?",search]})
		.then(function(quizzes){
			var orderedQuizzes=quizzes.sort(sortQuizzes);
			res.render('quizzes/index.ejs', { quizzes: orderedQuizzes});
		})
	}

	models.Quiz.findAll()
		.then(function(quizzes) {
			res.render('quizzes/index.ejs', { quizzes: quizzes});
		})
		.catch(function(error) {next(error);});
};


// GET /quizzes/:id
exports.show = function(req, res, next) {
	var answer=req.query.answer || '';
	res.render('quizzes/show',{quiz: req.quiz, answer: answer});
};


// GET /quizzes/:id/check
exports.check = function(req, res) {
	var answer = req.query.answer || "";
	var result = answer === req.quiz.answer ? 'Correcta' : 'Incorrecta';
	res.render('quizzes/result', { quiz: req.quiz, result: result, answer: answer });
};







/*
* Funcion para ordenar la preguntas buscadas con search 
* en exports.index
*/
function sortQuizzes(q1,q2){
	console.log(q1.question.toLowerCase()+","+q2.question.toLowerCase());
	 if (q1.question.toLowerCase() < q2.question.toLowerCase())
	    return -1;
	  else if (q1.question.toLowerCase() > q2.question.toLowerCase())
	    return 1;
	  else 
	    return 0;
}


