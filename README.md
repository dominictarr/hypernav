# hypernav

simple navigation widget

This creates a forward/backward navigation in a hyperscript/mutant
app.

## example

hello world: ask user their name, then say hello.
back button returns to the "ask" screen.

``` js
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
```


## api

## Nav(router, createHeader, initial) => navDiv

create a `nav` object, which is a div with added `push` and `back` functions,
and `history` and `last` observables.

## navDiv.push(location)

go to the new location, this will call the router function,
and display on the screen whatever it retuns.

## navDiv.back()

pop the current item and go to the previous screen.

## navDiv.history

an observable of the history stack.
each item is `{location: <location>, element: <page>}`

## navDiv.last

a observable of the very last item.

## events

### focus

when a page is shown on the screen, `'focus'` event will
be emitted on that element.

### blur

when another page is shown, the previously visible page
will have `'blur'` emitted on that element, just before the
other element is shown.



## License

MIT

