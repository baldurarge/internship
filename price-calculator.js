$(function() {
  var rates = document.getElementById('theRates').innerHTML;
  var rates = JSON.parse(rates).rates;
  var DKKbaseRates = {
    DKK: 1,
    EUR: rates.EUR / rates.DKK,
    GBP: rates.GBP / rates.DKK,
    RUB: rates.RUB / rates.DKK,
    UAH: rates.UAH / rates.DKK
  };
  if (currentCurrency === 'DKK') {
    currentExchangedPrice = DKKbaseRates.DKK;
  } else if (currentCurrency === 'EUR') {
    currentExchangedPrice = DKKbaseRates.EUR;
  }

  printCurrency();
  scaleLogSlider();
  $(window).resize(function() {
    scaleLogSlider();
  });

  $('.calculate').click(function() {
    slideThatShitDown($('.calculateExpand'));
  });
  $('.calculate').on('mouseenter', function() {
    $(this)
      .find('img')
      .attr('src', '/img/svg/pris75hover2.png');
  });
  $('.calculate').on('mouseleave', function() {
    $(this)
      .find('img')
      .attr('src', '/img/svg/pris75.png');
  });

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function getMinuteAmountTotal() {
    var totalMinuteAmount = 0;
    var applicantAmount = Number($('.customizeExpand .applicantAmount').val());
    $('.customizeExpand .minuteAmount').each(function() {
      totalMinuteAmount = Number(totalMinuteAmount) + Number($(this).val());
    });
    return totalMinuteAmount * applicantAmount;
  }

  function getHrskyenMinuteAmountTotal() {
    var totalMinuteAmount = 0;
    var applicantAmount = Number($('.customizeExpand .applicantAmount').val());
    $('.customizeExpand .value')
      .not('.value.hourPay')
      .each(function() {
        totalMinuteAmount = Number(totalMinuteAmount) + Number($(this).text());
      });
    return totalMinuteAmount * applicantAmount;
  }

  function setResultTime() {
    var totalMinuteAmount = getMinuteAmountTotal();
    //var numberReqruitments = Number($('.inputRekrutteringer').val());
    var numberReqruitments = Number(
      $('.inputRekrutteringer').attr('data-unformattet')
    );
    var totalHours = Math.round(totalMinuteAmount / 60 * numberReqruitments);
    $('.ouput.Time').html(
      '<p>' + numberWithCommas(prefixNumber(totalHours)) + '</p>'
    );
    $('.ouput.Time').attr('data-unformattet', totalHours);
  }

  function setHrskyenResultTime() {
    var totalMinuteAmount = getHrskyenMinuteAmountTotal();
    var numberReqruitments = Number(
      $('.inputRekrutteringer').attr('data-unformattet')
    );
    var totalHours = Math.round(totalMinuteAmount / 60 * numberReqruitments);
    $('.ouput.Hrskyen').html(
      '<p>' + numberWithCommas(prefixNumber(-totalHours)) + '</p>'
    );
    $('.ouput.Hrskyen').attr('data-unformattet', totalHours);
  }

  function setWorkhoursSavings() {
    var clientHours = Number($('.ouput.Time').attr('data-unformattet'));
    var hrskyenHours = Number($('.ouput.Hrskyen').attr('data-unformattet'));
    var savings = clientHours - hrskyenHours;

    $('.timeOutput').text(numberWithCommas(savings));
    $('.timeOutput').attr('data-unformattet', savings);
  }

  function setHrskyenPrice() {
    var numRecruitments = Number(
      $('.inputRekrutteringer').attr('data-unformattet')
    );
    var price = 0;
    //Constant model
    if (numRecruitments <= 5) {
      price = 000000;
    }

    //Linear model
    else if (numRecruitments <= 20) {
      price = 00000000 * numRecruitments;
    }

    //Polynomial model
    else if (numRecruitments > 20) {
      price =
        000000 +
        0000000 * numRecruitments +
        0000000 * Math.pow(numRecruitments, 2);
    }

    $('.resultPrice').html(
      '<p>' + numberWithCommas(prefixNumber(-price)) + '</p>'
    );
    $('.resultPrice').attr('data-unformattet', price);
    $('.price').text(numberWithCommas(price));
    $('.price').attr('data-unformattet', price);
  }

  function setMoneySavings() {
    //arbejdsløn
    var savedWorkHours = Number($('.timeOutput').attr('data-unformattet'));
    var hourPay = $('input.hourPay').val();

    var costSavings = savedWorkHours * hourPay;
    $('.resultCash .ouput.Payment').html(
      '<p>' + numberWithCommas(prefixNumber(costSavings)) + '</p>'
    );
    //abonnoment
    var currentClientContract = parseInt($('input.inputSystem').val());
    //var hrskyenContract = Number($('.resultPrice').text());
    var hrskyenContract = showPrice
      ? Number($('.resultPrice').attr('data-unformattet'))
      : 0;

    // dif = 0;
    $('.resultCash .ouput.Subscription').html(
      '<p>' + numberWithCommas(prefixNumber(currentClientContract)) + '</p>'
    );
    //annoncering
    var pricePerAd = $('.inputAnnonce').val();
    //var numberAds = $('.inputRekrutteringer').val();
    var numberAds = Number($('.inputRekrutteringer').attr('data-unformattet'));
    var combined = pricePerAd * numberAds;
    $('.ouput.Ads').html(
      '<p>' + numberWithCommas(prefixNumber(combined)) + '</p>'
    );
    //result
    var combindedSavings =
      costSavings + currentClientContract + combined - hrskyenContract;

    $('.adsOutput').text(numberWithCommas(combindedSavings));
  }

  function prefixNumber(number) {
    if (number < 0) {
      number = number * -1;
      return '- ' + number;
    } else if (number > 0) {
      return '+ ' + number;
    } else {
      return '0';
    }
  }

  function scaleLogSlider() {
    //Calculate scaling factor for logarithmic function governing 'number of recruitments'
    minp = 1;
    maxp = $('.dragWidget').width() - $('#dragCloud').width();

    minv = Math.log(5); //Minimum 5 recruitments
    maxv = Math.log(1000); //Max 1000 recruitments
    scale = (maxv - minv) / (maxp - minp);
  }

  function doDrag() {
    var position = $('.selector').position();
    var oldrecruitments = $('.inputRekrutteringer');

    //Scale f(x) (numrecruitments) logarithmically (x=position.left)
    var recruitments = Math.exp(minv + scale * (position.left - minp));
    //console.log("Minp: " + minp + " maxp: " + maxp + " x: " + position.left +  " f(x): " + recruitments);

    //Skip further calculation when f(old_x) == f(new_x)
    if (Math.round(oldrecruitments) == Math.round(recruitments)) return;

    $('.current').text(Math.round(recruitments));
    $('.axisMark').css('width', position.left + 40 + 'px');

    $('.inputRekrutteringer').val(Math.round(recruitments));
    $('.inputRekrutteringer').attr(
      'data-unformattet',
      Math.round(recruitments)
    );
    doCalculations();
  }

  function autoDrag(dragTo, totalAnimationTime) {
    var counter = 0;
    var timeForEachStep =
      totalAnimationTime / Math.exp(1.01355 * Math.round(dragTo));
    var interval = setInterval(function() {
      document.getElementById('dragCloud').style.left = counter + 'px';
      doDrag();
      if (dragTo <= $('.inputRekrutteringer').val()) {
        clearInterval(interval);
      }
      counter += 4;
    }, timeForEachStep);
  }

  function doCalculations() {
    setResultTime();
    setHrskyenResultTime();
    setWorkhoursSavings();
    setHrskyenPrice();
    setMoneySavings();
  }

  // Init
  autoDrag(30, 1000);

  $(
    'input.applicantAmount, input.minuteAmount, input.inputAnnonce, input.inputSystem'
  ).on('change', function() {
    doCalculations();
  });

  $('input.hourPay').on('change', function() {
    $('.value.hourPay').text($(this).val());
    doCalculations();
  });

  $('.selector').draggable({
    containment: '.dragWidget',
    scroll: false,
    axis: 'x',
    drag: function() {
      doDrag();
    }
  });

  function slideThatShitDown(thisElem) {
    if (!thisElem.hasClass('beenThere')) {
      thisElem
        .css('height', '100%')
        .css('display', 'none')
        .slideDown('slow')
        .addClass('beenThere');
    }
  }

  $('.customize').on('click', function() {
    slideThatShitDown($('.customizeExpand'));
    $('.customizeExpand')
      .find('.border')
      .css('display', 'block');
    $(this).hide();
  });

  $('.calculateButton').on('click', function() {
    slideThatShitDown($('.result'));
    $(this).hide();
  });

  $('.open').on('click', function() {
    slideThatShitDown($('.resultExpand'));
    $(this).hide();
  });

  $('.slutBeregn').click(function() {
    $('.stepThree').slideDown();
  });

  document.getElementById('changeCurrency').onchange = function() {
    var index = this.selectedIndex;
    var inputText = this.children[index].innerHTML.trim();

    var firstI = document.getElementById('announceInput');
    var secondI = document.getElementById('hourlyRate');

    if (inputText == 'EUR') {
      currentCurrency = 'EUR';
      currentExchangedPrice = DKKbaseRates.EUR;
    } else if (inputText == 'DKK') {
      currentCurrency = 'DKK';
      currentExchangedPrice = DKKbaseRates.DKK;
    }

    // doCalculations();

    // doDrag();
    printCurrency();
  };

  function printCurrency() {
    var currencyElements = document.getElementsByClassName(
      'currency-printed-here'
    );
    for (let i = 0; i < currencyElements.length; i++) {
      currencyElements[i].innerHTML = currentCurrency;
    }
  }
});
