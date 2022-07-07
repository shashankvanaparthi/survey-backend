const db = require('../models');
const Question = db.Question;
const Option = db.Options;
exports.createOption = (req,res) =>{
    Option.create({
       description:req.body.description,
       questionId:req.question.dataValues.id,
   }).then(ques => {
       res.status(200).json({
           success:true,
           msg:'Option created Sucessfully',
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

exports.editOption = async (req,res) => {
   try {
       const opt = await Option.findByPk(req.params.id);
       if(!opt) {
           res.status(404).json({
               success:false,
               msg:'Enter a valid Question number'
           })
       }
       opt.description = req.body.description;
       await opt.save();
       return res.status(200).json({
           success:true,
           msg:'Option edited Sucessfully',
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

exports.deleteOption = async (req,res) => {
   try {
       const opt = await Option.findByPk(req.params.id);
       if(!opt) {
           return res.status(404).json({
               success:false,
               msg:'Enter a valid Option number'
           })
       }
       const delOpt = await Option.destroy({where:{id:req.params.id}});
       res.status(200).json({
           success:true,
           msg:'Option deleted Sucessfully',
           data:{
               delOpt
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