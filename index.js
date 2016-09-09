/*
Copyright 2016 Kyle E. Mitchell

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

module.exports = stringify

var forObject = function (item, depth) {
  depth = depth || 0
  var key = Object.keys(item)[0]
  var value = item[key]
  var indent = indentation(depth)
  switch (key) {
    case 'use':
      return '<' + value + '>'
    case 'definition':
      return '""' + value + '""'
    case 'blank':
      return '[' + value + ']'
    case 'reference':
      return '{' + value + '}'
    default:
      if (item.hasOwnProperty('form')) {
        var form = item.form
        return (
          indent +
          (
            item.hasOwnProperty('heading')
            ? '\\ ' + item.heading + ' '
            : '\\'
          ) +
          (
            form.hasOwnProperty('conspicuous')
            ? '!!'
            : '\\'
          ) +
          '\n' +
          indentation(depth) +
          formToMarkup(form, depth + 1) +
          '\n' +
          indentation(depth)
        )
      } else {
        throw new Error('Invalid form content')
      }
  }
}

var indentation = function (depth) {
  return new Array((4 * depth) + 1).join(' ')
}

function formToMarkup (form, depth) {
  return form.content.reduce(function (buffer, element, index, array) {
    if (
      (index > 0 && array[index - 1].hasOwnProperty('form')) ||
      (element.hasOwnProperty('form'))
    ) {
      buffer = buffer + '\n\n'
    }
    if (typeof element === 'string') {
      return buffer + element
    } else {
      return buffer + forObject(element, depth)
    }
  }, '')
}

function stringify (form) {
  if (form.conspicuous) {
    throw new Error('Cannot stringify conspicuous root forms')
  }
  return formToMarkup(form, 1)
}
