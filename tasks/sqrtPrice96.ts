
const bn = require('bignumber.js');
const { BigNumber } = require('ethers')

bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 });

var sqrtPriceX96 = '1533986336806160992173892185949834';

function encodePriceSqrt(reserve1:any, reserve0:any) {
    return BigNumber.from(
        new bn(reserve1.toString()).div(reserve0.toString()).sqrt()
            .multipliedBy(new bn(2).pow(96))
            .integerValue(3)
            .toString()
    ).toString()
}
console.log(sqrtPriceX96);
console.log(encodePriceSqrt(1, 2668.02));