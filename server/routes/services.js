const Router =  require('express');
const Services = require('../models/service.model') ;
const { STATUS, ROLE } = require('../constants/common');

const route = Router();

const saveService = async (req, res) => {

  const { name, email, phone, comment, task } = req.body;

  const user = await Services.findOne({ name, email, phone });

  try {
    if(user) {
      await Services.findOneAndUpdate({ name, email, phone }, { tasks: [ ...user.tasks, {
        date: new Date(),
        status: STATUS.PENDING,
        comment: comment || '',
        task,
      } ]})

    } else {
      const model = new Services({
        ...req.body,
        role: ROLE.USER,
        tasks: [{
          task,
          comment: comment || '',
          date: new Date(),
          status: STATUS.PENDING,
        }]
      })

      const res = await model.save();
    }
    
    res.json({
      name: req.body,
    });
  } catch(e) {
    console.log(e, 'res');
    
    res.json({
      error: e,
    });
  }
};


const getServiceList = async (req, res) => {
  const result = await Services.find({ role: 'USER'}).exec();

  res.json(result);
}

route.post('/service', saveService);
route.get('/service', saveService);
route.get('/service/all', getServiceList);



module.exports = {
  serviceRoutes: route,
}