# 分类坐标轴

----

分类坐标轴的demo

----


````html

<p>鼠标移动显示画布坐标、坐标轴值</p>
<div id="c1"></div>

````
````javascript
seajs.use(['index','achart-canvas','achart-plot'], function(Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'c1',
    width : 500,
    height : 200
  });

  var back = canvas.addGroup(Plot.Back,{
    margin : 40,
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
      text : '数字坐标轴',
      y : 30,
      fill : 'red'
    },
    
    labels : {
      label : {
        y : 10
      }
    }
  });

  var axis = canvas.addGroup(Axis.Category,{
    plotRange : plotRange,
    position : 'bottom',
    y : -100,
    categories : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月'],
    title : {
      text : '分类坐标轴',
      y : 30,
      fill : 'blue'
    },
    labels : {
      label : {
        y : 10
      }
    }
  });

  
}); 
````


## 坐标系

````html

<p>鼠标移动显示画布坐标、坐标轴值</p>
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
    }
  }),
  plotRange = back.get('plotRange');
  
  //底部
  var xaxis = canvas.addGroup(Axis.Category,{
    
    plotRange : plotRange,
    position : 'bottom',
    categories : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月'],
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
  
  var line = canvas.addShape('path',{
    path : 'M 30,30 L 30 470',
    stroke : '#ddd'
  });
  canvas.on('mousemove',function(ev){
    var point = canvas.getPoint(ev.clientX,ev.clientY);
    var x = xaxis.getValue(point.x),
      y = yaxis.getValue(point.y);

    text.attr(point);
    circle.attr({
      cx : point.x,
      cy : point.y
    });

    //line.attr('path',[['M',point.x,30],["L",point.x,470]]);
    text.attr('text','画布(' + point.x+ ','+point.y + '),坐标轴(' + x+ ','+parseInt(y) + ')');
  });
  
}); 
````