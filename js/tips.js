/**
 * @author yinheli
 */
(function($){
    $(function(){

        var replys = {};

        $('.cell strong a.dark').each(function() {
            var name = $(this).text();
            if (!replys[name]) {
                replys[name] = new Array();
            }
            var item = $(this).parents('.cell').clone();
            item.find('.fr').remove();
            item.find('.reply_content img').css({'max-width':'400px'});
            replys[name].push(item);
        });

        var content = $('.reply_content');
        content.each(function() {
            var contentHtml = this.outerHTML;

            var links = $(this).find('a');

            links.each(function() {
                var pos = contentHtml.indexOf(this.outerHTML);
                var at = contentHtml[pos-1];
                if (at != '@') {
                    return;
                }

                var name = $.trim($(this).text());
                var context = replys[name];
                if (!context) {
                    return;
                }

                var sbox = null;

                $(this).hover(
                    function(event) {
                        sbox = $('<div class="sbox box" style="display: none; width: 520px; position: absolute; border: 1px solid #ccc; box-shadow: 0pt 1px 2px rgba(0, 0, 0, 0.18) outset"></div>');
                        var id = $(this).parents('.cell').attr('id');
                        var count = 0;
                        for(var i = context.length-1; i >= 0; i--) {
                            var item = context[i];
                            var itemId = item.attr('id');
                            if (id > itemId) {
                                sbox.append(context[i]);
                                count++;
                            }
                        }
                        if (count > 0) {
                            sbox.css({top:event.pageY + 10, left:event.pageX + 20});
                            $('body').append(sbox);
                            sbox.fadeIn(200);
                        } else {
                            sbox = null;
                        }
                    },

                    function(event) {
                        if (sbox) {
                            sbox.fadeOut(200, function(){
                                sbox.remove();
                            });
                        }
                    }
                );
            });
        });
        
    });
})(jQuery);
