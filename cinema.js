/**
 * Copyright (c) 2013 Fran Verona
 *
 * Permission is hereby granted, free of charge, to any
 * person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice
 * shall be included in all copies or substantial portions of
 * the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
 * KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * JQuery Cinema v1.0
 * Release Date: May, 2013
 *  
 * Create an overlay to display only the desire element/s. Lights off!
 */
if(jQuery)(
    function(jQuery){
        jQuery.extend(jQuery.fn,{
            
            /**
            *  Create the overlay and turn the lights off!
            */
            cinema: function(options){
                
                var $self = jQuery(this),
                $body = jQuery('body'),
                overlay = ['<div class="jquery-cinema">',
                '</div>'];
            
                $body.prepend(overlay.join(""));
                
                jQuery('.jquery-cinema').css({
                    'height':           $body.height()+'px',
                    'position':         'absolute',
                    'top':              '0px',
                    'left':             '0px',
                    'width':            '100%',
                    'z-index':          '4000',
                    'background-color': 'rgb(0, 0, 0)',
                    'opacity':          '0.9',
                    'display':          'none'
                });
                
                jQuery('.jquery-cinema').fadeIn(500);
                
                $self.data('cinemaselfposition',$self.css('position'));
                $self.data('cinemaselfzindex',$self.css('z-index'));
                
                $self.css({
                    'position': 'relative',
                    'z-index':  '5000'
                });
                
                jQuery('.jquery-cinema').click(function(){
                    // Restore z-index property for each element
                    var elements = jQuery('.jquery-cinema').data('cinemaelements');
                    if(elements != null){
                        for(var i=0,l=elements.length;i<l;i++){
                            var el = elements[i];
                            el.css({
                                'z-index': el.data('cinemazindex'),
                                'position': el.data('cinemaposition')
                            });
                        }
                    }
                    
                    // Remove the overlay
                    jQuery(this).fadeOut(500, function(){
                        jQuery(this).remove();
                    });
                    
                    // Restore property for the element itself
                    $self.css({
                        'position': $self.data('cinemaselfposition'),
                        'z-index':  $self.data('cinemaselfzindex')
                    });
                    
                });
                
                if(options != null){
                    if(options.elements != null){
                        jQuery('.jquery-cinema').data('cinemaelements',options.elements);
                        for(var i=0,l=options.elements.length;i<l;i++){
                            var el = options.elements[i];
                            el.data('cinemazindex',el.css('z-index'));
                            el.data('cinemaposition',el.css('position'));
                            el.css({
                                'z-index': '9999',
                                'position': 'relative'
                            });
                        }
                    }
                }
                
            },
            /**
            *  Remove the overlay and turn the lights on!
            */
            uncinema: function(){
                // Restore z-index property for each element
                var elements = jQuery('.jquery-cinema').data('cinemalements');
                if(elements != null){
                    for(var i=0,l=elements.length;i<l;i++){
                        var el = elements[i];
                        el.css({
                            'z-index': el.data('cinemazindex'),
                            'position': el.data('cinemaposition')
                        });
                    }
                }
                // Remove overlay
                jQuery('.jquery-cinema').fadeOut(500, function(){
                    jQuery(this).remove();
                });
                
                jQuery(this).css({
                    'position': jQuery(this).data('cinemaselfposition'),
                    'z-index':  jQuery(this).data('cinemaselfzindex')
                });
            }
            
        })
    })(jQuery);