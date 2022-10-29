import $clamp from 'clamp-js';

const Clamp = () => { };

Clamp.install = Vue => {
  if (Clamp.install.installed) {
    return;
  }
  Clamp.install.installed = true;

  Vue.mixin({
    methods: {
      clamp(ele, raw) {
        Array.isArray([].slice.call(ele)) ?
          ele.forEach(item => $clamp(item, { clamp: raw || 1 }))
          :
          $clamp(ele, { clamp: raw || 1 })
      }
    }
  });
}

export default Clamp;