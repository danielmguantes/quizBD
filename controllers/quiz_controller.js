var models=require('../models');

//GET /question
exports.question=function(req,res,next){
	models.Quiz.findOne()
	.then(function(quiz){
		if(quiz){
			var answer=req.query.answer || '';
			res.render('quizzes/question',{question:quiz.question, answer:answer});
		}else{
			throw new Error('No hay preguntas en la BBDD.');
		}
	}).catch(function(error){next(error);});//llama al MW de error
};	

//GET /check







exports.question=function(req,res,next){
	var answer= req.query.answer || '';
	res.render('quizzes/question',{question:'Capital de Italia',answer: answer})
}


exports.check=function(req,res,next){
	var answer= req.query.answer || '';
	var result=req.query.answer== 'Roma' ? 'Correcta' : 'Incorrecta';
	res.render('quizzes/result',{result:result, answer: answer});
}