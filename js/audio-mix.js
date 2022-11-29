import {
  music
} from './music.js';

let btnStart = document.querySelector('.btn-start');
let leftElem = document.querySelector('.left-element');
let rightElem = document.querySelector('.right-element');
let wrapperStart = document.querySelector('.start-wrapper');
let titleStart = document.querySelector('.title-start');
let wrapper = document.querySelector('.wrapper');
let dropOne = document.querySelector('.drop-one__box');
let dropTwo = document.querySelector('.drop-two__box');

let melodyTitle = document.querySelector('.some-melody__name');
let melodyHidden = document.querySelector('.some-melody__hidden');
let titleLevel = document.querySelector('.some-melody__level-name');
let valueLine = document.querySelector('.player-range div');
let melodies = document.querySelectorAll('.melody-list__item');

let gideDescr = document.querySelector('.gide');
let melodyDescrBox = document.querySelector('.description-player');
let titleDescr = document.querySelector('.description-title');
let audioTwoDescr = document.querySelector('.audio-two');
let imgDescr = document.querySelector('.description-img');
let textDescr = document.querySelector('.description-text');
let flexboxDescr = document.querySelector('.description-text__flexbox');

let audio = document.querySelector('audio');
let cover = document.querySelector('.some-melody__img');
let playPauseIcon = document.querySelector('.play-pause');

let melodyListBoxes = document.querySelectorAll('.melody-list__box');
let btnNext = document.querySelector('.button');
let win = document.querySelector('.win');
let wrong = document.querySelector('.wrong');
let totalScore = document.querySelector('.total-score span');
let levelScore = document.querySelector('.level-score span');
let finish = document.querySelector('.finish-wrapper');
let btnFinish = document.querySelector('.btn-finish');
let titleFinish = document.querySelector('.title-finish');
let titleFinishSpan = document.querySelector('.title-finish span');
let leftElemFinish = document.querySelector('.left-element-finish');
let rightElemFinish = document.querySelector('.right-element-finish');
let isWin = false;
//функция запускающая викторину
btnStart.addEventListener('click', function () {
  leftElem.classList.add('left-elem-move');
  rightElem.classList.add('right-elem-move');
  setTimeout(function () {
    wrapperStart.classList.add('wrapper-hidden');
  }, 1500);
  btnStart.classList.add('button-move');
  titleStart.classList.add('title-move');
  wrapper.classList.remove('wrapper-hidden');
  dropOne.classList.remove('wrapper-hidden');
  dropTwo.classList.remove('wrapper-hidden');
});
let arrResalts = [];
//функция создающая новый муз блок с рандомным номером
function melodyMix(elem, num) {
  audio.src = `./assets/media/${elem}/${elem}_${num}.mp3`;
  audio.type = 'audio/mpeg';
  let flag = `${elem}_${num}`; //спец элемент для формирования названия файла

  let resalt = 0;
  let count = 5;

  //Угадываем выпавшую при рандоме мелодию
  melodyListBoxes.forEach(function (melodyList) {
    melodyList.addEventListener('click', function (item) {
      let action = item.target.dataset.name;
      console.log(isWin);

      //формируем информацию в блое gide
      for (let key in music[elem]) {
        if (action == [key][0]) {

          audioTwoDescr.src = music[elem][key].source;
          titleDescr.textContent = music[elem][key].title;
          textDescr.textContent = music[elem][key].text;
          imgDescr.src = music[elem][key].image;
          imgDescr.alt = music[elem][key].alt;
        }
      }

      if (action == flag && !isWin) {
        //Если мелодия совпадает музыка останавливается в кружке появляется картинка, 
        audio.pause();
        playStatus = false;
        win.play();
        wrong.pause();
        cover.classList.remove('playing');
        cover.style.background = `url(./assets/images/${elem}/${flag }.jpg)`;
        cover.style.backgroundSize = 'cover';
        cover.style.backgroundRepeat = 'no-repeat';
        cover.style.backgroundPosition = 'center';

        // название мелодии в блоке some-melody__name
        melodyHidden.classList.add('hidden-name');
        melodyTitle.innerHTML = item.target.textContent;
        melodyTitle.classList.remove('hidden-name');
        playPauseIcon.className = 'fas fa-play';

        //название в блоке melody-list__box светится зелёным или другим цветом,
        item.target.style.background = '#33CCCC';
        btnNext.disabled = false;
        btnNext.style.background = '#33CCCC';

        isWin = true;
        resalt = count;
        arrResalts.push(resalt);
      } else if (action != flag && !isWin) {
        //Если не угадываем мелодию, музыка продолжает играть,
        //название в блоке melody-list__box светится розовым,
        item.target.style.background = '#f5ae6a';
        wrong.play();
        count--;
        if (count <= 0) {
          count = 0;
        }
      }

      gideDescr.classList.add('hidden-name');
      melodyDescrBox.classList.remove('hidden-name');
      flexboxDescr.classList.remove('hidden-description');
      flexboxDescr.classList.add('visible-description');

      //Формируем счёт
      let sum = 0;
      for (var i = 0; i < arrResalts.length; i++) {
        sum += arrResalts[i];
        console.log(`"sum =" ${sum}`);
        if (sum == 30) {
          titleFinish.textContent = "Вы набрали максимум баллов: 30";
        }
        if (sum == 0) {
          titleFinish.textContent = "Ой! Вы ничего не угадали";
        }
      }

      levelScore.textContent = count;
      totalScore.textContent = sum;
      titleFinishSpan.textContent = sum;
      // if (sum == 30) {
      //   titleFinish.textContent = "Вы набрали максимум баллов: 30";
      // }
      // if (sum == 0) {
      //   titleFinish.textContent = "Ой! Вы ничего не угадали";
      // }

    });

  });
}

