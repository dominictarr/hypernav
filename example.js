var Nav = require('./')
var h = require('mutant/h')

var nav
document.body.appendChild(nav = Nav(function router (location) {
  //router function returns a new element for a given location.
  return h('h1', ["Hello,", location])
}, function header (nav) {
  return h('label', {'ev-click': nav.back}, ['back'])
},
//the first page
  h('div', [
    h('h1', 'what is your name?'),
    h('input', {'ev-change': function (ev) {
      nav.push(ev.target.value)
    }})
  ])
))


