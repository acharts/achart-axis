# 自动计算坐标轴

----

自动计算数字坐标轴和时间坐标轴信息

----


## 数字坐标计算

````html
<div id="log1">
  
</div>

````

````javascript

seajs.use(['index','jquery'], function(Axis,$) {
  
  var data = [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
      rst = Axis.Auto.caculate({data : data});
  
  $('#log1').text(JSON.stringify(rst));
});
````

### 限定数目


````html
<div id="log2">
  
</div>

````

````javascript

seajs.use(['index','jquery'], function(Axis,$) {
  
  var data = [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
      rst = Axis.Auto.caculate({
        data : data,
        minCount : 2,
        maxCount : 3
      });
  
  $('#log2').text(JSON.stringify(rst));
});
````

## 时间坐标计算

### 最大最小时间

````html
<div id="log3">
  
</div>

````

````javascript

window.parseInfo = function(info){
  info.max = new Date(info.max);
  info.min = new Date(info.min);

  info.ticks = info.ticks.map(function(value){
    return new Date(value);
  });
  return info;
}
seajs.use(['index','jquery'], function(Axis,$) {
  
  var info = {
      min : new Date(2010,1,1).getTime(),
      max : new Date(2019,12,31).getTime(),
      data : []
  };

  var rst = Axis.Auto.Time.caculate(info);
  
  $('#log3').text(JSON.stringify(parseInfo(rst)));
});
````

### 时间数据

````html
<div id="log4">
  
</div>

````

````javascript

seajs.use(['index','jquery'], function(Axis,$) {
  
  var data = [Date.UTC(2010,1,1),Date.UTC(2019,12,31)];
  var rst = Axis.Auto.Time.caculate({data : data});
  
  $('#log4').text(JSON.stringify(parseInfo(rst)));
});
````