//Работа с кнопкой Next
let melodyListArr = ['level-zero', 'level-one', 'level-two', 'level-three', 'level-four', 'level-five'];
let navItems = document.querySelectorAll('.film-elem');
let count = 0;
let playStatusTwo = false;
let playStatus = false;

btnNext.addEventListener('click', function (e) {
  e.preventDefault();
  if (playStatus === true) {
    playStatus = false;
  }
  isWin = false;
  levelScore.textContent = "";
  valueLine.style.left = 0;
  btnNext.style.background = 'rgba(255, 255, 255, 0.26)';
  melodyHidden.classList.remove('hidden-name');
  melodyTitle.classList.add('hidden-name');
  cover.style.background = "url('./assets/images/some-melody-img.jpg')";
  cover.style.backgroundSize = 'cover';
  cover.style.backgroundRepeat = 'no-repeat';
  cover.style.backgroundPosition = 'center';
  gideDescr.classList.remove('hidden-name');
  titleDescr.textContent = "";
  melodyDescrBox.classList.add('hidden-name');
  flexboxDescr.classList.remove('visible-description');
  flexboxDescr.classList.add('hidden-description');
  audioTwoDescr.src = "";
  imgDescr.src = "";
  imgDescr.alt = "";
  textDescr.textContent = "";

  count++;
  if (count == 6) {
    btnNext.disabled = true;
    btnNext.style.background = 'rgba(255, 255, 255, 0.26)';
  }


  //смена уровней викторины
  melodyListBoxes.forEach(function (itemList) {

    if (itemList.classList.contains(melodyListArr[count]) == true) {
      itemList.classList.remove('melody-list__box--disactive');

      if (itemList.classList.contains('level-one') == true) {
        titleLevel.textContent = 'Мелодии из сериалов 2000 - 2022';
        melodyMix('level-one', random(0, 6));
      }
      if (itemList.classList.contains('level-two') == true) {
        titleLevel.textContent = 'Мелодии из сериалов 90-х';
        melodyMix('level-two', random(0, 6));
      }
      if (itemList.classList.contains('level-three') == true) {
        titleLevel.textContent = 'Мелодии из фильмов СССР';
        melodyMix('level-three', random(0, 6));
      }
      if (itemList.classList.contains('level-four') == true) {
        titleLevel.textContent = 'Мелодии из фильмов ХХ века';
        melodyMix('level-four', random(0, 6));
      }
      if (itemList.classList.contains('level-five') == true) {
        titleLevel.textContent = 'Угадай голос';
        melodyMix('level-five', random(0, 6));
        btnNext.textContent = "Посмотреть результат";
        if (btnNext.textContent == "Посмотреть результат") {
          btnNext.addEventListener('click', function () {

            finish.classList.remove('wrapper-hidden');
            leftElemFinish.classList.add('finish-left-elem-move');
            rightElemFinish.classList.add('finish-right-elem-move');
            btnFinish.classList.add('finish-button-move');
            titleFinish.classList.add('finish-title-move');
            wrapper.classList.add('wrapper-hidden');
          });
        }

      }
    } else {
      itemList.classList.add('melody-list__box--disactive');
    }


  });


  //смена активного сниля в блоке nav
  navItems.forEach(function (itemNav) {
    if (itemNav.classList.contains(melodyListArr[count]) == true) {
      itemNav.classList.add('active');
    } else {
      itemNav.classList.remove('active');
    }
  });

  btnNext.disabled = true;
});

btnFinish.addEventListener('click', function () {
  window.location.reload();
  finish.classList.add('wrapper-hidden');
});

