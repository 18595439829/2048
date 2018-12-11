<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p @click="pClick(item , index)"
       v-for="(item,index) in pList"
       :key="index">{{item.text}}</p>
       <p style="background-color: lightgrey;">
         <ol style="color:white">
           <li>lalalal</li>
         </ol>
       </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pList: [
        {
          id: '1',
          text: '第一段'
        },
        {
          id: '2',
          text: '第二段'
        },
        {
          id: '3',
          text: '第三段'
        }
      ]
    }
  },
  methods: {
    pClick(item, index) {
      console.log(item, index)
    }
  }
}
</script>
