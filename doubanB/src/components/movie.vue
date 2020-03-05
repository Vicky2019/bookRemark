<template>
  <div>
    <div class="swiper">
      <div>即将上线</div>
      <swiper :options="swiperOption" class="swiper-box">
        <swiper-slide
          style="display:flex;flex-direction:row;justify-content:space-around;padding:0 260px 0 260px;"
        >
          <router-link
            v-for="(v,index) in swipers.slice(0,4)"
            :key="index"
            :to="{path:'/detail',query:{id:v.id}}"
          >
            <img
              :src="'https://images.weserv.nl/?url='+v.images.small.substring(7)"
              class="swiper-img"
              style="height:160px;width:160;"
            />
          </router-link>
        </swiper-slide>
        <swiper-slide
          style="display:flex;flex-direction:row;justify-content:space-around;padding:0 260px 0 260px;"
        >
          <router-link
            v-for="(v,index) in swipers.slice(4,8)"
            :key="index"
            :to="{path:'/detail',query:{id:v.id}}"
          >
            <img
              :src="'https://images.weserv.nl/?url='+v.images.small.substring(7)"
              class="swiper-img"
              style="height:160px;width:160;"
            />
          </router-link>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="movie">
      <ul>
        <li class="item" v-for="(movie,index) in movieList" :key="index">
          <img :src="'https://images.weserv.nl/?url='+movie.images.small.substring(7)" />
          <p>{{movie.title}}</p>
          <p>评分：{{movie.rating.average}}</p>
          <router-link
            class="detail"
            style="color:blue"
            :to="{path:'/detail',query:{id:movie.id}}"
          >查看详情</router-link>
        </li>
      </ul>
      <p class="loadMore" @click="load">加载更多</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      movieList: [],
      start: 0,
      count: 20,
      pages: 1,
      swipers: [],
      swiperOption: {
        autoplay: true,
        speed: 3000,
        /* pagination: '.swiper-pagination', */
        paginationType: 'bullets',
        paginationClickable: true,
        autoplayDisableOnInteraction: true,
        loop: true
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.asyncCount = 5
    }, 1000)
  },
  created () {
    this.$jsonp(
      'http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&tdsourcetag=s_pcqq_aiomsg&qq-pf-to=pcqq.c2c&start=' +
        this.start +
        '&count=' +
        this.count
    ).then(data => {
      this.movieList = data.subjects
    })
    this.$jsonp(
      'http://api.douban.com/v2/movie/coming_soon?apikey=0df993c66c0c636e29ecbb5344252a4a&tdsourcetag=s_pcqq_aiomsg&qq-pf-to=pcqq.c2c&start=0&count=20'
    ).then(data => {
      this.swipers = data.subjects
    })
  },
  methods: {
    load () {
      this.pages++
      this.count = this.count * this.pages
      this.$jsonp(
        'http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&tdsourcetag=s_pcqq_aiomsg&qq-pf-to=pcqq.c2c&start=' +
          this.start +
          '&count=' +
          this.count
      ).then(data => {
        this.movieList = data.subjects
        console.log(this.movieList)
      })
    }
  }
}
</script>

<style scoped>
.swiper {
  background-image: url("../assets/swipe.png");
  padding: 60px 0 20px 0;
}
.swiper > div {
  margin-bottom: 10px;
  font-size: 24px;
  font-family: "Courier New", Courier, monospace;
}
.movie {
  padding: 10px 260px 0 260px;
}
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.movie ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0 auto;
}
.item img {
  width: 135px;
  height: 190px;
  margin: 0 auto;
}
.item {
  width: 220px;
  height: 300px;
  background-color: #fff;
  margin-bottom: 20px;
  padding-top: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px #bebebe;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.loadMore {
  width: 100px;
  line-height: 40px;
  margin: 0 auto;
  height: 35px;
  color: blue;
  border: 1px solid #e7e7e7;
  background-color: #f8f8f8;
}
.detail:hover,
.loadMore:hover {
  cursor: pointer;
}
</style>
