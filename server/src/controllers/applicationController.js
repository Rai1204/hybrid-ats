const Application = require('../models/Application');
const User = require('../models/User');

exports.createApplication = async (req,res)=>{
  try{
    const {title,roleType,resume,applicantId} = req.body;
    const app = await Application.create({
      title, roleType, resume, applicant: applicantId,
      history: [{status:'Applied', by:'Applicant', note:'Initial submission'}]
    });
    res.status(201).json(app);
  }catch(err){ console.error(err); res.status(500).json({msg:'Server error'}); }
};

exports.getMyApplications = async (req,res)=>{
  try{
    const userId = req.user.id;
    const apps = await Application.find({applicant:userId}).populate('applicant','name email');
    res.json(apps);
  }catch(err){ console.error(err); res.status(500).json({msg:'Server error'}); }
};

exports.getAll = async (req,res)=>{
  try{
    const {role} = req.user;
    if(role==='admin'){
      // admin: return non-tech applications only per your spec
      const apps = await Application.find({roleType:'non-tech'}).populate('applicant','name email');
      return res.json(apps);
    } else if(role==='botmimic'){
      const apps = await Application.find({roleType:'tech'}).populate('applicant','name email');
      return res.json(apps);
    }
    res.status(403).json({msg:'Not allowed'});
  }catch(err){ console.error(err); res.status(500).json({msg:'Server error'}); }
};

exports.updateStatus = async (req,res)=>{
  try{
    const {id} = req.params;
    const {status,note} = req.body;
    const by = req.user.role === 'botmimic' ? 'BotMimic' : req.user.role === 'admin' ? 'Admin' : 'Applicant';
    const app = await Application.findById(id);
    if(!app) return res.status(404).json({msg:'Not found'});
    app.status = status;
    app.history.push({status, by, note});
    await app.save();
    res.json(app);
  }catch(err){ console.error(err); res.status(500).json({msg:'Server error'}); }
};

// BotMimic helper to progress apps (simulated trigger)
exports.progressTech = async (req,res)=>{
  try{
    const apps = await Application.find({roleType:'tech'});
    // naive progression: Applied -> Reviewed -> Interview -> Offer
    const order = ['Applied','Reviewed','Interview','Offer'];
    const updates = [];
    for(const a of apps){
      const curIdx = order.indexOf(a.status) >= 0 ? order.indexOf(a.status) : 0;
      if(curIdx < order.length-1){
        a.status = order[curIdx+1];
        a.history.push({status:a.status, by:'BotMimic', note:'Automated update'});
        await a.save();
        updates.push({id:a._id, status:a.status});
      }
    }
    res.json({updated:updates});
  }catch(err){ console.error(err); res.status(500).json({msg:'Server error'}); }
};
