/**
 * @fileOverview 作为圆的半径的坐标轴使用
 * @ignore
 */

  
var Util = require('achart-util'),
  NumberAxis = require('./number');

/**
 * @class Chart.Axis.Radius
 * 圆的半径坐标轴
 *
 *  - <a href="http://spmjs.io/docs/achart-axis/#axis-radius" target="_blank">文档</a>
 *  - <a href="http://spmjs.io/docs/achart-axis/wiki/5-circle.html" target="_blank">wiki</a>
 *  
 * @extends Chart.Axis.Number
 */
var Radius = function(cfg){
  Radius.superclass.constructor.call(this,cfg);
};

Radius.ATTRS = {

  /**
   * 圆形坐标轴
   * @type {Chart.Axis.Circle}
   */
  circle : null,
  
  position : 'left',
  /**
   * 类型
   * @type {String}
   */
  type : 'radius'

};

Util.extend(Radius,NumberAxis);

Util.augment(Radius,{

  beforeRenderUI : function(){
    Radius.superclass.beforeRenderUI.call(this);
    var _self = this,
      circle = _self.get('circle');
    if(circle){
      _self.set('start',circle.getCenter());
      _self.set('end',circle.getCirclePoint(0));
    }
  },
  /**
   * 获取栅格项的配置信息，一般是起始点信息
   * @protected
   */
  getGridItemCfg : function(offsetPoint){
    var _self = this,
        item = {},
        points = [],
        circle = _self.get('circle'),
        center = circle.getCenter(),
        count = circle.getTicksCount(),
        r = Math.abs(offsetPoint.y - center.y);

    for(var i = 0; i < count; i++){
      var angle = circle.getOffsetByIndex(i),
        point = circle.getCirclePoint(angle,r);
      points.push(point);
    }
    
    item.points = points;
    item.r = r;
    item.center = center;
    return item;
  },
  /**
   * 根据角度获取坐标点
   * @param  {Number} angle 角度
   * @param  {Number} value 值
   * @return {Object} 坐标点 x,y
   */
  getPointByAngle : function(angle,value){
    var _self = this,
      circle = _self.get('circle'),
      center = circle.getCenter(),
      offset = _self.getOffset(value);

    return circle.getCirclePoint(angle,Math.abs(offset - center.y))
  },
  _resetRange : function(){

  },
  isRangeChange : function(){
    return false;
  },
  getValueByPoint : function(x,y){
    var _self = this,
      circle = _self.get('circle'),
      center = circle.getCenter(),
      distance = circle.getDistance(x,y);
    return _self.getValue(center.y - distance);
  }
});

module.exports = Radius;
