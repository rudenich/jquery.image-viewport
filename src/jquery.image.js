(function($){
    var
        vpWidth,
        vpHeight,
        vpRatio,
        imgRatio,
        items,
        defaults={
            'vertical':'top',
            "horizontal":"left"
        }
    ;


    function init(){

    }

    function fit(img){
        vpHeight = $(window).height();
        vpWidth = $('body').innerWidth();
        img.parent().width(vpWidth).height(vpHeight);
        vpWidth = $('body').innerWidth();
        img.parent().width(vpWidth);

        vpRatio = vpWidth/vpHeight;
        imgRatio = img.width()/img.height();

        resolvePosition(img);

        if(vpRatio<imgRatio){
            img.height(vpHeight);
            img.css('width','auto');
        }else{
            img.width(vpWidth);
            img.css('height','auto');
        }
    }

    function resolvePosition(img){
        var
            horizontal = img.data('horizontal')!=undefined?img.data('horizontal'): defaults['horizontal'],
            vertical = img.data('vertical')!=undefined?img.data('vertical'): defaults['vertical']
        ;
        if(vertical=='top'){
            img.css({
                top:0,
                button:''
            });
        }else if(vertical=='bottom'){
            img.css({
                top:'',
                button:0
            });
        }else{
            img.css({
                top:vertical,
                button:0
            });
        }
        
        
        if(horizontal=='left'){
            img.css({
                left:0,
                right:'auto'
            });
        }else if(horizontal=='right'){
            img.css({
                left:'auto',
                right:0
            });
        }else{
            img.css({
                left:horizontal,
                right:'auto'
            });
        }
        
    }

    $.fn.imgFit = function(){
        this.each(function(){
            $(this).on('load',function(){
                fit($(this));
            });
        });
        items = this;
        $(window).on('resize',function(){
            items.each(function(){
                fit($(this));
            })
        })
    }

    $.imgFit = {
        defaults : defaults
    }
    ;
})(jQuery)