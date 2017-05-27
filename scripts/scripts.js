$(document).ready(function() {

  setInterval(hideLoader, 500);

  let burger= $('.burger-container');

  burger.click(openMenu);

  function openMenu() {
    animateBurger();
    toggleOverlayer();
    bodyNoScroll();
  }

  function animateBurger(){
    burger.toggleClass('open');
  }

  function toggleOverlayer() {
    $('.menu-overlayer').toggleClass('open');
  }

  function bodyNoScroll() {
    $('body').toggleClass('no-scroll')
  }

  let ctx = document.getElementById("augusto-chart");

  let projectsSection= $('.projects-wrapper');
  let projectsSectionHeight = projectsSection.height();
  let initHeight = "1050px";
  let buttonViewMore= $(".buttons");

  projectsSection.css('height', initHeight);


  buttonViewMore.click(loadMoreWorks);

  //show loader in work-button, for 800ms only
  function loadMoreWorks(){
    $('.work-loader-wrapper').css('opacity', '1');
    setTimeout(showWorkLoader, 800);
  }

  function showWorkLoader(){
    //hide loader in work-button
    $('.work-loader-wrapper').css('opacity', '0');
    //if the button is clicked for the first time and there are more than 8 projects (2100px), show 4 more projects
    if(projectsSection.css('height') == initHeight && projectsSectionHeight > 2100){
      projectsSection.css('height', "2100px")
    }else{
    //if the button is clicked for a second time and there are no more projects to show, the button disappears
      projectsSection.css('height', projectsSectionHeight+"px")
      buttonViewMore.css('opacity','0');
      setTimeout(hideWorkButton, 800);
    }
  }

  function hideWorkButton() {
    buttonViewMore.css({'display': 'none'});
  }

  let data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "SKILLZ",
        backgroundColor: [
          'rgba(254, 230, 76, 0.8)'
        ],
        borderColor: [
          'rgba(254, 230, 76, 1)'
        ],
        borderWidth: 1,
        data: [6, 9, 7, 8, 7, 6, 7],
      }
    ]

  };
  let myRadarChart = new Chart(ctx, {
    type: 'radar',
    data: data,
    options: {
      legend: {
          position: "bottom"
      },
      scale: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 10,
          stepSize: 2
        },
        pointLabels: {
          fontSize: 14,
          fontColor: '797878'
        }
      }
    }
  });
  let modal = $('#myModal');
  let modalButton = $(".modalButton");
  let span = $(".close");
/*
  $('a[href^="#"]').on('click',function (e) {
     e.preventDefault();

     let target = this.hash;
     let $target = $(target);

     $('#page-augusto').stop().animate({
        'scrollTop': $target.offset().top
      }, 900, 'swing', function () {
        window.location.hash = target;
    });
  })
*/

  $('a[href^="#"]').on('click', function(event) {
    let target = $(this.getAttribute('href'));
    if( target.length ) {
      event.preventDefault();
      $('#page-augusto').stop().animate({
          scrollTop: target.offset().top
      }, 500);
    }
  });

  modalButton.click(function(e) {
    modal.addClass('show-modal');
    fillModal(e);
  });

  span.click(function() {
    modal.removeClass('show-modal');
  });


  $(window).click(function(e) {

    let target= $(e.target);

    if(target.hasClass("menu-item") || target.hasClass("menu-overlayer")){
      toggleOverlayer();
    }

    if (e.target == modal[0]) {
      modal.removeClass('show-modal');
    }
  })

  function fillModal(e){
    let originalModalInfo= e.target.parentNode.parentNode.parentNode;
    let modalInfo= $(originalModalInfo).clone();
    $(".modal-content").empty();
    $(".modal-content").append(modalInfo);
  }

  function hideLoader(){
    let loader= $('.loader-overlayer');
    loader.addClass('hide-loader');
  }
});
