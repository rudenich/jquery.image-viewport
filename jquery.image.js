(function($){
    function Class(proto,parent){parent=parent||Object; var a = function(){ this.init.apply(this,arguments); }; a.prototype = proto; a.prototype['_parent'] = parent; return a;};
    var
        vpWidth,

        vpHeight,
        vpRatio,
        imgRatio,
        items,
        defaults={
            'vertical':'top',
            "horizontal":"left",
            parent:'div'
        }
    ;

    var ImgFit = Class({
        init:function(_options){
            var
                options = $.extend({}, $.imgFit.defaults,_options),
                $element
                ;
            this.$element  = $element = options['$element'];
            this.options = options
            $element.on('load', $.proxy(this.onLoad,this)).each(function() {
                if(this.complete) $(this).load();
            });
            $(window).on('resize.ImgFit', $.proxy(this.onResize,this));
            this._parent.prototype.init.apply(this,arguments);
        },
        onLoad:function(){
            var $element = this.$element;
            $element.data('origin-width',$element.get(0).width);
            $element.data('origin-height',$element.get(0).height);
            fit($element);
        },
        onResize:function(){
            fit(this.$element);
        },
        fit:function(){

        }

    },Class({init:function(){console.log('fuck')}}));

    /*function ImgFit(){

        this.init.apply(this,arguments);
    }

    ImgFit.prototype={
        init:function(_options,){
            var
                options = $.extend({}, $.imgFit.defaults,_options)
                ;
            console.log(options);

        }
    }*/
    function init(){

    }

    function fit(img){
        var
            container = img.closest(defaults.parent),
            imgWidth = img.data('origin-width'),
            imgHeight = img.data('origin-height')
            /*imgWidth = img.get(0).width,
            imgHeight = img.get(0).height*/
        ;
        vpHeight = $(window).height();
        vpWidth = $('body').innerWidth();
        container.width(vpWidth).height(vpHeight);
        vpWidth = $('body').innerWidth();
        container.width(vpWidth);
        console.log("origin:",imgWidth,imgHeight);
        vpRatio = vpWidth/vpHeight;
        imgRatio = imgWidth/imgHeight;

        //resolvePosition(img,vpWidth,vpHeight,img.width(),img.height(),vpRatio,imgRatio);

        if(vpRatio<imgRatio){
            img.height(vpHeight);
            img.css('width','auto');
            imgWidth  = imgWidth/(imgHeight/vpHeight);
            imgHeight = vpHeight;

        }else{
            img.width(vpWidth);
            img.css('height','auto');
            imgHeight  = imgHeight/(imgWidth/vpWidth);
            imgWidth = vpWidth;
        }

        console.log("calculated",imgWidth,imgHeight);
        resolvePosition(img,vpWidth,vpHeight,imgWidth,imgHeight,vpRatio,imgRatio);
    }

    function resolvePosition(img,vpWidth,vpHeight,imgWidth,imgHeight,vpRaion,imgRatio){
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
        }else if(vertical=='center'){
            if(vpRaion>imgRatio){
                img.css({
                    top:(-(imgHeight-vpHeight)/2),
                    bottom:'auto'
                });
            }else{
                img.css({
                    top:0,
                    button:''
                });
            }
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
        }else if(horizontal=='center'){
            if(vpRaion<imgRatio){
                img.css({
                    left:(-(imgWidth-vpWidth)/2),
                    right:'auto'
                });
            }else{
                img.css({
                    left:'0',
                    right:'auto'
                });
            }
        }else{
            img.css({
                left:horizontal,
                right:'auto'
            });
        }
        
    }

    $.fn.imgFit = function(params){

        return this.each(function(){
            params = params || {};
            params['$element'] = $(this);
            var object = new ImgFit(params);

            defaults = $.extend({},defaults,params);
           /* this.each(function(){
                $(this).on('load',function(){
                    fit($(this));
                });
            });*/
            /*items = this;*/
            /*$(window).on('resize.imgfit',function(){
                console.log('fuck');
                items.each(function(){
                    fit($(this));
                })
            });*/
        });


    }

    $.imgFit = {
        defaults : defaults
    }
    ;
})(jQuery)