# 极坐标


----

使用圆形坐标轴形成极坐标

----


## 圆坐标轴

````html
<div id="c1"></div>

````
````javascript
seajs.use(['index','achart-canvas','achart-plot'], function(Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'c1',
    width : 500,
    height : 500
  });

  var back = canvas.addGroup(Plot.Back,{
    margin : 20,
    border : {
      stroke : '#ddd'
    }
  }),
  plotRange = back.get('plotRange');
  
  //圆形坐标轴
  var axis = canvas.addGroup(Axis.Circle,{
    
    plotRange : plotRange,
    position : 'bottom',
    ticks : [0,45,90,135,180,225,270,315], //8等分圆
    line : {
      stroke : '#4dceff'
    },
    grid : {
      line : {
        'stroke-width' : 1,
        'stroke' : '#7179cb',
        'stroke-dasharray' : '.'
      }
    },
    labels : {
      label : {
        y : 10
      }
    }
  });

  canvas.addShape('circle',{
    cx : plotRange.cc.x,
    cy : plotRange.cc.y,
    r : 5,
    fill : '#fc836b',
    stroke : 'none'
  });

  canvas.addShape('text',{

    x : plotRange.cc.x,
    y : plotRange.cc.y - 15,
    fill : '#fc836b',
    'text-anchor' : 'middle',
    text : '坐标圆心'

  });

  
}); 
````

## 半径坐标轴


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
    margin : 20,
    border : {
      stroke : '#ddd'
    }
  }),
  plotRange = back.get('plotRange');
  
  //圆形坐标轴
  var raxis = canvas.addGroup(Axis.Circle,{
    
    plotRange : plotRange,
    ticks : [0,45,90,135,180,225,270,315], //8等分圆
    line : {
      stroke : '#7179cb'
    },
    grid : null,
    labels : {
      label : {
        y : 10
      }
    }
  });

  var rAxis = canvas.addGroup(Axis.Radius,{    
    circle : raxis,
    ticks : [0,45,90,135,180,225,270,315], //8等分圆
    line : {
      stroke : '#4dceff'
    },
    grid : {
      type : 'circle',
      line : {
        'stroke-width' : 1,
        'stroke' : '#4dceff',
        'stroke-dasharray' : '.'
      }
    },
    labels : {
      label : {
        x : 10
      }
    }
  });

  canvas.sort();

  
}); 
````


## 半径坐标轴，多边形栅格


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
    margin : 20,
    border : {
      stroke : '#ddd'
    }
  }),
  plotRange = back.get('plotRange');
  
  //圆形坐标轴
  var raxis = canvas.addGroup(Axis.Circle,{
    
    plotRange : plotRange,
    ticks : [0,45,90,135,180,225,270,315], //8等分圆
    line : {
      stroke : '#7179cb'
    },
    grid : {
      line : {
        stroke : '#7179cb',
        'stroke-dasharray' : '.'
      }
      
    },
    labels : {
      label : {
        y : 10
      }
    }
  });

  var rAxis = canvas.addGroup(Axis.Radius,{    
    circle : raxis,
    ticks : [0,45,90,135,180,225,270,315], //8等分圆
    line : null,
    grid : {
      type : 'polygon',
      line : {
        'stroke-width' : 1,
        'stroke' : '#4dceff',
        'stroke-dasharray' : '.'
      }
    },
    tickLine : null,
    labels : {
      label : {
        x : 10,
        y : 10
      }
    }
  });

  canvas.sort();

  
}); 
````

## 极坐标系


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
    margin : 20,
    border : {
      stroke : '#ddd'
    }
  }),
  plotRange = back.get('plotRange');
  
  //圆形坐标轴
  var caxis = canvas.addGroup(Axis.Circle,{
    
    plotRange : plotRange,
    ticks : [0,45,90,135,180,225,270,315], //8等分圆
    line : {
      stroke : '#7179cb'
    },
    grid : {
      line : {
        stroke : '#7179cb',
        'stroke-dasharray' : '.'
      }
      
    },
    labels : {
      label : {
        y : 10
      }
    }
  });
  
  //半径坐标轴
  var raxis = canvas.addGroup(Axis.Radius,{    
    circle : caxis,
    min : 0,
    max : 100,
    tickInterval : 20,
    line : null,
    grid : {
      type : 'polygon',
      line : {
        'stroke-width' : 1,
        'stroke' : '#4dceff',
        'stroke-dasharray' : '.'
      }
    },
    tickLine : null,
    labels : {
      label : {
        x : 10,
        y : 10
      }
    }
  });

  var group = canvas.addGroup();
  var data = [10,25,33,47,52,28,71,39]
  
  for(var i = 0; i< 8 ;i++){
    var val = data[i],
      angle = caxis.getOffsetByIndex(i),
      point = raxis.getPointByAngle(angle,val);

    group.addShape('circle',{
      cx : point.x,
      cy : point.y,
      r : 5,
      fill : '#a9d052',
      'fill-opacity' : 0.5,
      stroke : '#a9d052'
    });
  }

  var text = canvas.addShape('text',{
    x : plotRange.cc.x,
    y : plotRange.cc.y,
    "text-anchor" : 'start',
    text : '坐标轴(0,0)'
  });

  var circle = canvas.addShape('circle',{
    cx : plotRange.cc.x,
    cy : plotRange.cc.y,
    r : 5,
    fill : 'red'
  });
  
  canvas.on('mousemove',function(ev){
    var point = canvas.getPoint(ev.clientX,ev.clientY),
      angle = caxis.getCircleAngle(point.x,point.y); //角度

    var xValue = caxis.getValue(angle),
      yValue = raxis.getValueByPoint(point.x,point.y);

    text.attr(point);
    circle.attr({
      cx : point.x,
      cy : point.y
    });
    text.attr('text','画布(' + point.x+ ','+point.y + '),坐标轴(' + xValue+ ','+parseInt(yValue) + ')');
  });
  
}); 
````