melodyListBoxes.forEach(function (itemList) {
  if (itemList.classList.contains('melody-list__box--disactive') == false && itemList.classList.contains('level-zero') == true) {
    melodyMix('level-zero', random(0, 6));
  }
});

function random(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

//Функции для включения плеера в блоке gide
let playPauseIconTwo = document.querySelector('.play-pause-two');

playPauseIconTwo.addEventListener('click', function () {
  playPauseTwo();

});

function playPauseTwo() {
  if (playStatusTwo === false) {
    playPauseIconTwo.className = 'fas fa-pause';
    audioTwoDescr.play();
    playStatusTwo = true;
  } else {
    playPauseIconTwo.className = 'fas fa-play';
    audioTwoDescr.pause();
    playStatusTwo = false;
  }
}

//Функция для запуска основного аудиоплеера
playPauseIcon.addEventListener('click', function () {
  playPause();
  // console.log(playStatus);
});

function playPause() {
  if (playStatus === false) {
    playPauseIcon.className = 'fas fa-pause';
    audio.play();
    cover.classList.add('playing');
    playStatus = true;
  } else {
    playPauseIcon.className = 'fas fa-play';
    audio.pause();
    cover.classList.remove('playing');
    playStatus = false;
  }
}

// Функция управления звуком
let volume = document.querySelector('.sound-control input');
volume.addEventListener('change', function () {
  audio.volume = volume.value / 100;
});

//Функция подсчёта времени
function timeFormat(time) {
  return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
}

//Функция выведения времени
const durationInput = document.querySelector('.player-range__box input');
const currentTime = document.querySelector('.timer__box span');

audio.addEventListener('loadedmetadata', function () {
  const endTime = document.querySelector('.timer__box span:last-child');
  durationInput.value = audio.currentTime;
  durationInput.setAttribute('max', audio.duration);
  currentTime.innerText = `${timeFormat(audio.currentTime)}`;
  endTime.innerText = `${timeFormat(audio.duration)}`;
});
audio.addEventListener('timeupdate', function () {
  durationInput.value = audio.currentTime;
  currentTime.innerText = `${timeFormat(audio.currentTime)}`;
  document.querySelector('.player-range__box .player-range div').style.left = `${
    (audio.currentTime / audio.duration) * 100
  }%
`;
});

durationInput.addEventListener('change', function () {
  audio.currentTime = durationInput.value;
});

console.log("Общий балл за выполненные пункты - 230\n\nВыполненные пункты: \n1. стартовая страница приложения (вёрстка адаптивная - проверяется на ширине от 1920рх до 360рх) +20 \n2. страница викторины (вёрстка адаптивная - проверяется на ширине от 1920рх до 360рх) +30 \n3. у кастомного аудиоплеера из предыдущего пункта есть регулятор громкости звука +30 \n4. текущий вопрос выделяется стилем +10 \n5. подстановка дефолтного изображения и замена названия птицы на символы (***), пока игрок не выберет правильный ответ +10 \n6. при выборе правильного ответа в блоке с вопросом отображается изображение и название загаданной птицы +10 \n7. цветовая индикация правильного/неправильного ответа в виде индикаторов разного цвета рядом с названием птицы: +10 \n8. при выборе правильного или неправильного ответа издаются разные звуковые сигналы: +10 \n9. при выборе неправильного ответа проигрывание аудиоплеера не должно останавливаться: +10\n10. при выборе правильно ответа проигрывание аудиоплеера должно остановиться: +10\n11. при клике по названию птицы в блоке с описанием птицы отображается информацию о ней: +10\n12. пока игрок не кликнул по названию птицы из списка, в блоке выводится короткий текст с предложением послушать плеер и выбрать название птицы, чей голос прозвучал +10\n13. при клике по названию птицы из списка, в блоке с описанием птицы появляется актуальная информация о ней +20\n14. пока не выбран правильный ответ, кнопка не активна, нет возможности перейти к следующему заданию. Активное и неактивное состояние кнопки визуально отличаются, например, активная кнопка имеет зеленый, не активная - серый цвет +10\n15. правильное отображение счета игры +10\n16. после правильного ответа на последний вопрос игрок переходит к странице с результатами викторины +10\n17. страница с результатами содержит количество набранных баллов и кнопку с предложением сыграть ещё раз (или уведомление об окончании игры, если набрано максимальное количество баллов) +10\n\nНевыполненные пункты: \n 1. если правильный ответ уже дан, возможность просматривать описания птиц при клике по вариантам ответов остаётся, цвет индикаторов при этом не изменяется: -10\n2. локализация приложения на два языка, выбранный язык хранится в local storage и сохраняется при перезагрузке -10\n3. создание галереи всех птиц приложения c информацией о них (фото, аудио, название, описание) -10");