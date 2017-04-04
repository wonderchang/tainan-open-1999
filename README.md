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

tainanOpen1999.getCase('UN201704030185', (err, data) => {
  if (err) {
    return console.error(error)
  }
  console.log(data)
})
```

The output,

```js
{
  caseId: 'UN201704030185',
  status: '已完工',
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

* `caseId`: A string the case ID
* `status`: A number of the case status code, `0` for unprocessed, `1` for processed
* `district`: A string of Tainan City administrative district
* `serviceName`: A string of the service name
* `subjectName`: A string of the subject name
* `agency`: A string of the agency
* `description`: A string of the case description
* `address`: A string of the address
* `latitude`: A string of the latitude
* `longitude`: A string of the longitude
* `createAt`: A string of time (`YYYY-MM-DD hh:mm:ss`)
* `updateAt`: A string of time (`YYYY-MM-DD hh:mm:ss`)
* `pictures`: An array of `<Object:Picture>`

#### `Object:Picture`

* `fileName`: A string of the image file name
* `description`: A string of the image description
* `base64`: A string of the image base64 encode

#### `Object:Service`

* `code`: A string of the service code
* `name`: A string of the service name
* `subjects`: An array of `<Object:Subject>`

#### `Object:Subject`

* `code`: A string of the subject code
* `name`: A string of the subject name

## API Reference

All the methods of resource request are asynchronously handled by the given callback function.

```
method(...argus, (err, data) => {
  // access the resource
})
```

The callback function gets passed two arguments. The first argument returned the error message when failed. The second argument returned the data when succeeded.

### `addCase(options, callback)`

Those options below are reuqired:

* `serviceName`: A string of the service name
* `subjectName`: A string of the subject name
* `district`: A string of the district
* `address`: A string of the address
* `description`: A string of the description
* `reporterName`: A string of the reporter name
* `reporterPhoneNumber`: A string of the reporter number

Others are optional:

* `reporterEmail`: A string of reporter email
* `latitude`: A string of latitude
* `longitude`: A string of longtitude
* `pictures`: An array of `<Object:Picture>`

The return data argument of the callback:

* `caseId`: A string of the case ID

### `getCase(caseId, callback)`

* `caseId`: A string of case ID

The returned data argument of the callback:

* `<Object:Case>`

### `getCases(options, callback)`

Those options below are reuqired:

* `startFrom`: A string of time (`YYYY-MM-DD hh:mm:ss`)
* `endTo`: A string of time (`YYYY-MM-DD hh:mm:ss`)

Others are optional:

* `serviceName`: A string or an array of service name

The returned data argument of the callback:

* `num`: A number of entry count
* `cases`: An array of `<Object:Case>`

### `getCasesByIds(caseIds, callback)`

* `caseIds`: An array of case ID string

The returned data argument of the callback:

* `num`: A number of entry count
* `cases`: An array of `<Object:Case>`

### `getServices(callback)`

The returned data argument of the callback:

* `num`: A number of entry count
* `services`: An array of `<Object:Service>`
