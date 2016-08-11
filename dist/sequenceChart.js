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
		this.container = options.container;
		this.easeTime = options.easeTime || 500;

		// TODO width and height must be a number

		this.draw = function () {
			var _this = this;

			var svg = this.container;
			var width = svg.attr("width");
			var height = svg.attr("height");

			var blockTransition = d3.transition().duration(this.easeTime).ease(d3.easeLinear);
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
				svg.append('rect').attr('x', block.left).attr('y', block.top).attr('height', block.height).attr('fill', _this.blockStartColor).transition(blockTransition).attr('width', block.width).attr('class', 'seq-block').style("fill", _this.blockColor);
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
							svg.append('path').attr('d', linePath).attr('stroke', _this.lineStartColor).attr('stroke-width', 0.5).attr('class', 'seq-line');
						}
					});
					svg.selectAll(".seq-line").transition(lineTransition).style("stroke", _this.lineColor);
				}

				svg.selectAll(".seq-block").on('mouseover', function () {
					d3.select(d3.event.target).style('fill', _this.blockHoverColor);
				}, false);
				svg.selectAll(".seq-block").on('mouseout', function () {
					d3.select(d3.event.target).style('fill', _this.blockColor);
				}, false);
			}, this.easeTime);
		};
	};
})();
