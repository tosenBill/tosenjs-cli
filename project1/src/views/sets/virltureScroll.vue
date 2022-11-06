<template>
	<div class="virlture-scroll">
		<div class="scroll-contain" @scroll="scrollHandle" ref="list">
			<div v-for="(item, index) in renderList" :key="index" class="item" :style="`height:${itemHeight}px;transform:translateY(${top}px)`">{{item}}</div>
		</div>
	</div>
</template>
<script>
export default {
	data () {
		return {
			list: [],
			renderList: [], // 渲染的列表
			start: 0, // 开始渲染的位置
			volume: 0, // 页面的容积:能装下多少个节点
			top: 0,
			itemHeight: 40, // 每一项的高度
			scroll: null
		}
	},
	mounted () {
		this.initList()
		this.$nextTick(() => { // 页面渲染完成后的回调
			const containerHeight = this.$refs.list.offsetHeight
			// 计算页面能容纳下几个节点并且设置四个节点作为冗余
			this.volume = Math.floor(containerHeight / this.itemHeight) + 4
			// 设置要渲染的列表 设置成能够容纳下的最大元素个数
			this.renderList = this.list.slice(0, this.volume)
      // 初始化节流函数 最短50毫秒触发一次
			this.scroll = this.throttle(this.onScroll, 50)
    })
	},
	methods: {
		scrollHandle(event) {
			this.scroll()
		},
		onScroll() {
			// scrollTop常量记录当前滚动的高度
      const scrollTop = this.$refs.list.scrollTop
			console.log(scrollTop)
			const start = this.getCurStart(scrollTop)
			// 对比上一次的开始节点 比较是否发生变化，发生变化后便重新渲染列表
			if (start !== this.start) {
				// 在这需要获得一个可以被itemHeight整除的数来作为item的偏移量
				const offsetY = scrollTop - (scrollTop % this.itemHeight)
				// 使用slice拿到需要渲染的那一部分
				this.renderList = this.list.slice(start, start + this.volume)
				// 这里的top用于设置translateY  transform:translateY(${top}px)
				this.top = offsetY
			}

			this.start = start
		},
		getCurStart(scrollTop) {
			// 卷进去了多少个元素item
			return Math.floor(scrollTop / this.itemHeight)
		},
		throttle(fn, delay) {
			let lock = false
			return (...args) => {
					if (lock) return
					// 进入加锁
					lock = true
					setTimeout(() => {
							fn.apply(this, args)
							// 执行完毕解锁
							lock = false
					}, delay)
			}
		},
		initList() {
      for (let i = 0; i < 10000; i++) {
				this.list.push(`这是第${i}行数据`)
			}
    }
	}
}
</script>
<style lang="stylus" scoped>
	.virlture-scroll{
		.scroll-contain{
			width: 300px;
			height:600px;
			margin: 50px 0 0 100px;
			overflow: scroll;
			border: 1px solid #eee;
			padding: 0 10px;
			text-align: center;
			.item{
				height: 40px;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				border-bottom: 1px solid #eee;
			}
		}
	}
</style>
