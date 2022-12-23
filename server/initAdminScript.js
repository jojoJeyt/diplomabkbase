const Services = require('./models/service.model') ;


// const service = new Services({
//   name: "Admin",
//   email: "admin@gmail.com",
//   address: "address",
//   phone: "+37544262622",
//   password: "admin123",
//   role: "ADMIN",
//   tasks: [],
// })

// service.save();



const manager = new Services({
  name: "Manager2",
  email: "manager2@gmail.com",
  address: "address",
  phone: "+37544262622",
  password: "manager123",
  role: "MANAGER",
  tasks: [],
})

manager.save();