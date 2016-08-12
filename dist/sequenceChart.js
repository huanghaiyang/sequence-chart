'use strict';

(function () {
	d3.sequenceChart = function (options) {
		this.blocks = options.data || [];

		this.rowPadding = options.rowPadding || 10; // default row padding px
		this.cellPadding = options.cellPadding || 0; // default block cellpadding
		this.blockHeight = options.blockHeight || 10; // default block height px
		this.blockColor = options.blockColor || '#F29F3F'; // block color default blue
		this.blockStartColor = options.blockStartColor || '#FFF';
		this.blockHoverColor = options.blockHoverColor || '#F2753F';
		this.line = options.line || true; // either draw line or not
		this.lineColor = options.lineColor || '#F29F3F';
		this.lineStartColor = options.lineStartColor || '#FFF';
		this.svg = options.container;
		this.easeTime = options.easeTime || 500;
		this.zoom = options.zoom || true;
		this.ease = options.ease || d3.easeBackInOut;

		this.zoom = function () {
			this.svg.selectAll('rect,path').attr("transform", "translate(" + d3.event.transform.x + "," + d3.event.transform.y + ") scale(" + d3.event.transform.k + ")");
		};

		this.zoomListener = d3.zoom().scaleExtent([0.1, 3]).on("zoom", this.zoom.bind(this));

		if (this.zoom) {
			this.svg.call(this.zoomListener);
		}

		this.draw = function () {
			var _this = this;

			var width = this.svg.attr("width");
			var height = this.svg.attr("height");

			var blockTransition = d3.transition().duration(this.easeTime).ease(this.ease);

			var lineTransition = blockTransition;

			if (this.blocks.length > 0) {
				var newBlocks = [];
				this.blocks.forEach(function (block, index) {
					var newBlock;
					if (index === 0) {
						newBlock = {
							top: 0,
							left: 0
						};
					} else {
						var preBlock = newBlocks[index - 1];
						newBlock = {
							top: preBlock.top + preBlock.height + _this.rowPadding,
							left: preBlock.left + preBlock.width + _this.cellPadding
						};
					}
					newBlock.width = (block.end - block.start) * width;
					newBlock.height = _this.blockHeight;
					newBlocks.push(newBlock);
				});
			}
			newBlocks.forEach(function (block) {
				_this.svg.append('rect').attr('x', block.left).attr('y', block.top).attr('height', block.height).attr('fill', _this.blockStartColor).transition(blockTransition).attr('width', block.width).attr('class', 'seq-block').style("fill", _this.blockColor);
			});

			setTimeout(function () {
				if (_this.line) {
					newBlocks.forEach(function (block, index) {
						if (index < newBlocks.length - 1) {
							var linePath = d3.path();
							linePath.moveTo(block.left + block.width, block.top + block.height);
							var nextBlock = newBlocks[index + 1];
							linePath.lineTo(nextBlock.left, nextBlock.top);
							linePath.closePath();
							_this.svg.append('path').attr('d', linePath).attr('stroke', _this.lineStartColor).attr('stroke-width', 0.5).attr('class', 'seq-line');
						}
					});
					_this.svg.selectAll(".seq-line").transition(lineTransition).style("stroke", _this.lineColor);
				}

				_this.svg.selectAll(".seq-block").on('mouseover', function () {
					d3.select(d3.event.target).style('fill', _this.blockHoverColor);
				}, false);
				_this.svg.selectAll(".seq-block").on('mouseout', function () {
					d3.select(d3.event.target).style('fill', _this.blockColor);
				}, false);
			}, this.easeTime);
		};
	};
})();
