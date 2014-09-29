var Auto = require('../src/auto'),
    expect = require('expect.js'),
    Util = require('achart-util'),
    sinon = require('sinon'),
    DateUtil = require('achart-date');

    $ = require('jquery');

  $('<div id="s12"></div>').appendTo('body');

  function log(data,rst,title){
    if(!window.JSON){
      return;
    }

    $('<h3>'+title+'</h3>').appendTo('#s12');
    var el = $('<div class="well"></div>').appendTo('#s12');


    var s1 = '<p>数据 ： ' + JSON.stringify(data) + '</p>';
    $(s1).appendTo(el);
   
    rst.ticks = Util.map(rst.ticks,function(item){
      return DateUtil.format(new Date(item),'yyyy-mm-dd HH:MM:ss') ;
    });

    rst.categories = Util.map(rst.categories,function(item){
      return DateUtil.format(new Date(item),'yyyy-mm-dd HH:MM:ss') ;
    });

    var s2 = '<p>结果：'+JSON.stringify(rst)+'</p>';
    $(s2).appendTo(el);

  }


  describe('测试时间坐标轴',function(){

    it('测试比较少的数据',function(){
      var data = [
          1147651200000,
          1147737600000,
          1147824000000,
          1147910400000,
          1147996800000
          
          ];

      var rst = Auto.TimeCategory.caculate({
        data : data
      });

      expect(rst.ticks.length).to.be(rst.categories.length);
      log(data,rst,'测试比较少的数据');

    });


    it('测试比较多的数据',function(){
      var data = [
        1147651200000, 1147737600000, 1147824000000, 1147910400000, 1147996800000, 1148256000000, 1148342400000, 1148428800000, 1148515200000, 1148601600000, 1148947200000, 1149033600000, 1149120000000, 1149206400000, 1149465600000, 1149552000000, 1149638400000, 1149724800000, 1149811200000, 1150070400000, 1150156800000, 1150243200000, 1150329600000, 1150416000000, 1150675200000, 1150761600000, 1150848000000, 1150934400000, 1151020800000, 1151280000000, 1151366400000, 1151452800000, 1151539200000, 1151625600000, 1151884800000, 1152057600000, 1152144000000, 1152230400000, 1152489600000, 1152576000000, 1152662400000, 1152748800000, 1152835200000, 1153094400000, 1153180800000, 1153267200000, 1153353600000, 1153440000000, 1153699200000, 1153785600000, 1153872000000, 1153958400000, 1154044800000, 1154304000000, 1154390400000, 1154476800000, 1154563200000, 1154649600000, 1154908800000, 1154995200000, 1155081600000, 1155168000000, 1155254400000, 1155513600000, 1155600000000, 1155686400000, 1155772800000, 1155859200000, 1156118400000, 1156204800000, 1156291200000, 1156377600000, 1156464000000, 1156723200000, 1156809600000, 1156896000000, 1156982400000
      ];

      var rst = Auto.TimeCategory.caculate({
        data : data
      });

      expect(rst.ticks.length).not.to.be(rst.categories.length);
      log(data,rst,'测试比较少的数据');

    });



  });
