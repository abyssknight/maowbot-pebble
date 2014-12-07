/**
 * MaowBot Controller App
 */

var UI = require('ui');
var ajax = require('ajax');

var main = new UI.Card({
  title: 'MaowBot',
  icon: 'images/menu_icon.png',
  subtitle: 'Controller App',
  body: 'Press select button.'
});

var URL = 'http://192.168.151.76:3000/api/';

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

main.on('click', 'select', function(e) {
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
