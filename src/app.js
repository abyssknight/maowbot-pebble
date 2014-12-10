/**
 * MaowBot Controller App
 */

var UI = require('ui');
var ajax = require('ajax');
var Accel = require('ui/accel');

var main = new UI.Card({
  title: 'MaowBot',
  icon: 'images/menu_icon.png',
  subtitle: 'Controller App',
  body: 'Press up button for menu, down for accelerometer.'
});

var URL = 'http://172.20.10.2:3000/api/';

function sendCmd(cmd){  
  ajax(
    {
      url: URL + cmd,
      type: 'json'
    },
    function(data) {
      // Success!
      console.log('Successfully fetched maow data!');
      console.log(data);
    },
    function(error) {
      // Failure!
      console.log('Failed fetching maow data: ' + error);
    }
  );
}


main.show();

var maowstatus = false;

main.on('click', 'down', function(e) {
  var card = new UI.Card({
    title: "Accelerometer Control"
  });
  Accel.init();
  card.on('accelData', function(e) {
    // Average all the fields for each reading
    var avg = {x: 0, y: 0, z: 0};    
    for (var i = 0; i < e.accels.length; i++){
      avg.x = avg.x + e.accels[i].x;
      avg.y = avg.y + e.accels[i].y;
      avg.z = avg.z + e.accels[i].z;      
    }
    avg.x = avg.x / e.accels.length;
    avg.y = avg.y / e.accels.length;    
    avg.z = avg.z / e.accels.length;    
    
    card.body(JSON.stringify(avg));
    console.log(JSON.stringify(avg));
    
    if ((Math.abs(avg.x) < 500) && (Math.abs(avg.y) < 500)){
      sendCmd('stop');
      card.subtitle('stop');      
    }
    // Pos X is up (point hand up)
    else if (avg.x > 600){
      sendCmd('up');
      card.subtitle('Up');
    }     
    // Neg X is down (point hand down)
    else if (avg.x < -600){
      sendCmd('down');    
      card.subtitle('Down');      
    }     
    // Pos Y is right (rotate wrist)
    if (avg.y > 600){
      sendCmd('right');  
      card.subtitle('Right');
    }     
    // Neg Y is left (rotate wrist)
    else if (avg.y < -600){
      sendCmd('left');    
      card.subtitle('Left');
    } 
    
  });
  // Accel tap to stop
  card.on('accelTap', function(e) {
    if (maowstatus){
      sendCmd('maowon');
    } 
    else {
      sendCmd('maowoff');
    }
    maowstatus = !maowstatus;
  });
  card.show();
});

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Stop'
      },{
        title: 'Maow On'
      }, {
        title: 'Maow Off'
      }, {
        title: 'Wag Left'
      }, {
        title: 'Wag Right'
      }, {
        title: 'Center Tail'
      }, {
        title: 'Up'
      }, {
        title: 'Down'
      }, {
        title: 'Left'
      }, {
        title: 'Right'
      }
      ]
    }]
  });
  
  menu.on('select', function(e) {
    switch(e.itemIndex){
      case 0:
        sendCmd('stop');        
        break;
      case 1:
        sendCmd('maowon');                
        break;
      case 2:
        sendCmd('maowoff');                
        break;        
      case 3:
        sendCmd('wagleft');                
        break;
      case 4:
        sendCmd('wagright');                
        break;
      case 5:
        sendCmd('center');                
        break;
      case 6:
        sendCmd('up');                
        break;     
      case 7:
        sendCmd('down');                
        break;     
      case 8:
        sendCmd('left');                
        break;     
      case 9:
        sendCmd('right');                
        break;             
    }
 
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});
