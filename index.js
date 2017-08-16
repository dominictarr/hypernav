var h = require('mutant/h')
var MutantArray = require('mutant/array')
var computed = require('mutant/computed')

function getLast (ary) {
  if(!ary) return
  return ary[(ary.getLength ? ary.getLength() : ary.length) - 1]
}

module.exports = function (router, header, first) {
  var el, container = h('div.container')
  var history = MutantArray()
  var last = computed([history], function (a) {
    return getLast(a)
  })

  var root = h('div.page')

  history.push({location: null, element: first || container})
  root.push = function (location) {
    var el = router(location)
    if(el) {
      var _pair = last()
      history.push({location: location, element: el})
      var _container = container
      root.replaceChild(container = el, _container)
    }
  }
  root.back = function () {
    if(history.getLength() > 1) {
      var el = history.pop().element
      el.dispatchEvent(new CustomEvent('blur', {target: el}))
      console.log('last', last())
      var el2 = last().element
      el2.dispatchEvent(new CustomEvent('focus', {target: el}))
      var _container = container
      console.log('replace', _container, el2)
      root.replaceChild(container = el2, _container)
    }
  }

  root.history = history
  root.location = last

  root.appendChild(
    header ? header(root) :
    h('div.header', [
      h('h1', [computed(last, function (e) { return e.element.title })]),
      h('label', {
        'ev-click': function () { root.back() }
        },[
        'back'
      ]),
      computed(history, function (history) {
        return history.map(function (e) {
          return e.element.title
        })
      })
    ])
  )

  root.appendChild(
    container = first || h('div', 'this page intentionally left blank')
  )

  return root
}

