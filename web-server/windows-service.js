var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Nodeppt Web Server V1.0.4',
  description: '',
  script: 'D:\\leo.h.deng\\work\\core\\08 Doc\\02 nodeppts\\web-server\\nodeppt-server.js'
});

svc.user.domain = 'ABS_CORP';
svc.user.account = 'yycheng';
svc.user.password = 'CDE#cde3';

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.on('error',err=>{
  console.log(err)
});

svc.install();