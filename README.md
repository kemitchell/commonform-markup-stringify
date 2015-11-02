```javascript
var assert = require('assert')
var stringify = require('commonform-markup-stringify')

assert.equal(
  stringify({ content: [ 'This is a test.' ] }),
  'This is a test.')

assert.equal(
  stringify({
    content: [
      'This agreement (this ',
      { definition: 'Agreement' },
      ') is between ',
      { blank: '' },
      ' and the ',
      { use: 'Company' },
      '. See ',
      { reference: 'Something' },
      '.' ] }),
  'This agreement (this ""Agreement"") is between [] and the' +
  ' <Company>. See {Something}.')

var form = {
  content: [
    { heading: 'Definition',
      form: {
        content: [
          { definition: 'Change of Control' },
          ' means',
          { form: {
              content: [
                'a transaction or series of related transactions in' +
                ' which any "person" or "group" (within the meaning' +
                ' of Section 13(d) and 14(d) of the Securities' +
                ' Exchange Act of 1934, as amended), becomes the' +
                ' "beneficial owner" (as defined in Rule 13d-3' +
                ' under the Securities Exchange Act of 1934, as' +
                ' amended), directly or indirectly, of more than ',
                { blank: '' },
                ' of the outstanding voting securities of the ',
                { use: 'Company' },
                ' having the right to vote for the election of' +
                ' members of the ',
                { use:'Company' },
                '\'s board of directors,' ] } },
          { form: {
              content: [
                'any reorganization, merger or consolidation of the ',
                { use: 'Company' },
                ', other than a transaction or series of related' +
                ' transactions in which the holders of the voting' +
                ' securities of the ',
                { use: 'Company' },
                ' outstanding immediately prior to such transaction' +
                ' or series of related transactions retain,' +
                ' immediately after such transaction or series of' +
                ' related transactions, at least a majority of the' +
                ' total voting power represented by the outstanding' +
                ' voting securities of the ',
                { use: 'Company' },
                ' or such other surviving or resulting entity or' ] } },
          { form: {
              content: [
                'a sale, lease or other disposition of all or' +
                ' substantially all of the assets of the ',
                { use: 'Company' },
                '.' ] } } ] } } ] }

var parse = require('commonform-markup-parse')

assert.deepEqual(
  parse(stringify(form)).form,
  form)
```
