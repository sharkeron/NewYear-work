function initMap() {
	mapOption = {
		zoom: 14,
		center: {
			lat: 43.2678033,
			lng: 6.6308296
		}
	};

	map = new google.maps.Map(document.getElementById('map'), mapOption);

	marker = new google.maps.Marker({
		map: map
	});
}

$(function () {

	// слайдер в шапке

	$('header .slides').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		draggable: false,
		prevArrow: $('.slick-prev'),
		nextArrow: $('.slick-next')
	});

	//  табы с графиками

	$(document).on('click', '.about-us .menu .menu-item a', function (e) {

		e.preventDefault();
		var tab_id = $(this).closest('.menu-item').attr('data-tab');
		$('.about-us .active[data-tab]').removeClass('active');
		$('.about-us [data-tab="' + tab_id + '"]').addClass('active');
	});

	// выравнивание высоты у табов с графиком

	$(function () {

		var tabsMaxHeight = 0;

		$('.about-us .tabs-content .tab-content').css('display', 'block');

		$('.about-us .tabs-content .tab-content').each(function () {
			var height = $(this).outerHeight(true);
			if (height > tabsMaxHeight) {
				tabsMaxHeight = height;
			}
		});

		$('.about-us .tabs-content').css('height', tabsMaxHeight + 'px');
		$('.about-us .tabs-content .tab-content').css('display', '');
	});

	// isotope

	$(function () {

		$('.grid').isotope({
			itemSelector: '.element-item',
			layoutMode: 'fitRows'
		});

		// bind filter button click
		$('#filters').on('click', 'button', function () {
			var filterValue = $(this).attr('data-filter');
			$('.grid').isotope({
				filter: filterValue
			});
		});

		// change is-checked class on buttons
		$('.button-group').each(function (i, buttonGroup) {
			var $buttonGroup = $(buttonGroup);
			$buttonGroup.on('click', 'button', function () {
				$buttonGroup.find('.is-checked').removeClass('is-checked');
				$(this).addClass('is-checked');
			});
		});

	});

	// табы блока services

	$(document).on('click', '.services .menu .menu-item', function (e) {

		e.preventDefault();
		var tab_id = $(this).attr('data-tab');
		$('.services .active[data-tab]').removeClass('active');
		$('.services [data-tab="' + tab_id + '"]').addClass('active');
	});

	// выравнивание высоты у табов блок services

	$(function () {

		var tabsMaxHeight = 0;
		$('.services .tabs-content .tab-content').css('display', 'block');

		$('.services .tabs-content .tab-content .col-10').each(function () {
			var height = $(this).outerHeight(true);
			if (height > tabsMaxHeight) {
				tabsMaxHeight = height;
			}
		});

		$('.services .tabs-content').css('height', tabsMaxHeight + 'px');
		$('.services .tabs-content .tab-content').css('display', '');
	});

	// открытие модального окна блок news

	$(function () {
		$(document).on('click','.news .thumbnail', function () {
			$('.modal').addClass('active');
			var pic = $(this).html();
			$('.modal .photo').html(pic);
			$('.modal .photo .date').css('display','none');
		});

		$(document).on('click', '.modal', function () {
			$('.modal').removeClass('active');
		});
	});

	// анимация набора чисел с включением при скролле

	$(function(){

		var show = true,
			 countbox = "#blocks-2";

		$(window).on("scroll load resize", function(){

			if(!show){
				return false;
			}

			var scroll = $(window).scrollTop();
			var distanceToBlock = $(countbox).offset().top;
			var windowHeight = $(window).height();
			var documentHeight = $(document).height();
			var blockHeight = $(countbox).outerHeight();

			if(scroll + 200 >= distanceToBlock || windowHeight + scroll === documentHeight || blockHeight + distanceToBlock < windowHeight){
				$(".numbers-animate").spincrement({
					from: 0,
					thousandSeparator: "",
					duration: 2500
				});

				show = false;
			}
		});

	});

	// выравнивание высоты отзывов

	$(function () {

		var tabsMaxHeight_test = 0;

		$('.testimonials .tabs-content .tab-content').css('display', 'block');

		$('.testimonials .tabs-content .tab-content .content').each(function () {
			var height = $(this).outerHeight(true);
			if (height > tabsMaxHeight_test) {
				tabsMaxHeight_test = height;
			}
		});

		$('.testimonials .tabs-content .tab-content .content').css('height', tabsMaxHeight_test + 'px');
		$('.testimonials .tabs-content .tab-content').css('display', '');
	});

	// запрос изображения с малого аватара и вставка в большой

	$(function () {
		var pic = $('.testimonials .mini-avatars .active').html();
		$('.testimonials .tab-content .avatar').html(pic);
	});

	// функция проверки активного таба(малый аватар)

	function verificationTabId(tab_id) {
		if (tab_id !== 4 && tab_id !== 1) {
			$('.testimonials .tab-next').addClass('active');
			$('.testimonials .tab-prev').addClass('active');
		} else if (tab_id == 1) {
			$('.testimonials .tab-prev').removeClass('active');
		} else if (tab_id == 4) {
			$('.testimonials .tab-next').removeClass('active');
		}
	}

	// смена таба по нажатию на tab-next

	$(document).on('click', '.testimonials .tab-next', function (e) {
		e.preventDefault();
		var tab_id = $('.testimonials .active[data-tab]').attr('data-tab');
		tab_id++;

		if ($('.testimonials [data-tab=' + tab_id + ']').length === 0) {
			tab_id = 4;
		}

		if(tab_id === 4) {
			$('.testimonials .tab-next').removeClass('active');
			$('.testimonials .tab-prev').addClass('active');
		} else if (tab_id !== 1 && tab_id !== 4) {
			$('.testimonials .tab-prev').addClass('active');
			$('.testimonials .tab-next').addClass('active');
		}

		$('.testimonials .active[data-tab]').removeClass('active');
		$('.testimonials [data-tab="' + tab_id + '"]').addClass('active');

		var pic = $('.testimonials .mini-avatars .active img').attr('src');
		$('.testimonials .tab-content img').attr('src', pic);

	});

	// смена таба по нажатию на tab-prev

	$(document).on('click', '.testimonials .tab-prev', function (e) {
		e.preventDefault();
		var tab_id = $('.testimonials .active[data-tab]').attr('data-tab');
		tab_id--;

		if ($('.testimonials [data-tab=' + tab_id + ']').length === 0) {
			tab_id = 1;
		}

		if(tab_id === 1) {
			$('.testimonials .tab-prev').removeClass('active');
			$('.testimonials .tab-next').addClass('active');
		} else if (tab_id !== 1 && tab_id !== 4) {
			$('.testimonials .tab-prev').addClass('active');
			$('.testimonials .tab-next').addClass('active');
		}

		$('.testimonials .active[data-tab]').removeClass('active');
		$('.testimonials [data-tab="' + tab_id + '"]').addClass('active');

		var pic = $('.testimonials .mini-avatars .active img').attr('src');
		$('.testimonials .tab-content img').attr('src', pic);
	});

	// Табы по малому аватару

	$(document).on('click', '.testimonials .mini-avatars .avatars-item', function (e) {

		e.preventDefault();
		var tab_id = $(this).attr('data-tab');
		$('.testimonials .tabs-content .active[data-tab]').removeClass('active');
		$('.testimonials .mini-avatars .active[data-tab]').removeClass('active');
		$('.testimonials .tabs-content .tab-content[data-tab="' + tab_id + '"]').addClass('active');
		$('.testimonials .mini-avatars .avatars-item[data-tab="' + tab_id + '"]').addClass('active');

		var pic = $('.testimonials .mini-avatars .active img').attr('src');
		$('.testimonials .tab-content img').attr('src', pic);
	});

	// открытие модального окна блок our-team

	$(function () {
		$(document).on('click','.our-team .thumbnail', function () {
			$('.modal').addClass('active');
			var pic = $(this).html();
			$('.modal .photo').html(pic);
			$('.modal .photo .open-bg').css('display','none');
		});

		$(document).on('click', '.modal', function () {
			$('.modal').removeClass('active');
		});
	});

});
