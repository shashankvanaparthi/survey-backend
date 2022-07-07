const db = require('../models');
const Question = db.Question;
const Option = db.Options;
exports.editQuestion = async (req,res) => {
    try {
        const question = await Question.findByPk(req.params.id);
        if(!question) {
            res.status(404).json({
                success:false,
                msg:'Enter a valid Question number'
            })
        }
        question.description = req.body.description;
        await question.save();
        res.status(200).json({
            success:true,
            msg:'Question created Sucessfully',
            data:{
                question
            }
        });
    }
    catch(e) {
        res.status(400).json({
            success:false,
            msg:e.message
        })
    }

}

exports.deleteQuestion = async (req,res) => {
    try {
        const ques = await Question.findByPk(req.params.id);
        if(!ques) {
            return res.status(404).json({
                success:false,
                msg:'Enter a valid Question number'
            })
        }
        const delQuestion = await Question.destroy({where:{id:req.params.id}});
        res.status(200).json({
            success:true,
            msg:'Question deleted Sucessfully',
            data:{
                delQuestion
            }
        });
    }
    catch (e) {
        return res.status(400).json({
            success:false,
            msg:e.message
        })
    }
    

}


exports.createQuestion = (req,res) =>{
    console.log(req.survey);
     Question.create({
        description:req.body.description,
        surveyId:req.survey.dataValues.id,
    }).then(ques => {
        res.status(200).json({
            success:true,
            msg:'Question created Sucessfully',
            data:{
                ques
            }
        })
    }).catch(err => {
        res.status(400).json({
            success:false,
            msg:err.message
        })
    })
}