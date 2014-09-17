# 数字坐标轴

---

数字坐标轴的实例

---

## Coordinate

````html

<p>鼠标移动显示画布坐标、坐标轴值</p>
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

  var text = canvas.addShape('text',{
    x : 30,
    y : 30,
    text : '画布(30,30),坐标轴(0,120)',
    "text-anchor" : 'start'
  });

  var circle = canvas.addShape('circle',{
    cx : 30,
    cy : 30,
    r : 5,
    fill : 'red'
  });

  canvas.on('mousemove',function(ev){
    var point = canvas.getPoint(ev.clientX,ev.clientY),
      x = xaxis.getValue(point.x),
      y = yaxis.getValue(point.y);

    text.attr(point);
    circle.attr({
      cx : point.x,
      cy : point.y
    });
    text.attr('text','画布(' + point.x+ ','+point.y + '),坐标轴(' + parseInt(x)+ ','+parseInt(y) + ')');
  });
  
}); 
````


## tickOffset


````html
<div id="c2"></div>

````
````javascript
seajs.use(['index','achart-canvas','achart-plot'], function(Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'c2',
    width : 500,
    height : 300
  });

  var back = canvas.addGroup(Plot.Back,{
    margin : 30,
    border : {
      stroke : '#ddd'
    }
  }),
  plotRange = back.get('plotRange');
  
  //底部
  var axis = canvas.addGroup(Axis.Number,{
    
    plotRange : plotRange,
    position : 'bottom',
    min : 0,
    max : 100,
    tickInterval : 10,
    title : {
      text : 'tickOffset 10',
      y : 20
    },
    tickOffset : 10,
    labels : {
      label : {
        y : 10
      }
    }
  });

  //顶部
  var axis1 = canvas.addGroup(Axis.Number,{
    
    plotRange : plotRange,
    position : 'bottom',
    min : 0,
    max : 100,
    position : 'top',
    tickInterval : 10,
    title : {
      text : 'tickOffset[20,5]',
      y : 20
    },
    tickOffset : [20,5],
    labels : {
      label : {
        y : 10
      }
    }
  });

  //底部
  var axis = canvas.addGroup(Axis.Number,{
    
    plotRange : plotRange,
    position : 'bottom',
    min : -3,
    max : 105,
    ticks : [-10,0,10,20,30,40,50,60,70,80,90,100,110],
    autoOffset : true,
    y : -100,
    tickInterval : 10,
    title : {
      text : 'tickOffset auto',
      y : 20
    },
    tickOffset : 10,
    labels : {
      label : {
        y : 10
      }
    }
  });

}); 
````


## 非均匀坐标轴

````html

<p>鼠标移动显示画布坐标、坐标轴值</p>
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
      }
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
    ticks : [0,10,100,200,500,510,520],
    grid : {
      line : {
        stroke : '#c0c0c0'
      },
      minorLine : {
        stroke : '#e0e0e0'
      },
      minorCount : 2
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

  var text = canvas.addShape('text',{
    x : 30,
    y : 30,
    text : '画布(30,30),坐标轴(0,520)',
    "text-anchor" : 'start'
  });

  var circle = canvas.addShape('circle',{
    cx : 30,
    cy : 30,
    r : 5,
    fill : 'red'
  });

  canvas.on('mousemove',function(ev){
    var point = canvas.getPoint(ev.clientX,ev.clientY),
      x = xaxis.getValue(point.x),
      y = yaxis.getValue(point.y);

    text.attr(point);
    circle.attr({
      cx : point.x,
      cy : point.y
    });
    text.attr('text','画布(' + point.x+ ','+point.y + '),坐标轴(' + parseInt(x)+ ','+parseInt(y) + ')');
  });
  
}); 
````