var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Nodeppt Web Server V1.0.4',
  script: 'D:\\leo.h.deng\\work\\core\\10 Code\\05 git-repository\\nodeppt-server\\web-server\\nodeppt-server.js'
});

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall',function(){
  console.log('Uninstall complete.');
  console.log('The service exists: ',svc.exists);
});

// Uninstall the service.
svc.uninstall();