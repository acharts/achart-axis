var 
    expect = require('expect.js'),
    sinon = require('sinon'),
    $ = require('jquery');

var Canvas = require('achart-canvas'),
  Axis = require('../src/number');

var Util = require('achart-util');

$('<div id="o1"></div>').prependTo('body');

var canvas = new Canvas({
  id : 'o1',
  width : 500,
  height : 500
});
/**/

describe('offset axis',function(){

  var axis = canvas.addGroup(Axis,{
    plotRange : {
      start : {x : 20,y : 480},
      end : {x : 480, y : 20}
    },
    min : 0,
    max : 100,
    tickOffset : [20,50],
    tickInterval : 10,
    labels : {
      label : {
        y : 12
      }
    }
  });

  var node = axis.get('node');

  it('测试坐标系生成',function(){
    var ticks = axis.get('ticks');
    expect(ticks.length).to.be(11);
  });
  
  it('测试起点offset',function(){
    var offset = axis.getOffsetByIndex(0);
    expect(offset).to.be(20 + 20);
  });

  it('测试终点offset',function(){
    var offset = axis.getOffsetByIndex(10);

    expect(offset).to.be(480-50);
  });

  it('测试起始offset外的值',function(){
    var value = -10,
      offset = axis.getOffset(value),
      offset1 = axis.getOffsetByIndex(0);
    expect(isNaN(offset)).not.to.be(true);
    expect(offset < offset1).to.be(true);

  });

  it('测试起始offset外 ,value',function(){
    var value = -4,
      offset = axis.getOffset(value);

    
    expect(axis.getValue(offset)).to.be(value);
  });

  it('测试结束offset外的值',function(){
     var value = 110,
      offset = axis.getOffset(value);

    canvas.addShape('path',{
      path : 'M' + offset + ' 460 L' + offset + ' 0',
      stroke : 'red'
    });
    expect(isNaN(offset)).not.to.be(true);
  });

  it('测试起始offset外 ,value',function(){
    var value = 110,
      offset = axis.getOffset(value),
      value1 = axis.getValue(offset);

    expect(value1).to.be(value);
  });
});

describe('offset axis,no tickinterval',function(){

  var axis = canvas.addGroup(Axis,{
    plotRange : {
      start : {x : 20,y : 480},
      end : {x : 480, y : 20}
    },
    ticks : [0,10,20,30,40,50,60,70,80,90,100],
    tickOffset : [20,50],
    labels : {
      label : {
        y : 12
      }
    },
    position : 'top'
  });

  var node = axis.get('node');

  it('测试坐标系生成',function(){
    var ticks = axis.get('ticks');
    expect(ticks.length).to.be(11);
  });
  
  it('测试起点offset',function(){
    var offset = axis.getOffsetByIndex(0);
    expect(offset).to.be(20 + 20);
  });

  it('测试终点offset',function(){
    var offset = axis.getOffsetByIndex(10);

    expect(offset).to.be(480-50);
  });

  it('测试起始offset外的值',function(){
    var value = -10,
      offset = axis.getOffset(value),
      offset1 = axis.getOffsetByIndex(0);
    expect(isNaN(offset)).not.to.be(true);
    expect(offset < offset1).to.be(true);

  });

  it('测试起始offset外 ,value',function(){
    var value = -4,
      offset = axis.getOffset(value);

    
    expect(axis.getValue(offset)).to.be(value);
  });

  it('测试结束offset外的值',function(){
     var value = 110,
      offset = axis.getOffset(value);

    expect(isNaN(offset)).not.to.be(true);
  });

  it('测试起始offset外 ,value',function(){
    var value = 110,
      offset = axis.getOffset(value),
      value1 = axis.getValue(offset);

    expect(value1).to.be(value);
  });
});


describe('auto offset',function(){

  var axis = canvas.addGroup(Axis,{
    plotRange : {
      start : {x : 20,y : 480},
      end : {x : 480, y : 20}
    },
    min : 5,
    ticks : [0,10,20,30,40,50,60,70,80,90,100],
    max : 95,
    dy : -100,
    autoOffset : true,
    tickInterval : 10,
    labels : {
      label : {
        y : 12
      }
    }
  });

  var node = axis.get('node');

  it('测试坐标系生成',function(){
    var ticks = axis.get('ticks');
    expect(ticks.length).to.be(9);
  });
  
  it('测试起点offset',function(){
    var tickOffset = axis.get('tickOffset');
    expect(tickOffset.length).to.be(2);
  });

  it('测试终点offset',function(){
    var avg = axis._getAvgLength(9);
    var tickOffset = axis.get('tickOffset');
    expect(tickOffset[0]).to.be(1/2 * avg);
  });

  it('change info',function(){
    axis.change({
      max : 92,
      min : 8,
      ticks : [0,10,20,30,40,50,60,70,80,90,100]
    });

    var avg = axis._getAvgLength(9);
    var tickOffset = axis.get('tickOffset');

    expect(parseInt(tickOffset[0])).to.be(parseInt(1/5 * avg));
  });
});