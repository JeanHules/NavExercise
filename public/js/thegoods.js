(function(){
	
	$.getJSON('/api/nav.json', function (data) {
        console.log(data);
        i = 0;
        navList = ('#navList');

        $.each(data.items, function (i, item) { 
        		/* console.log(item); */
        		
        		//Create Main Nav li
            navListItem = '<li></li>';
            navListItem = $(navListItem).addClass('p-list-item');
            mainLink = '<a class="main-a close-trigger" href=' + item.url + ' target="_blank"><span>' + item.label + '</span></a>';

            if (item.items.length > 0) {
	            	//Create SubNav UL
                subNavList = '<ul></ul>';
                subNavList = $(subNavList).addClass('sub-nav-list');
                
                //Create Blank trigger
                triggerA = '<a href="#" class="sub-nav-trigger">' + item.label + '<span class="icon"></span></a>';
                triggerA = $(triggerA).addClass('sub-nav-a');
                
                //Append trigger to main nav li
                $(navListItem).append(triggerA);

                $.each(item.items, function (i, subItem) {
                    console.log(subItem);
                    //Create SubNav li
                    subNavListItem = '<li></li>';
                    subNavListItem = $(subNavListItem).addClass('p-list-item');
                    subLink = '<a class="sub-a close-trigger" href=' + subItem.url + '><span>' + subItem.label + '</span></a>';
                    
                    //Append Label and Link to subnav li
                    $(subNavListItem).append(subLink);

                    //Append subnav li to subnav ul
                    $(subNavList).append(subNavListItem);
                });
                //Append the secondary nav to main nav li
                $(navListItem).append(subNavList);
            } else {
                //Append subnav li to subnav ul
                $(navListItem).append(mainLink);
            }
            //Append all li to main ul
            $(navList).append(navListItem);
            
        });
        /*
	      legalText = '<p class="legal-text">&#169; 2014 Huge. All Rights Reserved.</p>';
        $(navList).append(legalText);
        */
    });
    
    //Toggle Nav Trigger
    $('#mobileTrigger').on('click',function(){
    	if($('#mainNav').hasClass('show-nav')){
		  	$('#mainNav').removeClass('show-nav');
		  	$('.p-list-item').removeClass('active');
		  	$('#mask').removeClass('active');
		  	$('body').removeClass('overflow-hidden');
	  	}
	  	else
	  	{
		  	$('#mainNav').addClass('show-nav');
		  	$('#mask').addClass('active');
		  	$('body').addClass('overflow-hidden');
	  	}
	  });
	  
	  $(document).on('click','.sub-nav-trigger', function(){
	  	var parent = $(this).parent();
	  	
	  	//close the nav in desktop
	 	  if($(this).parent().hasClass('active')){
	 	  	if($(window).width() >= 768) {
		  		$('#mask').removeClass('active');
		  		$('body').removeClass('overflow-hidden');
		  		$(this).parent().removeClass("active");
		  	}
		  	else{
			  	$(this).parent().removeClass("active");
		  	}
	  	}
	  	else {
	  		//on open
		  	parent.addClass("active");
		  	parent.siblings().removeClass("active");
		  	$('#mask').addClass('active');
		  	$('body').addClass('overflow-hidden');
	  	}
	  });
	  
	  $(document).on('click','.close-trigger', function(){
	  	$('.p-list-item').removeClass("active");
	  	$('#mask').removeClass('active');
	  	$('body').removeClass('overflow-hidden');
	  	$('#mainNav').removeClass('show-nav');
	  });
	  
	  


}(jQuery));