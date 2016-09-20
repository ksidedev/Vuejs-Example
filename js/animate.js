new Vue({
  el: '#animating',
  data: function () {
  	var defaultSides = 500
  	var stats = Array.apply(null, { length: defaultSides })
    	.map(function () { return 100 })
	var color = Array.apply(null, { length: defaultSides })
    	.map(function () { return 100 })
  	return {
    	stats: stats,
    	color: color,
    	points: generatePoints(stats),
    	fill: getRandomColor(color),
      sides: defaultSides,
      minRadius: 50,
      interval: null,
      updateInterval: 500
    }
  },
  watch: {
  	sides: function (newSides, oldSides) {
    	var sidesDifference = newSides - oldSides
      if (sidesDifference > 0) {
      	for (var i = 1; i <= sidesDifference; i++) {
        	this.stats.push(this.newRandomValue())
        }
      } else {
        var absoluteSidesDifference = Math.abs(sidesDifference)
      	for (var i = 1; i <= absoluteSidesDifference; i++) {
        	this.stats.shift()
        }
      }
    },
    stats: function (newStats,newcolor) {
			TweenLite.to(
      	this.$data, 
        this.updateInterval / 1000, 
        { points: generatePoints(newStats),fill: getRandomColor(newcolor) }
    	)
    },
    updateInterval: function () {
    	this.resetInterval()
    }
  },
  mounted: function () {
  	this.resetInterval()
  },
  methods: {
    randomizeStats: function () {
    	var vm = this
    	this.stats = this.stats.map(function () {
      	return vm.newRandomValue()
      })
    },
    newRandomValue: function () {
    	return Math.ceil(this.minRadius + Math.random() * (100 - this.minRadius))
    },
    resetInterval: function () {
    	var vm = this
    	clearInterval(this.interval)
      this.randomizeStats()
    	this.interval = setInterval(function () { 
      	vm.randomizeStats()
      }, this.updateInterval)
    }
  }
})

function valueToPoint (value, index, total) {
  var x     = 0
  var y     = -value * 0.9
  var angle = Math.PI * 2 / total * index
  var cos   = Math.cos(angle)
  var sin   = Math.sin(angle)
  var tx    = x * cos - y * sin + 100
  var ty    = x * sin + y * cos + 100
  return { x: tx, y: ty }
}

function generatePoints (stats) {
	var total = stats.length
	return stats.map(function (stat, index) {
    var point = valueToPoint(stat, index, total)
    return point.x + ',' + point.y
  }).join(' ')
}

var safeColors = ['00','33','66','99','cc','ff'];
var rand = function() {
    return Math.floor(Math.random()*6);
};

function getRandomColor(color) {
	var color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
	
   	// var myVar = setInterval(function(){ 
				// 	$('polygon').css("fill",color);
				// }, 1000);
   	// clearInterval(myVar);
    return color;
}