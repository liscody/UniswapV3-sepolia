# Solidity API

## UniswapPoolSepolia

### tokenId

```solidity
uint256 tokenId
```

### fee

```solidity
uint24 fee
```

### Createdpools

```solidity
address[] Createdpools
```

### pool

```solidity
address pool
```

### initialPrice

```solidity
uint160 initialPrice
```

### factory

```solidity
contract IUniswapV3Factory factory
```

### positionManager

```solidity
contract INonfungiblePositionManager positionManager
```

### CreatePool

```solidity
function CreatePool(address token1, address token2) public returns (address)
```

### setFee

```solidity
function setFee(uint24 _fee) public
```

### getPools

```solidity
function getPools() public view returns (address[])
```

Gets pool address

### getLiquidity

```solidity
function getLiquidity(address pool_address) public view returns (uint128)
```

Gets pool liquidity

### getPrice

```solidity
function getPrice(address pool_address) external view returns (uint256 price)
```

Gets pool price as token 0 / token 1 i.e defines how many token0 you get per token 1

### getToken0

```solidity
function getToken0(address pool_address) external view returns (address)
```

Returns Token 0 Address

### getToken1

```solidity
function getToken1(address pool_address) external view returns (address)
```

Returns Token 1 Address

### sqrt

```solidity
function sqrt(uint160 x) internal pure returns (uint160 y)
```

Gets sq root of a number

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| x | uint160 | no to get the sq root of |

### initializePool

```solidity
function initializePool(address pooladdress, uint256 amount_token0, uint256 amount_token1) external
```

### increase_liquidity

```solidity
function increase_liquidity(address pooladdress, uint256 amount_token0, uint256 amount_token1) external payable
```

