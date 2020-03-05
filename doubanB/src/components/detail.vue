<template>
  <div class="content">
    <img :src="'https://images.weserv.nl/?url='+movie.images.small.substring(7)" />
    <ul class="right">
      <li class="title">{{movie.title}}</li>
      <li>
        <div>类别：</div>
        <div class="kind" v-for="(kind,index) in kind" :key="index">{{kind}}</div>
      </li>
      <li>
        <div>主演：</div>
        <div class="kind" v-for="(actor,index) in actor" :key="index">{{actor.name}}</div>
      </li>
      <li>导演：{{movie.directors[0].name}}({{movie.directors[0].name_en}})</li>
      <li>
        <p
          style="display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden;"
        >简介：{{movie.summary}}</p>
      </li>
    </ul>
    <div class="for-comment">
      <div class="comment">热门评论</div>
      <div class="author" v-for="(item,index) in comments" :key="index">
        <div class="author-name">
          <div style="margin-right:20px;">{{item.author.name}}</div>
          <div>{{item.created_at}}</div>
        </div>
        <p style="line-height: 30px;text-align:left;text-indent:2em;">{{item.content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      movie: {},
      actor: [],
      kind: [],
      comments: [],
      start: 0,
      count: 10000,
      pages: 1,
      id: ''
    }
  },
  created () {
    this.getRouterData()
  },
  methods: {
    getRouterData () {
      this.id = this.$route.query.id
      this.$jsonp(
        'http://api.douban.com/v2/movie/subject/' +
          this.id +
          '?apikey=0df993c66c0c636e29ecbb5344252a4a&tdsourcetag=s_pcqq_aiomsg&qq-pf-to=pcqq.c2c&start=' +
          this.start +
          '&count=' +
          this.count
      ).then(data => {
        this.movie = data
        this.actor = this.movie.casts
        this.kind = this.movie.genres
      })
      this.$jsonp(
        'http://api.douban.com/v2/movie/subject/' +
          this.id +
          '/comments?apikey=0df993c66c0c636e29ecbb5344252a4a&tdsourcetag=s_pcqq_aiomsg&qq-pf-to=pcqq.c2c&start=' +
          this.start +
          '&count=' +
          this.count
      ).then(data => {
        this.comments = data.comments
      })
    }
  }
}
</script>

<style scoped>
div {
  display: inline-block;
}
.content {
  padding: 70px 260px 0 260px;
}
li {
  list-style: none;
  font-size: 20px;
  margin-bottom: 10px;
}
img {
  width: 210px;
  height: 296px;
  float: left;
  margin-left: 20px;
}
.right {
  width: 76%;
  display: flex;
  float: left;
  text-align: left;
  flex-direction: column;
  justify-content: space-between;
}
.right li div {
  display: inline;
}
.title {
  font-weight: 700;
  font-size: 50px;
  font-family: ;
}
.kind {
  margin-right: 10px;
}
.for-comment {
  float: left;
  margin-left: 20px;
  padding-top: 10px;
}
.for-comment div {
  padding-top: 0;
}
.comment {
  float: left;
  font-size: 25px;
  font-weight: 700;
}
.for-comment .author {
  display: flex;
  padding-top: 10px;
  width: 100%;
  float: left;
  flex-direction: column;
  border-top: 1px solid #eee;
}
.author-name {
  text-align: left;
  display: flex;
  flex-direction: row;
}
</style>
