$(document).ready(function() {
 	// Here we create an elemental example object and set many options to demonstrate...
	
	// #id test 
	
	// .class = class1 class2
	
	// inline style = margin-top: 2px
	
	// appendTo is a selector that sets where we will add the element once created
	
	// css  - is an object of css attributes to set
	// * (optionally can be an object called style)
	
	// on - is an object of event binds
	// - you can set any event such as mousedown, click, mouseenter
	// - you can pass arguments to it and use in the fuction by accessing e.data.argument_name
	// - you can add multiple callbacks and bind here 
	
	var elementalObject = {
        // The text in the box
        'content': 'Click for a callback!',
        // The rawr element
		'element': 'div',
		'html': {
			'id': 'test',
			'class': 'class1 class2',
			// Inline styles if needed...
			'style': 'margin-top: 2px;'
		},
		// Target Element we append new element to
		'appendTo': '.rightColumn > .article > p:first',
		// jQuery style object to add
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
					$(e.data.fadeElement).fadeOut('slow');
				}
			},
			'mousedown': function(){console.log('mousedown')}
		},
    };
	
	// Create the test element
	$().elemental(elementalObject);
	
	// Elemental div
	var divElement = {
		'content': 'Elemental div',
		'element': 'div',
		// Demonstrate multiple appendTos
		'appendTo': [$('.nested'), '.rightColumn > .article > p:first', $('.nested')]
	};
	
	// Create elemental div in test area
	$().elemental(divElement);
	
});