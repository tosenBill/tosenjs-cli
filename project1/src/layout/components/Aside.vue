<template>
    <el-aside id="siderBar" width="200px" :class="{'not-open':!sidebar, 'is-open': sidebar}">
      <el-menu
      class="el-menu-vertical"
			router
      @open="handleOpen"
      @close="handleClose"
      :unique-opened='true'
      :collapse="!sidebar"
      background-color="#545c64"
      text-color="#fff"
      :default-openeds="subMenuActive"
      :default-active="$route.path"
      active-text-color="#409EFF">
			<template v-for="(item, index) in navList">
				<!-- 判断是否只有一个节点 -->
        <el-menu-item v-if="!item.children" :index="item.path" :key="item.path">
          <i class="el-icon-setting"></i>
						<span slot="title">{{item.navName}}</span>
        </el-menu-item>
				<!-- 有children -->
				<el-submenu v-else class="nav-item" :index="item.path" :key="index">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span class="nav-title">{{item.navName}}</span>
					</template>
					<el-menu-item-group v-for="(child, i) in item.children" :key="i">
							<el-menu-item :index="child.link">{{child.name}}</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</template>

    </el-menu>
    </el-aside>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	data () {
		return {
			subMenuActive: [], // 一级菜单选中的菜单
			childMenuActive: '', // 二级菜单选中的菜单
			navList: [
				{
					path: '/set',
					navName: '设置',
					children: [
						{
							link: '/permission',
							name: '权限设置'
						},
						{
							link: '/notice',
							name: '通知设置'
						},
						{
							link: '/virltureScroll',
							name: '虚拟滚动'
						}
					]
				},
				{
					path: '/logistics',
					navName: '物流',
					children: [
						{
							link: '/look',
							name: '查看物流'
						},
						{
							link: '/sets',
							name: '发送物流'
						}
					]
				},
				{
					path: '/upload',
					navName: '上传文件'
				}
			]
		}
	},
	mounted() {
	},
	computed: {
		...mapGetters(['sidebar'])
	},
	methods: {
		handleOpen () {
		},
		handleClose () {},
		close () {}
	},
	watch: {
		$route: {
			handler (val) {
				console.log(this.$route)
				const { matched } = val
				this.subMenuActive = [matched[0].path || '/set']
			},
			immediate: true
		}
	}
}
</script>

<style lang="stylus" scoped>
	#siderBar{
		background:#545c64;
		transition: width .8s;
		&.not-open{
			width: 65px !important;
			overflow-x: hidden;
		}
		&.is-open{
			width: auto;
		}
		.el-menu-vertical:not(.el-menu--collapse) {
			width: 200px;
			min-height: 400px;
		}
		.el-menu-vertical{
			border-right none
		}
		.nav-item >div:hover{
			.nav-title, i{
				color #409eff
			}
		}
		.active {
			background-color: $tabColor;
			color: #fff;
			border-color: $tabColor;
			&::before {
				content: "";
				background: #fff;
				display: inline-block;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				position: relative;
				margin-right: 2px;
			}
		}
	}
</style>
