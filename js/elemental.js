(function ($) { // Elemental - Create elements with ease
	'use strict';
	////
    // Default settings
	 
	var defaults = {
        // The element type (div, span, a, p)
		'element': 'div',
		// Element to append to after creating
		'appendTo': 'body',
		// Namespace for event binds
		'namespace': 'elemental'
    },
    
	////
    // Available methods
	
	methods = {
        
        ////
        //  Init - Accepts an argument of object to load merge with defaults
        
		init: function( options ) {
			// Merge defaults in to scoped settings
			var settings = {};
		    $.extend( settings, defaults );
			// Merge default options and passed argument options
            if ( options ) {
                $.extend( settings, options );
			}
			// Create the element
			return $.fn.elemental( 'create', settings );
        },
		
		////
		//  Create - Factory function to create HTML elements
		
		create: function ( options ) {
			// If there is an element set...
			if ( options.element ) {
				//... start creating the elem string and declare other vars
				var elem = '<' + options.element, $elem, callback, i, attribute, arrayLength;
				// If there are HTML attributes to add...
				if ( options.html ) {
					//... Add them
					for ( attribute in options.html ) {
						if ( options.html.hasOwnProperty( attribute ) ) {
							//... If attribute is not empty
							if ( options.html[attribute] ) {
								//... Add it
								elem += ' ' + attribute + '=" ' + options.html[attribute] + '"';	
							}
						}
					}
				}
				// Add closing bracket to start of element
				elem += '>';
				// Create the element jQuery style
				$elem = $(elem);
	            // Merge style and css attributes (for ease)
	            if ( options.style ) {
					if ( options.css ) {
		                $.extend( options.css, options.style );
					}
					else {
						options.css = options.style;
					}
	            }
				// If there are css attrs add them jQuery style
				if ( options.css ) {
					$elem.css( options.css );
				}
				// Add content in element
				if ( options.content ) {
					$elem.html( options.content );
				}
				// Append to element if specified
				if ( options.appendTo ) {
					// If an array of appendTos...
					if ( options.appendTo instanceof Array ){						
						// Loop array of appendTos
						// We can't simply join the array as a comma seperated string selector because there may be jQuery objects in the array
						i = 0; 
						arrayLength = options.appendTo.length;
						while ( i < arrayLength ) {
							// Check if string or jQuery object - unlike .append there is no need to select element before appendingTo
							if ( typeof options.appendTo[i] === 'string' || options.appendTo[i] instanceof jQuery ){
								// We clone() here because according to jQuery documentation...
								// "If there is more than one target element, however, cloned copies of the inserted element will be created for each target after the first"
								$elem.clone().appendTo( options.appendTo[i] );
							}
							// Increase count before looping
						    i++;
						}
					}
					// If appendTo is a string or jQuery object...
					else if ( typeof options.appendTo === 'string' || options.appendTo instanceof jQuery ){
						//... Simply appendTo it - unlike .append there is no need to select element before appendingTo
						$elem.appendTo( options.appendTo );
					}
				}
				// Append elements if specified
				if ( options.append ) {
					// If an array of appends...
					if ( options.append instanceof Array ){
						//... Loop array of appends
						// We can't simply join the array as a comma seperated string selector because there may be jQuery objects in the array
						i = 0;
						arrayLength = options.append.length;
						while ( i < arrayLength ) {
							// Check if string...
							if ( typeof options.append[i] === 'string' ){
								// If string we must select the element before appending
								$elem.append( $(options.append[i]) );
							}
							// if jQuery object - simply append it
							else if ( options.append[i] instanceof jQuery ){								
								$elem.append( options.append[i] );
							}
							// Increase count before looping
						    i++;
						}
					}
					// If string we must select the element before appending
					else if ( typeof options.append === 'string' ){
						$elem.append( $(options.append) );
					}
					// if jQuery object - simply append it
					else if ( options.append instanceof jQuery ){
						$elem.append( options.append );
					}
				}
				////
				// START CALLBACKS
				// If there are callbacks to bind on...
				if ( options.on ) {
					//... Loop through callbacks
					for ( callback in options.on ) {
						if ( options.on.hasOwnProperty(callback) ) {
							if ( callback ) {
								// If callback is an object...
								if ( $.isPlainObject(options.on[callback]) ) {
									//... Bind & namespace callback with args  (undefined if no args is fine)
									$elem.on( callback + '.' + options.namespace, options.on[callback].args, options.on[callback].callback );
								} 
								// If our callback is simply a function...
								else if ( typeof options.on[callback] === 'function' ) {
									//... Bind & namespace it
									$elem.on( callback + '.' + options.namespace, options.on[callback] );
								}
							}
						}
					}
				}
				// END CALLBACKS
				////
				return $elem;
			}
            $.error( 'Argument must be an object with an element attribute.' );
		// End create
		}
    };
	
    ////
	//  Add elemental to jQuery 
	
    $.fn.elemental = function( method ) {
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } 
		else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        }
		else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.elemental' );
        }
    };
	
})(jQuery);
