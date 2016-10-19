function fact(num){
  if (num < 0) return -1;
  if (num === 0)
    return 1;
  else
    return num * fact(num-1)
}

function poisson(k, lamb){
  return Math.exp(-lamb)*Math.pow(lamb,k)/fact(k)
}

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
  $scope.prob = function(){
    return 1-poisson(0,parseFloat($scope.mean)*parseFloat($scope.years));
  };
  $scope.future = function(){
    var prob = 1-poisson(0,parseFloat($scope.mean)*parseFloat($scope.years));
    if ($scope.estimation < prob)
      return "Break Up";
    else
      return "Stay Together";
  };
});

$(document).ready(function(){
  $("button").click(function(){
    $("#results").show();
  });
  $("input").change(function(){
    $("#graphic").html("");
    var mean = parseFloat($("#mean").val());
    var years = parseFloat($("#years").val());
    var lamb = mean*years;
    var ok = 1-poisson(0,lamb);
    var str = '1-exp(-'+String(years)+'*x)';
    console.log(str);
    console.log(mean*years);
    functionPlot({
      title: 'y = 1-poisson(0, '+mean+' * '+years+')',
      target: '#graphic',
      width: 580,
      height: 400,
      disableZoom: true,
      xAxis: {
        label: 'Amazing Persons Probability',
        domain: [0, mean+1]
      },
      yAxis: {
        label: '1-exp(-'+String(years)+'*x)',
        domain: [0, 1]
      },
      tip: {
        xLine: true,    // dashed line parallel to y = 0
        yLine: true,    // dashed line parallel to x = 0
      },
      data: [{
        fn: '1-exp(-'+String(years)+'*x)',
        nSamples: 1000,
        skipTip: false
      }
      ]
    });
  });
  
})
