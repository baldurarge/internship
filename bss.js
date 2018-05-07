var myData = new Array();
var languge = 'da_DA';

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

var validate = function() {
  console.log('Here');
  setTimeout(function() {
    $('.send-button').removeClass('onclic');
    $('.send-button').addClass('validate');
    if (language == 'en_EN') {
      $('.send-button').html('Thank you for prioritizing');
    }
    if (language == 'da_DA') {
      $('.send-button').html('Tak for din prioritering');
    }
    $('.send-button').css('width', '310px');
  }, 2250);
};

var checkPrior = function(priority, mentorid, menteeid, matchmakerid) {
  console.log(priority, mentorid, menteeid, matchmakerid);

  myData = myData.filter(function(data) {
    return data.mentorid !== mentorid && data.priority !== priority;
  });

  myData.push({
    mentorid: mentorid,
    priority: priority,
    matchmakerid: matchmakerid,
    menteeid: menteeid
  });
  console.log(myData);
  if (language == 'da_DA') {
    $('.bottom-triangle').html('<p>Vælg<br>prioritet</p>');
    for (let i = 0; i < myData.length; i++) {
      $('#' + myData[i].mentorid).html(
        '<p><span class="bigger-number">' +
          myData[i].priority +
          '.</span><br>prioritet</p>'
      );
    }
  } else {
    $('.bottom-triangle').html('<p>Choose<br>priority</p>');
    for (let i = 0; i < myData.length; i++) {
      $('#' + myData[i].mentorid).html(
        '<p><span class="bigger-number">' +
          myData[i].priority +
          '.</span><br>priority</p>'
      );
    }
  }
};

$(document).ready(function() {
  var languageText = $('.bottom-triangle')[0];
  var languageText = $(languageText).children('p')[0].outerHTML;

  if (languageText == '<p>Vælg<br>prioritet</p>') {
    language = 'da_DA';
  } else {
    language = 'en_EN';
  }

  var mentorZIndex = 10;
  var domMentors = $('.each-mentor-around');
  var showSelect = false;

  for (let i = 0; i < domMentors.length; i++) {
    $(domMentors[i]).css('z-index', mentorZIndex - i);
  }

  $('.bottom-div').click(function() {
    if (
      $(this)
        .children('ul')
        .hasClass('show-now')
    ) {
      $(this)
        .children('ul')
        .removeClass('show-now');
    } else {
      $(this)
        .children('ul')
        .addClass('show-now');
    }
  });

  $('#slectList').click(function() {
    $(this).removeClass('show-now');
  });

  var menteeid = getUrlParameter('menteeid');
  var matchmakerid = getUrlParameter('matchmakerid');

  $('.select').click(function() {
    var found = false;
    var change = false;

    var value = $(this)
      .children('input')
      .val();
    $(this)
      .parents()
      .eq(1)
      .siblings('.bottom-triangle')
      .attr('value', value);

    var triangle = $(this)
      .parent()
      .parent()
      .parent();
    triangle = triangle.children('.bottom-triangle')[0];
    var triangleID = triangle.id;

    checkPrior(value, triangleID, menteeid, matchmakerid);
  });

  $('.send-button').click(function(event) {
    var sender = {};
    event.preventDefault();
    if (myData.length < 3) {
      console.log('please select');
      $('.alert-message').addClass('active');
      setTimeout(function() {
        $('.alert-message').removeClass('active');
      }, 6000);
    } else {
      myData.forEach(function(element) {
        $.ajax({
          type: 'POST',
          url: 'https://hr-skyen.dk/asdasdasdasd',
          data: element,
          datatype: 'json',
          success: function(dataString) {
            $('.send-button').addClass('onclic');
            validate();
            $('.flipInX').css('display', 'none', 'important');
            $('.bottom-div').css('cursor', 'default', 'important');
          }
        });
      });
    }
  });
});
