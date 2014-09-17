# 时间坐标轴

---

时间坐标轴的使用

---

## 一天的时间


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
  var xaxis = canvas.addGroup(Axis.Time,{
    
    plotRange : plotRange,
    position : 'bottom',
    startDate : new Date('2012/01/01').getTime(),
    tickInterval : 2 * 60 * 60 * 1000,
    endDate : new Date('2012/01/02').getTime(), 
    formatter : function(value){
      var time = new Date(value);

      return time.getHours();
    },
    title : {
      text : 'x 轴',
      y : 20
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

  var line = canvas.addShape('path',{
    path : 'M 30,30 L 30 470',
    stroke : '#ddd'
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
    var point = canvas.getPoint(ev.clientX,ev.clientY);
    var x = xaxis.getValue(point.x),
      y = yaxis.getValue(point.y);

    text.attr(point);
    circle.attr({
      cx : point.x,
      cy : point.y
    });

    line.attr('path',[['M',point.x,30],["L",point.x,470]]);
    text.attr('text','画布(' + point.x+ ','+point.y + '),坐标轴(' + new Date(x).toLocaleTimeString()+ ','+parseInt(y) + ')');
  });
  
}); 
````


## 分月


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
  
  var ticks = [];
  
  for(var i = 0; i < 12; i=i+2){
    
    ticks.push(Date.UTC(2010,i,1));
  }
  //底部
  var xaxis = canvas.addGroup(Axis.Time,{
    
    plotRange : plotRange,
    position : 'bottom',
    ticks : ticks,
    formatter : function(value){
      var time = new Date(value);
      return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
    },
    title : {
      text : 'x 轴',
      y : 20
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

  var line = canvas.addShape('path',{
    path : 'M 30,30 L 30 470',
    stroke : '#ddd'
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
    var point = canvas.getPoint(ev.clientX,ev.clientY);
    var x = xaxis.getValue(point.x),
      y = yaxis.getValue(point.y);

    text.attr(point);
    circle.attr({
      cx : point.x,
      cy : point.y
    });

    line.attr('path',[['M',point.x,30],["L",point.x,470]]);
    text.attr('text','画布(' + point.x+ ','+point.y + '),坐标轴(' + new Date(x).toLocaleDateString()+ ','+parseInt(y) + ')');
  });
  
}); 
````