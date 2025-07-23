const validate=(schema)=>async(req,res,next)=>{
  try{
    const parseBody=await schema.parseAsync(req.body);
    req.body=parseBody;
    next();
  }
  catch(err){
    const status=400;
    const message='Fill the input Properly';
    const extraDetails=err.issues[0].message;
    const error={
      status,
      message,
      extraDetails,
    }
    next(error);
  }
}

module.exports=validate;