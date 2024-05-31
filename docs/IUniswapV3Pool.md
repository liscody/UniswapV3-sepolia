# Solidity API

## IUniswapV3Pool

### initialize

```solidity
function initialize(uint160 sqrtPriceX96) external
```

### token0

```solidity
function token0() external view returns (address)
```

### token1

```solidity
function token1() external view returns (address)
```

### liquidity

```solidity
function liquidity() external view returns (uint128)
```

### slot0

```solidity
function slot0() external view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)
```

