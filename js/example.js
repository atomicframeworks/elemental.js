$(document).ready(function() {
 	// Here we create an elemental example object and set many options to demonstrate...
	
	// #id = test 
	
	// .class = class1 class2
	
	// inline style = margin-top: 2px
	
	// insert - Comma seperated list of how the element will be added to DOM
	// * (example: 'after, before' will insert the element in the DOM after and then before the target)
	
	// css - is an object of css attributes to set
	// * (optionally can be an object called style)
	
	// on - is an object of event binds
	// - you can set any event such as mousedown, click, mouseenter
	// - you can pass arguments to it and use in the fuction by accessing e.data.argument_name
	// - you can add multiple callbacks and bind here
	
	// append - Element selector string (or array of them) or jQuery object of an element to .append (to the new element)
	// * (Not used in example)
	
	var elementalObject = {
        // The text in the box
        'content': 'Click for a callback!',
        // The element type
		'element': 'div',
		// HTML attributes we can add - (ID, class, style, href, etc.)
		'html': {
			'id': 'test',
			'class': 'class1 class2',
			// Inline styles if needed...
			'style': 'margin-top: 2px;'
		},
		// How the element is added to DOM - (prepend, append, before, after)
		// Comma seperated and will be inserted in specified order
		'insert': 'prepend',
		// CSS styles object
		'css': {
			'position': 'relative',
			'bottom': '0px',
			'right': '0px',
			'z-index': '1',
			
			'display': 'block',
			'width': '100%',
			'padding': '15px 20px 15px 15px',
			'line-height': '1em',
			
			'color': '#000000',
			'background-color': 'rgb(133, 133, 133)',
			'background-color': 'rgba(133, 133, 133, 0.75)',
			'border': '1px solid #BEBEBE',
			'box-shadow': '0px 0px 30px rgba(175, 175, 175, 0.3)',
			'-webkit-box-shadow': '0px 0px 30px rgba(175, 175, 175, 0.3)',
			'-moz-box-box-shadow': '0px 0px 30px rgba(175, 175, 175, 0.3)',
		},
		// On event binds
		'on': {
			'click': {
				'args': {
					'fadeElement': '.class1'
				},
				// The event callback function
				'callback': function (e){
					//e.preventDefault();
					// Uses the fade element in the args
					$(e.data.fadeElement).fadeOut('slow');
				}
			},
			'mousedown': function(){console.log('mousedown')}
		},
    };
	
	// Create the test element
	$('.rightColumn > .article > p:first').elemental( elementalObject );
	
	// Elemental div
	var divElement = {
		'content': 'Elemental div',
		'html': {
			'class': 'demo',
		},
		'css': {
			'background-color': 'rgba(255,33,33,.6)'
		}
	};
	
	// Example of only setting defaults
	$().elemental( 'defaults', divElement );
	
	// If you set defaults and select an element it will also create the default object passed on the selected element
	// * Note only the object properties passed to the defaults are set as defaults
	//$('.rightColumn .article .nested').elemental( 'defaults', divElement );
	
	// Create elemental div using above defaults in test area
	var elem = $('.article').elemental();
});