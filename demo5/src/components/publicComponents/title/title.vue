<template>
  <div class="title">
    <div class="advTitle blackTex2 font26">{{titleData.title}}</div>
    <div class="enTitle font20" :class="titleData.colorClass">{{titleData.enTitle}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: ["titleData"],
    data(){
      return {}
    }
  }
</script>

<style scoped>
  .advTitle {
    font-weight: 500;
  }

  .blackTex2 {
    color: #1e1e1e;
  }

  .enTitle {
    color: #747475;
    font-weight: 200;
    padding-top: 10px;
  }

  .enTitle:after {
    display: block;
    content: "";
    position: relative;
    width: 42px;
    height: 4px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    bottom: -30px;
  }

  .blueColor:after {
    background: #3a9cf5;
  }
  .blueColor1:after{
    background: #4CA5F5;
  }

  @media only screen and (max-width: 798px) {
    .advTitle {
      font-size: 18px;
    }

    .enTitle {
      font-size: 12px;
    }

    .enTitle:after {
      bottom: -10px;
    }

  }
</style>
