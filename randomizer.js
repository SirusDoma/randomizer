var inext, inextp;
var SeedArray = new Array();

function Randomizer(seed) {
	if (typeof seed === 'undefined') {
		var now = new Date();
		seed = now.getTime();
	}
	
	this.SeedArray = new Array(56);
	
	var abs = seed;
	if (abs < 0)
		abs = -abs;
		
	var num2 = 161803398 - abs;
	this.SeedArray[55] = num2;
	var num3 = 1;
	
	for (var i = 1; i < 55; i++) {
		var index = (21 * i) % 55;
        this.SeedArray[index] = num3;
        num3 = num2 - num3;
        if (num3 < 0) {
			num3 += 2147483647;
		}
		
		num2 = this.SeedArray[index];
	}
	
	for (var j = 1; j < 5; j++) {
		for (var k = 1; k < 56; k++) {
			this.SeedArray[k] -= this.SeedArray[1 + ((k + 30) % 55)];
			if (this.SeedArray[k] < 0) {
				this.SeedArray[k] += 2147483647;
			}
		}
	}
	
	this.inext = 0;
    this.inextp = 0x15;
    seed = 1;
};

function GetSampleForLargeRange() {
	var num = InternalSample.call(this);
	
	if ((InternalSample.call(this) % 2) == 0) {
		num = -num;
	}
	
	var num2 = num;
	num2 += 2147483646.0;
	
	return (num2 / 4294967293);	
};

function InternalSample() {
	var inext = this.inext;
    var inextp = this.inextp;
    if (++inext >= 56) {
    	inext = 1;
	}
    
	if (++inextp >= 56) {
    	inextp = 1;
	}
	
	var num = this.SeedArray[inext] - this.SeedArray[inextp];
	
	if (num < 0) {
		num += 2147483647;
    }
	
	this.SeedArray[inext] = num;
	this.inext = inext;
	this.inextp = inextp;

	return num;
};

function Sample() {
	return (InternalSample.call(this) * 4.6566128752457969E-10);
}

Randomizer.prototype.Next = function(minValue, maxValue) {
	// Without Min or Max Value
	if (typeof minValue === 'undefined' &&
		typeof maxValue === 'undefined') {
		return InternalSample.call(this) | 0;
	}
	// Without Min Value
	// But Max Value is provided
	else if (typeof minValue !== 'undefined' &&
			 typeof maxValue === 'undefined') {
		if (minValue < 0) {
			minValue = -maxValue;
		}

		return (Sample.call(this) * minValue) | 0;	 
	}
	// Min and Max Value are provided
	else {
		if (minValue > maxValue) {
			return -1;
		}
	
		var num = maxValue - minValue;
	    if (num <= 2147483647) {
			return (((Sample.call(this) * num)) + minValue) | 0;
	    }
		
		return ((((GetSampleForLargeRange.call(this) * num))) + minValue) | 0;
	}
};

Randomizer.prototype.NextBytes = function(buffer) {
	if (typeof buffer === 'undefined') {
		return null;
	}
	
	for (var i = 0; i < buffer.length; i++) {
		buffer[i] = (InternalSample.call(this) % 256);
	}
	
	return buffer;
};

Randomizer.prototype.NextDouble = function() {
	return Sample.call(this);	
};

module.exports = Randomizer;