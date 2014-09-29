var 
    expect = require('expect.js'),
    sinon = require('sinon'),
    $ = require('jquery');

var Canvas = require('achart-canvas'),
  Axis = require('../src/category'),
  NumberAxis = require('../src/number');

var Util = require('achart-util');

$('<div id="ac2"></div>').prependTo('body');

var canvas = new Canvas({
  id : 'ac2',
  width : 500,
  height : 500
});


describe('测试分类坐标轴生成',function(){

  var plotRange = {
      start : {x : 20,y : 480},
      end : {x : 480, y : 20}
    },
    categories = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    axis = canvas.addGroup(Axis,{
      plotRange : plotRange,
      //ticks : ['一月','六月','十二月'],
      //tickAlignCenter : false,
      categories : categories,
      labels : {
        label : {
          y : 12
        }
      }
    });
  var group = canvas.addGroup();
  for(var i = 0 ; i < categories.length; i++){
    var cate = categories[i];
    var offset = axis.getOffset(cate);

    group.addShape('circle',{
      stroke : 'red',
      cx : offset,
      cy : 400,
      r : 5
    });
  }

  it('测试ticks',function(){
    expect(axis.get('ticks').length).to.be(categories.length + 1);
  });


  it('get by index',function(){
    var index = 5,
      offset = axis.getOffsetByIndex(5);
    expect(isNaN(offset)).not.to.be(true);
    expect(axis.getValue(offset)).to.be(categories[index]);
  });

  it('更改categories',function(){
    var categories = ['一月','二月','三月','四月','五月'];
    axis.change({
      categories : categories
    });

    expect(axis.get('ticks').length).to.be(categories.length + 1);
  });

});


describe('分类不居中',function(){

  var plotRange = {
      start : {x : 20,y : 480},
      end : {x : 480, y : 20}
    },
    categories = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    axis = canvas.addGroup(Axis,{
      y : -150,
      plotRange : plotRange,
      tickAlignCenter : false,
      categories : categories,
      tickOffset : 10,
      labels : {
        label : {
          y : 12
        }
      }
    });

  var group = canvas.addGroup();

  function addCircle(categories){
    group.clear();
    for(var i = 0 ; i < categories.length; i++){
      var cate = categories[i];
      var offset = axis.getOffset(cate);

      group.addShape('circle',{
        stroke : 'blue',
        cx : offset,
        cy : 300,
        r : 5
      });
    }
  }

  addCircle(categories);
  

  it('测试ticks',function(done){
    expect(axis.get('ticks').length).to.be(categories.length);
    setTimeout(function(){
      done();
    },1000);
  });


  it('get by index',function(){
    var index = 5,
      offset = axis.getOffsetByIndex(5);
    expect(isNaN(offset)).not.to.be(true);
    expect(axis.getValue(offset)).to.be(categories[index]);
  });

  it('更改categories',function(){
    var categories = ['一月','二月','三月','四月','五月'];
    axis.change({
      categories : categories
    });

    addCircle(categories);

    expect(axis.get('ticks').length).to.be(categories.length);
  });
});


describe('分类不等于坐标点',function(){

  var plotRange = {
      start : {x : 20,y : 480},
      end : {x : 480, y : 20}
    },
    categories = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    ticks = ['一月','六月','十二月'],
    axis = canvas.addGroup(Axis,{
      y : -250,
      plotRange : plotRange,
      ticks : ticks,
      tickAlignCenter : false,
      categories : categories,
      tickOffset : 10,
      labels : {
        label : {
          y : 12
        }
      }
    });

  var group = canvas.addGroup();

  function addCircle(categories){
    group.clear();
    for(var i = 0 ; i < categories.length; i++){
      var cate = categories[i];
      var offset = axis.getOffset(cate);

      group.addShape('circle',{
        stroke : 'green',
        cx : offset,
        cy : 200,
        r : 5
      });
    }
  }

  addCircle(categories);
  

  it('测试ticks',function(done){
    expect(axis.get('ticks').length).not.to.be(categories.length);
    expect(axis.get('ticks').length).to.be(ticks.length);

    setTimeout(function(){
      done();
    },1000);
  });


  it('get by index',function(){
    var index = 1,
      offset = axis.getOffsetByIndex(index);
    expect(isNaN(offset)).not.to.be(true);
    expect(axis.getValue(offset)).to.be(ticks[index]);
  });

  it('get value',function(){
    var index = 3,
      category = categories[index],
      offset = axis.getOffset(category);

    expect(axis.getValue(offset)).to.be(category);

  });
});
