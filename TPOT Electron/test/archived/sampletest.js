var expect = require('chai').expect;

function sum(x, y)
{
    return x + y;
}

describe('SUM()', () =>
{
    it('should add two numbers', () =>
    {
        // 1. ARRANGE
        var x = 5;
        var y = 1;
        var sum1 = x + y;

        // 2. ACT
        var sum2 = sum(x, y);

        // 3. ASSERT
        expect(sum2).to.be.equal(sum1);
    });
});