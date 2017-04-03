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

tainanOpen1999.Case.get('UN201704010282', (err, data) => {
  if(err) {
    return console.error(error)
  }
  console.log(data)
})
```

The output

```js
{
  caseId: 'UN201704010282',
  status: 1,
  district: '安平區',
  serviceName: '違規停車',
  subjectName: '違規停車',
  agency: '臺南市政府警察局勤務指揮中心',
  description: '安平區怡平路與永華八街口 違規停車',
  address: '怡平路與永華八街口',
  latitude: null,
  longitude: null,
  create_at: '2017-04-01 23:30:00',
  update_at: '2017-04-02 01:24:38',
  pictures: null
}
```

## Resource Object Field

#### `Resource:Service`

* `code`: `<String>` of service code
* `name`: `<String>` of service name
* `subjects`: An array of `<Resource:Subject>`

#### `Resource:Subject`

* `code`: `<String>` of subject code
* `name`: `<String>` of subject name

#### `Resource:Case`

* `caseId`: `<String>`, case ID that gov provided
* `status`: `<Number>`, `0` for unprocessed, `1` for processed
* `district`: `<String>`, Tainan City administrative district
* `service`: `<Resource:Service>.service`
* `subject`: `<Resource:Subject>`
* `agency`: `<String>`,
* `description`: `<String>`: case description
* `address`: `<String>`, address 
* `latitude`: `<String>`
* `longitude`: `<String>`
* `create_at`: `<String>`, follow the time format `YYYY-MM-DD hh:mm:ss`
* `update_at`: `<String>`, follow the time format `YYYY-MM-DD hh:mm:ss`
* `pictures`: `<Array>` of `<Resource:Picture>`

#### `Resource:Picture`

* `name`: `<String>`
* `description`: `<String>`
* `base64`: `<String>` of image's base64

## API Reference

All the method to request the resource are asynchronously handled by the given callback function.

```
Class.method(...argus, (err, data) => {
  // access the resource
})
```

The callback function gets passed two arguments. The first argument returned the error message when failed. The second argument returned the data.

### Case

#### `Case.get(caseId, callback)`

* `caseId`: `<String>`, case ID

The returned data argument of the callback:

* `<Resource:Case>`

#### `Case.getList(startTime, endTime, [options,] callback)`

* `startTime`: `<String>`, follow the time format `YYYY-MM-DD hh:mm:ss`
* `endTime`: `<String>`, follow the time format `YYYY-MM-DD hh:mm:ss`

* `options`:
  * `serviceName`: `<String>` or `<Array>` of `<String>`

The returned data argument of the callback:

* `num`: `<Number>` of entires
* `cases`: `<Array>` of `<Resource:Case>`

#### `Case.getListByIds(caseIds, callback)`

The returned data argument of the callback:

* `num`: `<Number>` of entires
* `cases`: `<Array>` of `<Resource:Case>`

### Service

#### `Service.getList(callback)`

The returned data argument of the callback:

* `num`: `<Number>` of entires
* `services`: `<Array>` of `<Resource:Service>`
