var 
    expect = require('expect.js'),
    sinon = require('sinon'),
    $ = require('jquery');

var Canvas = require('achart-canvas'),
  Axis = require('../src/number');

var Util = require('achart-util');

$('<div id="s1"><button id="btn">change</button></div>').prependTo('body');

var canvas = new Canvas({
  id : 's1',
  width : 500,
  height : 500
});

describe('数字坐标轴生成',function(){

  var axis = canvas.addGroup(Axis,{
    plotRange : {
      start : {x : 20,y : 480},
      end : {x : 480, y : 20}
    },
    min : 0,
    max : 100,
    tickInterval : 10,
    grid : {
      stroke : '#ddd'
    },
    animate : false,
    labels : {
      label : {
        y : 12
      }
    }
  });


  $('#btn').on('click',function(){
    var r =  Math.random()
      axis.change({
        min : 0,
        max : 20 * parseInt(5 + 10 * r),
        tickInterval : 4 * parseInt( 5 + 10 * Math.random())
      });
  });


  var node = axis.get('node');

  it('测试坐标系生成',function(){
    expect(node).not.to.be(undefined);

  });
  it('测试生成的坐标点',function(){
    expect(axis.get('ticks').length).to.be(11);
  });

  it('测试label',function(){
    var labelsGroup = axis.get('labelsGroup');
    expect(labelsGroup.get('children').length).to.be(11);
  });

  it('获取点的x坐标',function(){
    var value = 10,
      offset = axis.getOffset(value);
    expect(offset).to.be(66);
    offset = axis.getOffset(20);
    expect(offset).to.be(112);

    offset = axis.getOffset(15);
    expect(offset).to.be(66 + (112-66)/2);

  });

  describe('测试数字坐标轴变化',function(){
    
    it('更改坐标轴',function(done){
      axis.change({
        min : 0,
        max : 1000,
        tickInterval : 200
      });

      setTimeout(function(){
        done();
      },1000)

    });

    it('测试新生成的坐标点',function(){
      var value = 100;
      var  offset = axis.getOffset(value);
        expect(offset).to.be(66);

        offset = axis.getOffset(200);
        expect(offset).to.be(112);
    });
    it('测试新的label',function(){
      var labelsGroup = axis.get('labelsGroup');
      expect(labelsGroup.getCount()).to.be(6);
    });
  });
});


describe('测试数字中轴坐标系',function(){
  
  var xAxis = canvas.addGroup(Axis,{
    position : 'top',
    plotRange : {
      start : {x : 20,y : 20},
      end : {x : 460, y : 460}
    },
    line : {
        'stroke-width' : 1,
        'stroke' : '#C0D0E0'
    },
    tickOffset : 10,
    y : 220,
    min : -100,
    max : 100,
    tickInterval : 10,
    labels : {
      label : {
        y : 12
      },
      renderer : function(value,cfg,index){
        if(value == 0){
          return ' ';
        }
        return value;
      }
    }
  });

  var yAxis = canvas.addGroup(Axis,{
    position : 'left',
    plotRange : {
      start : {x : 20,y : 460},
      end : {x : 460, y : 20}
    },
    line : {
        'stroke-width' : 1,
        'stroke' : '#C0D0E0'
    },
    tickOffset : 10,
    x : 220,
    min : -100,
    max : 100,
    tickInterval : 10,
    labels : {
      label : {
        x : 12
      },
      renderer : function(value,cfg,index){
        if(value == 0){
          cfg.x += -20;
          cfg.y += -10;
        }
        return value;
      }
    }
  });

  function getPoint(x,y){
    return {
      x : xAxis.getOffset(x),
      y : yAxis.getOffset(y)
    };
  }
  
  it('测试x坐标轴',function(){
    expect(xAxis.get('node')).not.to.be(undefined);

    var transform = xAxis.attr('transform')
  });

  it('测试x坐标点',function(){
    var value = 80;
    expect(xAxis.getOffset(value)).to.be(408);
  });
  it('测试y坐标轴',function(){

  });

  it('测试y坐标轴点',function(){
    var value = 80;
    expect(yAxis.getOffset(value)).to.be(72);
  });

  it('获取0,0点的坐标',function(){
    var x = xAxis.getOffset(0),
      y = yAxis.getOffset(0);
    expect(x + ',' +y).to.be('240,240');
  });
  
  it('获取任意点的坐标',function(){

  });
  var path1,path2;
  it('在坐标轴上画线',function(){
    var start = getPoint(10,10),
      end = getPoint(-10,-10);

    var line = canvas.addShape('line',{
      x1 : start.x,
      y1 : start.y,
      x2 : end.x,
      y2 : end.y
    });
    path1 = line.getPath();
    window.console && console.log(Raphael._path2curve(path1));
    expect(line.get('el')).not.to.be(undefined);
  });

  it('画sinx',function(){
    var XMAX = 100;
    var YMAX = 100;

    // Create path instructions
    var path = [];
    for (var x = 0; x <= 2*XMAX; x++) {
        var angle = (x / XMAX) * Math.PI * 2;  // angle = 0 -> 2π
        var y = Math.sin(angle) * (YMAX / 2) + (YMAX / 2);

        var p = getPoint(x-XMAX,y-YMAX/2);
        // M = move to, L = line to
        path.push((x == 0 ? 'M' : 'L') + p.x + ',' + p.y);
    }

    var line =  canvas.addShape('path',{
      path : path.join(' ')
    });
    path2 = line.getPath();

  });

  xit('remove',function(done){

    setTimeout(function(){
      canvas.destroy();
      $('#s1').remove();
      done();
    },1000);
  });

});

/*
*/