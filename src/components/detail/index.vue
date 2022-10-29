<template>
  <div style="width:100%;height:100%">
    <DetailHeader />
    <Content />
  </div>
</template>

<script>
import DetailHeader from './header';
import Content from './content';

export default {
  name: 'Common-Detail', 
  data() {
    return {

    };
  },
  methods: {

  },
  components:{
    DetailHeader,
    Content
  }
};
</script>

<style lang='less'>

</style>
