(function ($) { // Elemental - The Element Factory
	'use strict';
	////
    // Default settings
	
	var defaults = {
        // The element type ( div, span, a, p, etc. )
		'element': 'div',
		// Ways to add the element ( before, prepend, append, after )
		// comma separated string - each method will be used in order specified
		'insert': 'append',
		// Namespace for event binds
		'namespace': 'elemental'
    },
	
	////
	//  Counters
	i, arr,
	
	//// 
    //  Regex for comma separated values / white space agnostic
	method = /[^,\s][^\,]*[^,\s]*/g,
    
	////
    // Available methods
	
	methods = {
        ////
        //  Init - Accepts an argument of object for a scoped merge with defaults 
        
		init: function ( options ) {			
			// Merge defaults in to scoped settings
			var settings = {};
			$.extend( settings, defaults );
			// Merge default options and passed argument options
            if ( options ) {
                $.extend( settings, options );
			}
			// Create the element and return the $() selected for chaining
			return this.each( function () {
				// Create array based on comma seperated method regex
				arr = settings.insert.match(method).reverse();
				i = arr.length; 
				while ( i-- ) {
					// Switch on lower
					switch( arr[i].toLowerCase() ) {
						case 'before':
							$(this).before( methods.create(settings) );
						break;
						case 'prepend':
						case 'prependto':
							$(this).prepend( methods.create(settings) );
						break;
						case 'append':
						case 'appendto':
							$(this).append( methods.create(settings) );
						break; 
						case 'after':
							$(this).after( methods.create(settings) );
						break;
						default:
						
					}
				}
			});
        },
		
		////
		//  Defaults - Accepts an argument of object to set defaults 

		defaults: function ( options ) {
            if ( options ) {
				// Set defaults
				$.extend( defaults, options );
				// Create the element ( if any ) and return the $() selected for chaining
				return this.each( function () {
					$(this).elemental();
				});
			}
		},
		
		////
		//  Create - Factory function to create HTML elements
		
		create: function ( options ) {
			// If there is an element set and insert method...
			if ( options.element && options.insert ) {
				//... start creating the elem string and declare other vars
				var elem = '<' + options.element, $elem, callback, attribute;
				// If there are HTML attributes to add...
				if ( options.html ) {
					//... Add them
					for ( attribute in options.html ) {
						if ( options.html.hasOwnProperty( attribute ) ) {
							//... If attribute is not empty
							if ( options.html[attribute] ) {
								//... Add it
								elem += ' ' + attribute + '="' + options.html[attribute] + '"';	
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
				// Append elements if specified
				if ( options.append ) {
					// If an array of appends...
					if ( options.append instanceof Array ){
						//... Loop array of appends
						// We can't simply join the array as a comma seperated string selector because there may be jQuery objects in the array
						i = 0;
						arr = options.append.length;
						while ( i < arr ) {
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
            $.error( 'Argument must be an object with an element attribute and insert method.' );
		// End create
		}
    };
	
    ////
	//  Add elemental to jQuery 
	
    $.fn.elemental = function ( method ) {
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ) );
        } 
		else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        }
		else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.elemental' );
        }
    };
	
}( jQuery ) );