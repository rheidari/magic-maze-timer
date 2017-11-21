var app = {
  els: {
    body: null,
    timer: null,
    start: null,
    reset: null,
    flip: null
  },

  sounds: {
    beep: null,
    gameover: null,
    start: null
  },

  _timer: 180,
  _tickInterval: null,

  _clear: function () {
    clearInterval(this._tickInterval);
  },

  startTimer: function (play) {
    this._clear();
    this._tickInterval = setInterval(this.updateTimer.bind(this), 1000);
    this.els.flip.show();
    this.els.reset.show();
    this.els.start.hide();
    if (play) {
      this.sounds.start.play();
    }
  },

  flipTimer: function () {
    this._clear();
    this._timer = 181 - this._timer;
    this.updateTimer();
    this.startTimer();
  },

  reset: function () {
    this._clear();
    this._timer = 181;
    this.updateTimer();
    this.els.start.show();
    this.els.flip.hide();
    this.els.reset.hide();
  },

  setupHandlers: function () {
    this.els.start.on('click', this.startTimer.bind(this, true));
    this.els.flip.on('click', this.flipTimer.bind(this));
    this.els.reset.on('click', this.reset.bind(this));
  },

  updateTimer: function () {
    this._timer--;
    var minutes = parseInt(this._timer / 60);
    var seconds = '0' + (this._timer % 60);
    this.els.timer.html(minutes + ':' + seconds.slice(-2));

    this.updateBg();
    if (this._timer > 0 && this._timer <= 10) {
      this.sounds.beep.play();
    }

    if (this._timer == 0) {
      this.gameOver();
    }
  },

  updateBg: function () {
    if (this._timer <= 60) {
      this.els.body.attr('class', 'danger');
    } else if (this._timer < 120) {
      this.els.body.attr('class', 'warn');
    } else {
      this.els.body.attr('class', 'ok');
    }
  },

  init: function () {
    this._timer = 180;

    this.els.body = $('body');
    this.els.timer = $('#timer');
    this.els.start = $('.start');
    this.els.reset = $('.reset');
    this.els.flip = $('.flip');

    this.sounds.beep = new Audio('audio/beep.mp3');
    this.sounds.gameover = new Audio('audio/gameover.wav');
    this.sounds.start = new Audio('audio/start.mp3');

    this.setupHandlers();
  },

  gameOver: function () {
    this._clear();
    this.sounds.gameover.play();
  }
};

app.init();
