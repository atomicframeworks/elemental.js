(function($) { // Elemental - Create elements with ease
	var start = new Date().getTime();
    
	////
    // Default settings
	 
	var defaults = {
        // The element type (div, span, a, p)
		'element': 'div',
		// Element to append to after creating
		'appendTo': 'body',
		// Namespace for event binds
		'namespace': 'elemental'
    };
    
	////
    // Available methods
	
	var methods = {
        
        ////
        // Init - Accepts an argument of object to load merge with defaults
        
		init: function(options) {
           	
			// Merge defaults in to scoped settings
			var settings = {};
		    $.extend(settings, defaults);
			// Merge default options and passed argument options
            if (options) {
                $.extend(settings, options);
			}
			
			// Create the element
			return $.fn.elemental('create', settings);
        },
		
		////
		//  Create - Factory function to create HTML elements
		
		create: function (options){
			if (options.element) {
				var elem = '<'+options.element;
				// If there are HTML attributes to add...
				if (options.html) {
					//... Add them...
					for (attribute in options.html) {
						//... If attribute is not empty
						if (options.html[attribute]) {
							//... Add it
							elem += ' '+attribute+'="'+options.html[attribute]+'"';	
						}
					}
				}
				// Add closing bracket to start of element
				elem += '>';
				// Create the element jQuery style
				var $elem = $(elem);
	            // Merge style and css attributes (for ease)
	            if (options.style) {
					if (options.css){
		                $.extend(options.css, options.style);
					}
					else{
						options.css = options.style;
					}
	            }
				// If there are css attrs add them jQuery style
				if (options.css){
					$elem.css(options.css);
				}
				// Add content in element
				if (options.content) {
					$elem.html(options.content);
				}
				// Append to element if specified
				if (options.appendTo) {
					$(options.appendTo).append($elem);
					//$elem.appendTo(options.appendTo);
				}
				// START CALLBACKS
				// If there are callbacks to bind on...
				if (options.on){
					//... Loop through callbacks
					for (callback in options.on){
						if (callback){
							// If callback object
							if (typeof options.on[callback] == 'object'){
								// If we have arguments for the callback...
								if (options.on[callback].args){
									//... Bind & namespace callback with args 
									$elem.on(callback + '.' + options.namespace, options.on[callback].args, options.on[callback].callback);
								}	else {
									// If no arguments bind & namespace callback 
									$elem.on(callback + '.' +  options.namespace, options.on[callback].callback);
								}
							} 
							// If our callback is simply a function...
							else if (typeof options.on[callback] === 'function'){
								//... Bind & namespace it
								$elem.on(callback + '.' + options.namespace, options.on[callback]);
							}
						}
					}
				}
				// END CALLBACKS
				return $elem;
			}
            $.error( 'Argument must be an object with an element attribute.' );
			return false;
		// End create
		}
	// End methods
    };
	
    // Add elemental to jQuery 
	//
	
    $.fn.elemental = function(method) {
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.elemental' );
        }
    };
	
})(jQuery);
