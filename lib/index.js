(function() {
	d3.sequenceChart = function(options) {
		this.blocks = options.data || [];

		this.rowPadding = options.rowPadding || 10; // default row padding px
		this.cellPadding = options.cellPadding || 0; // default block cellpadding
		this.blockHeight = options.blockHeight || 20; // default block height px
		this.blockColor = options.blockColor || '#080'; // block color default blue

		// TODO width and height must be a number

		this.draw = function() {

			var svg = d3.select("svg");
			var width = svg.attr("width");
			var height = svg.attr("height");
			var path = d3.path();

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
				path.rect(block.left, block.top, block.width, block.height)
			})

			svg.append('path').attr('d', path).attr('fill', this.blockColor)
		}
	}
})()