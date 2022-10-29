export default class Progress {
  constructor(options = {}) {
    const { progressBar, progressLine, progressDot } = options;
    this.progressBar = progressBar;
    this.progressLine = progressLine;
    this.progressDot = progressDot;
    this.isMove = false;
  }

  progressClick(callback) {
    const self = this;
    this.progressBar.addEventListener('click', function (e) {
      const normalLeft = this.offsetLeft;
      const event = e || window.event;
      const eventLeft = event.pageX;
      self.progressLine.style.width = eventLeft - normalLeft + 'px';

      const value = (eventLeft - normalLeft) / this.offsetWidth;
      callback && callback(value);
    })
  }

  progressDrag(callback) {
    const self = this;
    let diff;

    this.progressBar.ontouchstart = function (e) {
      e.stopPropagation();
      self.isMove = true;
      const normalLeft = this.offsetLeft;

      this.ontouchmove = function (e) {
        e.stopPropagation();
        const event = e || window.event;
        const eventLeft = event.targetTouches[0].pageX;
        diff = eventLeft - normalLeft;

        if (diff >= self.progressBar.offsetWidth - self.progressDot.offsetWidth) {
          diff = self.progressBar.offsetWidth - self.progressDot.offsetWidth;
        }

        self.progressLine.style.width = diff + 'px';
      }
    }

    this.progressBar.ontouchend = function (e) {
      document.ontouchmove = null;
      self.isMove = false;

      const value = (diff) / self.progressBar.offsetWidth;
      callback && callback(value);
    }
  }

  setProgress(value) {
    if (this.isMove) {
      return;
    }
    if (value < 0 || value > 100) {
      return;
    }

    this.progressLine.style.width = value + '%';
  }
}