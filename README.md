# sequence-chart
highcharts plugin for sequence

## How to use
+ include d3.js and sequenceChart.js
```javascript
<script type="text/javascript" src='../node_modules/d3/build/d3.js'></script>
<script type="text/javascript" src='../dist/sequenceChart.js'></script>
```

+ write javascript
```javascript
var c = new d3.sequenceChart({
  data: [{
    start: 0,
    end: 0.01
  },{
    start: 0.01,
    end: 0.1
  },{
    start: 0.1,
    end: 0.12
  },{
    start: 0.12,
    end: 0.5
  },{
    start: 0.5,
    end: 0.66
  },{
    start:0.66,
    end:0.9
  },{
    start:0.9,
    end: 1.0
  }],
  container: d3.select('svg')
})
c.draw()
```

## options
+ data

type: Array

description: array item must be an Object , with start and end property, you should provide a sequence data like percent but not have '%'

+ rowPadding

type: Number

+ blockHeight

type: Number

+ blockColor

type: HEX

+ blockStartColor

type: HEX

+ blockHoverColor

type: HEX

+ line

type: Boolean

+ lineColor

type: HEX

+ lineColor

type: lineStartColor

+ container

type: d3 Selector

+ easeTime

type: Number

+ zoom

type: Boolean
value: true or false

+ ease

type: d3 ease type
defaultValue: d3.easeExpOut

## Demo Snapshot
![Snapshot](/img/snapshot.gif "截图")
