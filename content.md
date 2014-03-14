
<!-- .slide: style="text-align:left" -->
# Basics of JQuery...

Twitter: [#quintons](https://twitter.com/quintons)
<br />
Github: [https://github.com/quintons](https://github.com/quintons)
<br />
Stackoverflow: [http://stackoverflow.com/users/684855/quinton](http://stackoverflow.com/users/684855/quinton)
<br /><br /><br />
 'The most misunderstood language has become the worlds most popular programming language'<br />
*Douglas Crockford - Javascript architect, yahoo*
<br /><br /><br/><br /><br /><br /><br />
Q: How do you comfort a JavaScript bug?<br />
A: You console it!
Note:
This will be my notes
- - -

# Agenda

- [In the beginning...](/#/2 "")
- [$ Demistified](/#/6 "")
- [Working with Selectors](/#/7 "")
- [Create/Add elements in the DOM](/#/9 "")
- [Clone elements in the DOM](/#/11 "")
- [Delete elements in the DOM](/#/13 "")
- [Chaining](/#/16 "")
- [Basics of Traversing](/#/17 "")
- [Manipulation - Elements & Attributes](/#/18 "")
- [Styling elements](/#/20 "")
- [Basics of Event handling](/#/21 "")
- [Basics of Animation](/#/23 "")

Note:
This will be my notes
- - -

<!-- .slide: class="fragment fade-in" -->
## In the beginning
<br />
![alt text](/images/prototype-logo.png "")

#'$'
<br />
```js
$("id_of_element").setStyle({color: "#ffffff"});
```

Note:
This will be my notes
- - -

## In the beginning
<br />
![alt text](/images/john-resig.jpeg "")</br />
![alt text](/images/jquery-logo.png "")

Note:
This will be my notes
- - -

## In the beginning...code before...
<br />
example of a function fetching an elements font size
```js
    function getStyle(oElm, sCssRule){
        var val;
        if(document.defaultView && document.defaultView.getComputedStyle){
            var style = document.defaultView.getComputedStyle(oElm, "");
            if(style){
                val = style.getPropertyValue(sCssRule);
            }else{
                console.log('unable to find element');
            }
        }else if(oElm.currentStyle){
            sCssRule = sCssRule.replace(/\-(\w)/g, function(sMatch, p1){
                return p1.toUpperCase();
            });
            val = oElm.currentStyle[sCssRule];
        }
        if(val === undefined){
            console.log('unable to find style "' + sCssRule + '" on passed element.');
        }
        return val;
    }
```
calling the function...
```js
var fStyle = getStyle(document.getElementById("container"), "font-size");
```

Note:
This will be my notes
- - -

## In the beginning...then came...(JQuery)
<br />
accessing the elements font size...
```js
var fStyle = $("container").css("font-size");
// fStyle = font-size of 'container' element
```
<br />
'Code less, Do more'<br />
*John Resig*

Note:
This will be my notes
- - -

## '$' demistified
<br />

different ways of accessing the jquery object...
```js
// using the jquery/$ object
var mySelector = jQuery("selector");

var mySelector = $("selector");

// under the hood
...
window.jQuery = window.$ = jQuery;
...
```

<script type="text/javascript">
alert('hello!');
</script>

```js
// code loaded after dom has been loaded
$(document).ready(function(){
    console.log('ready')
})

// best practice...
$(function(){
    console.log('ready')
})
```

Note:
This will be my notes
- - -
## Working with Selectors
Other ways to create a jQuery object

```js
// create a jquery object from a DOM element
var jqObj = $(document.body.children[0]);

// make a selection in the context of a DOM element
var jqObj = $('ul.myclass li', document.body.children[0]);

// make a selection within a previous selection
var jqObj = $('a', $('p'));
```
Getting an element from a selection
```js
var items = $('ul.myclass li');
var jsObj = $('ul.myclass li').get(0);
var html = jsObj.innerHTML;
```

If you try this it will fail
```js
var html = jsObj.html(); // jsObj is a DOM object 'not' a jq object
```

Note:
This will be my notes
- - -
## Working with Selectors...
(continued)

accessing single elements from a list
```js
var items = $('ul.myclass li');
var secondItem = items.eq(1); // eq() returns a jq object of a single element
```

Checking if a list exist then Looping over the UL list of LI's
```js
if(items.length > 0){
    // there are 1 or more li's in the ul
    items.each(function(index, elem){
        // this: current context, raw DOM element of li
        // index: the current elements index
        // elem: same as this
        $(elem).prepend('<b>' + index + '</b>'); // inserts into each li item '<b>[n]</b>'
    });
}
```
- - -

## Create/Add elements in the DOM
<br />

####Creating an element
```js
// creates a new p element
var pObj = $('p');

// creates a p element with text
var pObj = $('<p>this is some text<p/>');

// creates a p element with text, a class and inline style
var pObj = $('<p class="someClass" style="text-align:left">this is some text</p>')
```

Note:
This will be my notes
- - -

## Create/Add elements in the DOM
<br />

####Add an element
take the following html
```html
<div class="someClass">
    <h4>Insert element before/after</h4>
    <div class="content">my content goes here</div>
</div>
```

If we execute the following jquery...
```js
$('<p>some text</p>').insertAfter('.someClass div'); // there is also insertBefore() method
```

the HTML will change to...
```html
<div class="someClass box">
    <h4>Insert element after</h4>
    <div class="content">my content goes here</div>
    <p class="blue">some text after</p>
</div>
```

Note:
This will be my notes
- - -

## Clone elements in the DOM
<br />

> The clone method performs a deep copy of a set of elements, it copies the matched elements as well as all of there descendant elements
and text nodes. Any events or user data applied to elements being cloned, will be set to there defaults and not be included.

take the following html
```html
<div class="someClass">
    <h2>some heading</h2>
    <div class="content">my content</div>
</div>
```

```js
$('.content').clone().appendTo('.someClass');
```

the HTML will change to...
```html
<div class="someClass">
    <h2>some heading</h2>
    <div class="content">my content</div>
    <div class="content">my content</div>
</div>
```

Note:
- Clone element with bound data and/or event handlers (next)
- - -

## Clone elements in the DOM
<br />

####Clone element with bound data and/or event handlers

> Remember if you clone an element with an ID attribute, this is supposed to be unique in the DOM.

```html
<button>Lets Clone!</button>
<div class="someClass">
    <div class="myElement">my content</div>
</div>
<div class="container"></div>
```

```js
    var elem = $('.someClass');
    elem.data('names' , ['john', 'ben', 'paul']);

    $('button').on('click', function(){
        // passes true (withDataAndEvents attribute) to clone data and events
        elem.clone(true).appendTo('div.container');
        return false;
    });

    $('.someClass').on('click', function(){
        var dataResult = elem.data('names');
        dataResult.forEach(function(ele, idx){
            console.log(ele);
        });
        console.log(dataResult);
    });
```

Note:
- id on cloned element, produce duplicate id's
- - -

## Delete elements in the DOM
<br />

<i><b>remove()</b>, empty(), detach()</i>

> using remove() you will remove an element from the DOM including 'any' attached events/data

```html
<ul class="container">
    <li><p>content</p></li>
    <li><p>content&nbsp;<a href="#link">a link</a></p></li>
    <li><p>content</p></li>
</ul>
```

```js
$('ul.container li').on('click', function(){
    // does an '<a>' tag exist in the clicked on li?
    if($(this).find('a').length > 0){
        // removes element that contains an '<a>' tag, including its click event handler
        $(this).remove();
    }
})
```

the HTML will change to...

```html
<ul class="container">
    <li><p>content</p></li>
    <li><p>content</p></li>
</ul>
```

Note:
-
- - -

## Delete elements in the DOM
<br />

<i>remove(), <b>empty()</b>, detach()</i>

> using empty() you will remove all child nodes inside matched elements

```html
<ul class="container">
    <li><p>content</p></li>
    <li><p>content&nbsp;<a href="#link">a link</a></p></li>
    <li><p>content</p></li>
</ul>
```

```js
$('ul.container').empty();
```

the HTML will change to...

```html
<ul class="container">
</ul>
```

Note:
-
- - -

## Delete elements in the DOM
<br />

<i>remove(), empty(), <b>detach()</b></i>

> using detach() is the same as remove() the exception is that
it will not delete all the data/event handlers associated with the matched elements.

```html
<div class="myDetail">
    <p>Foo bar</p>
</div>
<a href="#" class="button">remove</a>
```

```js
$('.myDetail p').on('click', function(){
    alert('my name is ' + $(this).html())
})

var detail;
$('a.button').on('click', function(){
    var that = $(this); // grab the JQ object
    if(detail){
        detail.appendTo('.myDetail'); // append detail to container
        detail = null;
        that.html('remove');
    }else{
        detail = $('.myDetail p').detach(); // detach element from dom, not the event handler
        that.html('add');
    } return false;
});
```

Note:
-
- - -

## Chaining
<br />
basic chaining
```js
$('ul.someClass li').click(function(){
    $(this).addClass('clickedMe');
}).find('span').attr('title', 'I am a title')
```
better way...

```js
var someClassList = $('ul.someClass li');
var someClassSpans = someClassList.find('span');

someClassList.click(function(){
    $(this).addClass('clickedMe');
});

someClassSpans.attr('title', 'I am a title');
```

Note:
-
- - -

## Basics of Traversing
<br />

take the following

```html
<ul>
    <li>
        <span><b>foo</b></span>
    </li>
    <li class="last">bar</li>
</ul>
```

- the first list item is a child of the parent list
- the &lt;ul&gt; is a parent of both list items
- the &lt;span&gt; is a descendant of the unordered-list
- the &lt;b&gt; is a child of the &lt;span&gt; inside the first list item
- the unordered list is an ancestor of everything inside of it
- the two list items are siblings

Note:
This will be my notes


## Basics of Traversing
<br />

take the following

```html
<ul>
    <li>
        <span><b>foo</b></span>
    </li>
    <li class="last">bar</li>
</ul>
```
Filter your selections

```js
// grab all li's under the unordered list
var items = $('ul li');

// filter out only li's with class 'last'
var last = items.filter('.last');

// filter out li's 'not' having class 'last'
var notLast = items.not('.last');

// filter selection to only ones that have a span
var hasSpan = items.has('span')
```
Note:
This will be my notes


## Basics of Traversing
<br />

take the following

```html
<ul>
    <li>
        <span><b>foo</b></span>
    </li>
    <li class="last">bar</li>
</ul>
```

Traversing the DOM

```js
var item = $('ul li').last(); // get last element in unordered list
var item = $('ul li').first(); // get first element in unordered list

// get siblings of the item (first li element, the '<span><b>foo</b></span>' as a JQ object)
var siblings = item.siblings();

var nextSibling = item.next(); // get next li in unordered list

var list = item.parent(); // get li's parent, the ul

var items = list.children(); // get children of ul, all li's

var module = items.closest('.last'); // get closest li with class 'last'
```

Note:
This will be my notes
- - -

## Manipulation - elements &amp; attributes
<br />

take the following

```html
<ul>
    <li>
        <span><b>foo</b></span>
    </li>
    <li class="last">bar</li>
</ul
```

altering classes &amp; styling

```js
$('li:first-child').addClass('hidden'); // add class hidden
$('ul li').eq(1).removeClass('last'); // remove class last from 2nd li

// adds hidden class if not present, removes hidden class if it is present
$('ul li').eq(1).toggleClass('hidden');

// changes the CSS on an element
$('ul li span').css({
    font-family: 'helvetica',
    color: '#000'
})
```

Note:
This will be my notes
- - -

## Manipulation - elements &amp; attributes
<br />

take the following form

```html
<form id="convert">
    <span>$</span><input value="" type="text" class="sum" />
    <select id="currencies">
        <option value="dollar" selected>pound</option>
        <option value="yen">yen</option>
    </select>
    <input value="submit" type="button" class="submit" />
</form>
```

```js
$('input.submit').on('click', function(){
    var sum = $('input[type="text"]').val(); // gets value from text box
    var currencyType = $('select.currencies').val(); // gets value from select option
    var res = calculate(sum, currencyType); // performs some currency conversion calculation
    console.log(res);
    return false;
})
```

Note:
This will be my notes


## Manipulation - elements &amp; attributes
<br />

other form elements

```html
<input type="checkbox" name="cbfoo" value="foo"> foo
<input type="checkbox" name="cbfoo" value="bar"> bar
<input type="radio" name="rbar" value="foo"> foo
<input type="radio" name="rbar" value="bar"> bar
```

```js
// Get the value from a checked checkbox
$( "input:cbfoo:checked" ).val();

// Get the value from a set of radio buttons
$( "input:radio[name=rbar]:checked" ).val();
```

Note:
This will be my notes
- - -

## Styling elements
<br />

coming back to the html before
```html
<ul>
    <li>
        <span><b>foo</b></span>
    </li>
    <li class="last">bar</li>
</ul>
```

```js
// set color on li
$('ul li').css('color', 'black');

// set color and font size on li
$('ul li').css({
    color: 'black',
    fontSize: '10px'
});

// get color from li
var myColor = $('ul li').css('color');

// add class to element
$('ul li:first-child').addClass('item');

// remove class from element
$('ul li:first-child').removeClass('item');

// has class on element
var found = $('ul li:first-child').hasClass('item'); // returns true/false
```

Note:
This will be my notes


## Styling elements
<br />

```html
<ul>
    <li>
        <span><b>foo</b></span>
    </li>
    <li class="last">bar</li>
</ul>
```

```js
$('ul li').on('mouseenter', function(){
    $(this).css({
        backgroudColor: 'black',
    })
}).on('mouseleave', function(){
    $(this).css({
        backgroundColor: 'none',
    })
})

// or you can use the hover() method like so...
$('ul li').hover(function(){
    // mouseenter
}, function(){
    // mouseleave
})
```

Note:
This will be my notes
- - -

## Basics of Event handling
<br />

| Native event name | Shorthand method |
| ----------------- |:----------------:|
| click             | .click()         |
| keydown           | .keydown()       |
| keypress          | .keypress        |
| keyup             | .keyup()         |
| mouseover         | .mouseover()     |
| mouseout          | .mouseout()      |
| mouseenter        | .mouseenter()    |
| mouseleave        | .mouseleave()    |
| scroll            | .scroll()        |
| focus             | .focus()         |
| blur              | .blur()          |
| resize            | .resize()        |

Note:
This will be my notes

- - -

## Basics of Event handling
<br/>

```js
// bind an event
$(selectors).on([eventType], callBackMethod);

// removing an event
$(selectors).off([eventType])

// bind a click event to an li element
$('li').on('click', function(evt){
    // ...code
});

// remove a click event
$('li').off('click');
```

#### Name spacing events

```js
// bind a namespaced click event to li elements
$('li').on('click.menu', function(){
    // ...code
});

// remove a namespaced click event from li elements
$(li).off('click.menu');
```

Note:
This will be my notes


## Basics of Event handling
<br/>

#### Multiple events

```js
$('li').on('click.menu mouseenter.menu', function(){
    // ...code
})

$(window).on('resize.foo scroll.bar', function(){
    // ...code
})
```

#### Passing named functions as events
```js
var myHandler = function(){
    // ...code
}

$('li.last').on('click', myHandler);
```

Note:
This will be my notes



## Basics of Event handling
<br/>

#### The event object
```js
$( document ).on( 'click', function( event ) {
  console.log( event.type );    // The event type, eg. "click"
  console.log( event.which );   // The button or key that was pressed.
  console.log( event.target );  // The originating element.
  console.log( event.pageX );   // The document mouse X coordinate.
  console.log( event.pageY );   // The document mouse Y coordinate.
});
```

#### Prevent the default action

```js
$('a.button').on('click', function(){
    // prevents the default click action
    evt.preventDefault();
    // ...code
    console.log('I was just clicked...')
})
```

Note:
This will be my notes

- - -

## Basics of Animations
<br/>

#### Built in effects

- .show([duration], [easing], [completeCallback])
- .hide([duration], [easing], [completeCallback])
- .fadeIn([duration], [easing], [completeCallback])
- .fadeOut([duration], [easing], [completeCallback])
- .slideDown([duration], [easing], [completeCallback])
- .slideUp([duration], [easing], [completeCallback])
- .slideToggle([duration], [easing], [completeCallback])


## Basics of Animations
<br/>

#### Examples of inbuilt animations
```js
$('.hidden').show('fast', function(){
    console.log('animation complete!');
});

$('.hidden').hide(1000, function(){
    console.log('animation complete!')
})

$('.hidden').show('slow');

$('.hidden').slideUp();
```

#### removing an element using the 'this' keyword

```js
$('ul.myClass li:first-child').hide('slow', function(){
    $(this).remove();
});
```


## Basics of Animations
<br/>

#### Custom effects using 'animate()'

```js
// signature
animate(properties, [duration], [easing], [completeCallback]);
```
#### Example of its use

```js
$( "p" ).animate({
  height: 200,
  width: 400,
  opacity: 0.5
}, 1000, "linear", function() {
  console.log('animation complete!')
});
```

Note:
This will be my notes
- - -
## Material references
<br/>

- JQuery site (http://jquery.com/)
- JQ Fundamentals by Rebecca Murphey (http://jqfundamentals.com/)
-