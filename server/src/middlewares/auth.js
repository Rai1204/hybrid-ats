const jwt = require('jsonwebtoken');
module.exports = function(req,res,next){
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if(!token) return res.status(401).json({msg:'No token'});
  try{
    const data = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = { id: data.id, role: data.role };
    next();
  }catch(e){
    return res.status(401).json({msg:'Invalid token'});
  }
};
