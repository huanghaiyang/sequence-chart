(function() {
	d3.sequenceChart = function(options) {
		this.blocks = options.data || [];

		this.rowPadding = options.rowPadding || 10; // default row padding px
		this.cellPadding = options.cellPadding || 0; // default block cellpadding
		this.blockHeight = options.blockHeight || 10; // default block height px
		this.blockColor = options.blockColor || '#080'; // block color default blue
		this.blockStartColor = options.blockStartColor || '#FFF';
		this.blockHoverColor = options.blockHoverColor || '#F2753F';
		this.line = options.line || true; // either draw line or not 
		this.lineColor = options.lineColor || '#F29F3F';
		this.lineStartColor = options.lineStartColor || '#FFF'
		this.container = options.container;

		// TODO width and height must be a number

		this.draw = function() {

			var svg = this.container
			var width = svg.attr("width");
			var height = svg.attr("height");

			var blockTransition = d3.transition()
				.duration(750)
				.ease(d3.easeLinear);
			var lineTransition = blockTransition;

			if (this.blocks.length > 0) {
				var newBlocks = [];
				this.blocks.forEach((block, index) => {
					var newBlock;
					if (index === 0) {
						newBlock = {
							top: 0,
							left: 0
						}
					} else {
						var preBlock = newBlocks[index - 1]
						newBlock = {
							top: preBlock.top + preBlock.height + this.rowPadding,
							left: preBlock.left + preBlock.width + this.cellPadding
						}
					}
					newBlock.width = (block.end - block.start) * width
					newBlock.height = 　this.blockHeight
					newBlocks.push(newBlock)
				})

			}
			newBlocks.forEach((block) => {
				var path = d3.path();
				path.rect(block.left, block.top, block.width, block.height)
				path.closePath()
				svg.append('path').attr('d', path).attr('fill', this.blockStartColor).attr('class', 'seq-block');
			});
			// transition
			d3.selectAll(".seq-block").transition(blockTransition).style("fill", this.blockColor);
			d3.selectAll(".seq-block").on('mouseover', () => {
				d3.select(d3.event.target).style('fill', this.blockHoverColor)
			}, false);
			d3.selectAll(".seq-block").on('mouseout', () => {
				d3.select(d3.event.target).style('fill', this.blockColor)
			}, false);
			// draw line
			if (this.line) {
				newBlocks.forEach((block, index) => {
					if (index < newBlocks.length - 1) {
						var linePath = d3.path()
						linePath.moveTo(block.left + block.width, block.top + block.height)
						var nextBlock = newBlocks[index + 1]
						linePath.lineTo(nextBlock.left, nextBlock.top)
						linePath.closePath()
						svg.append('path').attr('d', linePath).attr('stroke', this.lineStartColor).attr('stroke-width', 1).attr('class', 'seq-line');
					}
				})
				d3.selectAll(".seq-line").transition(lineTransition).style("stroke", this.lineColor);
			}
		}
	}
})()