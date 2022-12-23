const Router =  require('express');
const Services = require('../models/service.model') ;
const { STATUS } = require('../constants/common');

const route = Router();


const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Services.findOne({ email, password });

  !!user ? res.json({ user, success: true }) : res.json({ success: false })
};

const getManagerList = async(req, res) => {
  const result = await Services.find({ role: 'MANAGER'}).exec();

  res.json(result);
}

const getListByManager = async(req, res) => {
  const result = await Services.find({ "tasks.managerId": req.params.id }).exec();

  res.json(result);
}

const assignManager = async (req, res)  => {
  console.log(req.body, 'HRE');
  const result = await Services.findOneAndUpdate({"tasks._id": req.body.ticket.taskId.toString() },
    {$set: { "tasks.$.managerId": req.body.managerId, "tasks.$.status": STATUS.ACTIVE }});


    const newData =  await Services.findOne( { _id: req.body.ticket._id} ).exec();

    console.log(result, 'result');

    res.json({
      success: true,
      result: newData
    });
    
}

const closeTicket = async (req, res) => {
  await Services.findOneAndUpdate({ "tasks.managerId": req.params.id, "tasks._id": req.body.ticketId }, {$set: { "tasks.$.status": STATUS.CLOSE, "tasks.$.finishDate": new Date() }}).exec();
  const result = await Services.find({ "tasks.managerId": req.params.id }).exec();
  res.json(result);
};

const removeTicket = async (req, res) => {
  await Services.findOneAndDelete({ "tasks._id": req.params.id }).exec();
  res.json({
    success: true,
  });
}


const editTicket = async (req, res) => {
  const { ticketId } = req.params;
  const { task, name, email, phone, address } = req.body;

  await Services.findOneAndUpdate({ "tasks._id": ticketId }, { $set: { "tasks.$.task": task, address, name, email, phone   }}).exec();


  res.json({})
}


route.post('/login', login);
route.get('/manager/list', getManagerList);
route.get('/manager/list/:id', getListByManager);
route.patch('/manager/close/:id', closeTicket);
route.delete('/manager/:id', removeTicket);
route.patch('/manager/assign', assignManager);
route.patch('/manager/edit/ticket/:ticketId/:id', editTicket);



module.exports = {
  authRoutes: route,
}