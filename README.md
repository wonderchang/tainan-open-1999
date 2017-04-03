# tainan-open-1999

[![Build Status](https://travis-ci.org/wonderchang/tainan-open-1999.svg?branch=master)](https://travis-ci.org/wonderchang/tainan-open-1999)
[![Coverage Status](https://coveralls.io/repos/github/wonderchang/tainan-open-1999/badge.svg?branch=master)](https://coveralls.io/github/wonderchang/tainan-open-1999?branch=master)

A NodeJS wrapper around [Tainan Open 1999 API](http://1999.tainan.gov.tw/OpenExplain.aspx).

## Installation

Install module via NPM

	$ npm install tainan-open-1999
	
## Example

A simple example for request service list on Open 1999.

```js
const tainanOpen1999 = require('tainan-open-1999')

tainanOpen1999.Service.getList((err, data) => {
  if(err) {
    return console.error(error)
  }
  console.log(data)
})
```

The `callback` function gets passed two arguments. The first argument returned the error message when failed. While error message is `null`, which mean successful request, the second argument returned the data.

## API reference

### Service

#### `Service.getList(callback)`

### Case

#### `Case.get(caseID, callback)`

#### `Case.getList(startTime, endTime, [options,] callback)`

#### `Case.getListByIDs(caseIDs, callback)`
