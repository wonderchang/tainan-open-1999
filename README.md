# tainan-open-1999

[![Build Status](https://travis-ci.org/wonderchang/tainan-open-1999.svg?branch=master)](https://travis-ci.org/wonderchang/tainan-open-1999)
[![Coverage Status](https://coveralls.io/repos/github/wonderchang/tainan-open-1999/badge.svg?branch=master)](https://coveralls.io/github/wonderchang/tainan-open-1999?branch=master)

A NodeJS wrapper of Tainan Open 1999 case report API

## Installation

Install module via NPM

	$ npm install tainan-open-1999
	
## Get Started

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

## Usage

Each method requires a `callback` function passed, which gets passed two arguments. The first argument returned the error message when failed. If error message is `null`, then the second argument returned the data. 

### Service

*Service*.__getList__(callback)

### Case

*Case*.__get__(caseID, callback)

*Case*.__getList__(startTime, endTimes, [options,] callback)

*Case*.__getListByIDs__(caseIDs, callback)
