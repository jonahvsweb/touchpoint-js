# TouchPoint.js

A tiny (2.6kb minified) vanilla JavaScript library made for in-browser HTML prototyping (as part of the UX process) that visually shows where the user clicks/taps on-screen with CSS3 transitions. TouchPoint is highly customizable, mobile ready and great for screencasting, screen recording, user testing and presentations.

![TouchPoint.js in action](http://jonahvsweb.com/in-the-lab/lib/touchpoint-js/touchpoint-js.gif "TouchPoint.js in action")

**Live demo: [codepen.io/jonahvsweb/full/bdQmpd/](http://codepen.io/jonahvsweb/full/bdQmpd/)**

## Installation
Download and include `touchpoint.js` or `touchpoint.min.js` in the `<head>` or at the end of the `<body>` (recommended) in your HTML document. There are no dependencies:

```html
<script src="touchpoint.min.js"></script>
```

## Quick Start/How to Use
After you load the script you simply initialize TouchPoint and add an event listener to whichever DOM element you want TouchPoint to show over: 

```html
<script>
	TouchPoint.init(window);
</script>
```

**That's it!**

[Start clicking away on the page to see it in action.](http://jonahvsweb.com/in-the-lab/lib/touchpoint-js/)

## Options
TouchPoint is customizable. There are a number of options that you have access to to customize the look for your needs. It's important that these options be defined before you initialize TouchPoint with `TouchPoint.init()`. Otherwise, your updates won't show.

#### Color
Change the default color of TouchPoint. Any valid CSS color can be used. 

Default value: `'#FFF'`
```html
TouchPoint.color = 'red';
```

#### DOM
Change the default DOM element that TouchPoint will be active over. If you want TouchPoint to only show on a specific element, make sure that that element is set to `overflow: visible`, otherwise TouchPoint will get clipped.

Default value: `window`
```html
TouchPoint.dom = elementVarId;
```

or (recommended)

```html
TouchPoint.init(elementVarId);
```

#### Element
Change the kind of HTML element that TouchPoint creates. 

Default value: `'div'`
```html
TouchPoint.el = 'span';
```

#### Opacity
Change the opacity of the TouchPoint. You can use any value between `0` and `1`. 

Default value: `0.8`
```html
TouchPoint.opacity = 0.5;
```

#### Scale
Change the final scale of the TouchPoint. This value can range from `0` and beyond. 

Default value: `8`
```html
TouchPoint.scale = 14;
```

#### Size
Change the initial size of the TouchPoint. This value is `px`. 

Default value: `20`
```html
TouchPoint.size = 5;
```

#### zIndex
Change the zIndex of the TouchPoint. By default it's set at the highest `z-index` depth possible, but you may find the need to change it based on your own prototype. 

Default value: `9999`
```html
TouchPoint.z = 500;
```

## Performance
Performance should not be an issue because each individual TouchPoint element is dynamically created and then automatically removed from the DOM after being used.

## Release Notes
**TouchPoint.js 1.0**   
– Initial Release       

*This is in active development.*

## Feedback
If you discover any issues or have questions regarding usage, please send a message me here on GitHub, [@jonahvsweb](https://twitter.com/jonahvsweb) on Twitter or from my website, [jonahvsweb.com](http://jonahvsweb.com).