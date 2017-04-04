# tainan-open-1999

[![Build Status](https://travis-ci.org/wonderchang/tainan-open-1999.svg?branch=master)](https://travis-ci.org/wonderchang/tainan-open-1999)
[![Coverage Status](https://coveralls.io/repos/github/wonderchang/tainan-open-1999/badge.svg?branch=master)](https://coveralls.io/github/wonderchang/tainan-open-1999?branch=master)

A NodeJS wrapper around [Tainan Open 1999 API](http://1999.tainan.gov.tw/OpenExplain.aspx).

## Installation

Install module via NPM

    $ npm install tainan-open-1999

Or, using yarn

    $ yarn
	
## Example

A simple example for request a case of car illegal parking report on [Tainan Open 1999](http://1999.tainan.gov.tw/OpenCaseShow.aspx?&FSerialNumber=UN201704030185).

```js
const tainanOpen1999 = require('tainan-open-1999')

tainanOpen1999.Case.get('UN201704030185', (err, data) => {
  if(err) {
    return console.error(error)
  }
  console.log(data)
})
```

The output,

```js
{
  caseId: 'UN201704030185',
  status: 1,
  district: '東區',
  serviceName: '違規停車',
  subjectName: '違規停車',
  agency: '臺南市政府警察局勤務指揮中心',
  description: '東區崇德路，介於林森路一段與監理站間 違停',
  address: '東區崇德路',
  latitude: null,
  longitude: null,
  createAt: '2017-04-03 19:27:00',
  updateAt: '2017-04-04 02:08:22',
  pictures: []
}
```

## Resource Object

The responsed resources are preprocessed by wrapping a proper object structure for usage. Those objects below will be mentioned in the entire document..

#### `Object:Case`

* `caseId`: A string case ID
* `status`: A number of status code, `0` for unprocessed, `1` for processed
* `district`: A string of Tainan City administrative district
* `serviceName`: A string of service name
* `subjectName`: A string of subject name
* `agency`: A string of agency
* `description`: A string of description
* `address`: A string of address
* `latitude`: A string of latitude
* `longitude`: A string of longitude
* `createAt`: A string of time (`YYYY-MM-DD hh:mm:ss`)
* `updateAt`: A string of time (`YYYY-MM-DD hh:mm:ss`)
* `pictures`: An array of `<Resource:Picture>`

#### `Object:Picture`

* `fileName`: A string of image file name
* `description`: A string of image description
* `base64`: A string of image base64 encode

#### `Object:Service`

* `code`: A string of service code
* `name`: A string of service name
* `subjects`: An array of `<Resource:Subject>`

#### `Object:Subject`

* `code`: A string of subject code
* `name`: A string of subject name

## API Reference

All the methods of resource request are asynchronously handled by the given callback function.

```
method(...argus, (err, data) => {
  // access the resource
})
```

The callback function gets passed two arguments. The first argument returned the error message when failed. The second argument returned the data when succeeded.

### `getCase(caseId, callback)`

* `caseId`: A string of case ID

The returned data argument of the callback:

* `<Object:Case>`

### `getCases(startFrom, endTo, [options,] callback)`

* `startFrom`: A string of time (`YYYY-MM-DD hh:mm:ss`)
* `endTo`: A string of time (`YYYY-MM-DD hh:mm:ss`)
* `options`:
  * `serviceName`: A string or an array of service name

The returned data argument of the callback:

* `num`: A number of entry count
* `cases`: An array of `<Object:Case>`

### `getCasesByids(caseIds, callback)`

* `caseIds`: An array of case ID string

The returned data argument of the callback:

* `num`: A number of entry count
* `cases`: An array of `<Object:Case>`

### `getServices(callback)`

The returned data argument of the callback:

* `num`: A number of entry count
* `services`: An array of `<Object:Service>`
