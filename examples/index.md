# Demo

---

## Normal usage

````html

<div id="c1"></div>

````
````javascript
seajs.use(['index','achart-canvas'], function(Axis,Canvas) {
  
  var canvas = new Canvas({
    id : 'c1',
    width : 500,
    height : 500
  });

  var axis = canvas.addGroup(Axis,{
    start : {x : 10,y : 250},
    end : {x : 490, y : 250},
    position : 'bottom',
    ticks : [0,1,2,3,4,5,6,7,8,9],
    tickOffset : 10,
    title : {
      text : 'x 轴坐标',
      'font-size' : 18,
      y : 30
    },
    labels : {
      label : {
        y : 10
      }
    }
  });
  
}); 
````

## Grid


````html

<div id="c2"></div>

````
````javascript
seajs.use(['index','achart-canvas','achart-plot'], function(Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'c2',
    width : 500,
    height : 500
  });

  var back = canvas.addGroup(Plot.Back,{
    margin : 30,
    border : {
      stroke : '#ddd'
    },
    background : {
      stroke : '#ededed',
      'stroke-dasharray' : '.'
    }
  }),
  plotRange = back.get('plotRange');
  
  //底部
  var axis = canvas.addGroup(Axis,{
    
    plotRange : plotRange,
    position : 'bottom',
    ticks : [0,1,2,3,4,5,6,7,8,9],
    title : {
      text : 'xxx',
      y : 10
    },
    grid : {
      line : {
        stroke : '#c0c0c0'
      },
      minorLine : {
        stroke : '#e0e0e0'
      },
      minorCount : 2
    },
    labels : {
      label : {
        y : 10
      }
    }
  });
  
}); 
````

## Position


````html

<div id="c3"></div>

````
````javascript
seajs.use(['index','achart-canvas','achart-plot'], function(Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'c3',
    width : 500,
    height : 500
  });

  var back = canvas.addGroup(Plot.Back,{
    margin : 30,
    border : {
      stroke : '#ddd'
    },
    background : {
      fill : '#ededed'
    }
  }),
  plotRange = back.get('plotRange');
  
  //底部
  var axis = canvas.addGroup(Axis,{
    
    plotRange : plotRange,
    position : 'bottom',
    ticks : [0,1,2,3,4,5,6,7,8,9],
    title : {
      text : 'bottom',
      y : 10
    },
    labels : {
      label : {
        y : 10
      }
    }
  });

  //left
  var axis = canvas.addGroup(Axis,{
    plotRange : plotRange,
    position : 'left',
    ticks : [0,1,2,3,4,5,6,7,8,9],
    title : {
      text : 'axis left',
      x : -5,
      rotate : -90
    },
    labels : {
      label : {
        x : -15,
        rotate : 45
      }
    }
  });

  //right
  var axis = canvas.addGroup(Axis,{
    plotRange : plotRange,
    position : 'right',
    ticks : [0,1,2,3,4,5,6,7,8,9],
    title : {
      text : 'axis right',
      x : 15,
      rotate : 90
    },
    labels : {
      label : {
        x : 15,
        rotate : -45
      }
    }
  });

  var axis = canvas.addGroup(Axis,{
    plotRange : plotRange,
    position : 'top',
    ticks : [0,1,2,3,4,5,6,7,8,9],
    title : {
      text : 'top axis',
      y : 10
    },
    labels : {
      label : {
        y : -10
      }
    }
  });
  
}); 
````


## x,y 坐标轴

````html

<div id="c4"></div>

````
````javascript
seajs.use(['index','achart-canvas','achart-plot'], function(Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'c4',
    width : 500,
    height : 500
  });

  var back = canvas.addGroup(Plot.Back,{
    margin : 30,
    border : {
      stroke : '#ddd'
    }
  }),
  plotRange = back.get('plotRange');
  
  //底部
  var xaxis = canvas.addGroup(Axis.Number,{
    
    plotRange : plotRange,
    position : 'bottom',
    min : 0,
    max : 100,
    tickInterval : 10,
    title : {
      text : 'x 轴',
      y : 20
    },
    grid : {
      line : {
        stroke : '#c0c0c0'
      },
      minorLine : {
        stroke : '#e0e0e0'
      },
      minorCount : 2
    },
    labels : {
      label : {
        y : 10
      }
    }
  });

  //left
  var yaxis = canvas.addGroup(Axis.Number,{
    plotRange : plotRange,
    position : 'left',
    min : 0,
    max : 120,
    tickInterval : 10,
    grid : {
      line : {
        stroke : '#c0c0c0'
      }
    },
    title : {
      text : 'y轴',
      x : -25,
      rotate : -90
    },
    labels : {
      label : {
        x : -15,
        rotate : 45
      }
    }
  });

  var data = [[97,36],[94,74],[68,76],[64,87],[68,27],[74,99],[7,93],[51,69],[38,23],[57,86]];

  for(var i = 0; i< data.length;i++){
    var item = data[i],
      x = xaxis.getOffset(item[0]),
      y = yaxis.getOffset(item[1]);

    canvas.addShape('circle',{
      cx : x,
      cy : y,
      r : 10,
      fill : '#5e90c9',
      stroke : '#5e90c9',
      "fill-opacity" : 0.5
    });
  }
  
}); 
````

