export default class Player {
  constructor(audio) {
    this.audio = audio;
  }

  play() {
    this.audio.play();
  }
  pause() {
    this.audio.pause();
  }
  load(){
    this.audio.load();
  }
  getDuration() {
    return this.audio.duration;
  }
  getCurrentTime() {
    return this.audio.currentTime;
  }
  musicTimeUpdate(callback) {
    this.audio.addEventListener("timeupdate", () => {
      const dur = this.getDuration();
      const curTime = this.getCurrentTime();
      const formatDur = this.formatDuration(dur);
      const formatCurTime = this.formatCurrentTime(curTime);

      callback && callback({
        dur,
        curTime,
        formatDur,
        formatCurTime
      });
    });
  }
  musicSeekTo(value) {
    if (value) {
      this.audio.currentTime = this.audio.duration * value;
    }
  }
  musicVolumeTo(value) {
    if (value) {
      this.audio.volume = value;
    }
  }
  parsingLyric(lyric) {
    const splitLyric = lyric.split('\n');
    const totalReg = /\[\d*:\d*\.\d*\]/g;
    const minuteReg = /\[\d*/;
    const secondReg = /:\d*/;
    const list = [];

    splitLyric.forEach(lyric => {
      const allTime = lyric.match(totalReg);
      if (!allTime) {
        return;
      }
      const songName = lyric.replace(allTime[0], '').trim();
      const minute = allTime[0].match(minuteReg)[0].substr(1);
      const second = allTime[0].match(secondReg)[0].substr(1);
      const time = parseInt(minute) * 60 + parseInt(second);

      list.push({ time, songName });
    })

    return list;
  }
  formatDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);

    return this.toTwo(minutes) + ':' + this.toTwo(seconds);
  }
  formatCurrentTime(current) {
    const minutes = Math.floor(current / 60);
    const seconds = Math.floor(current % 60);

    return this.toTwo(minutes) + ':' + this.toTwo(seconds);
  }
  toTwo(time) {
    return time < 10 ? '0' + time : time;
  }
}