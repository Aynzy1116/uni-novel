<template>
	<view class="uni-row bg-main">
		<view class="uni-column bg">
			<view class="left-bar" @click="changeCategory(item,index)" v-for="(item,index) in category" :key="index"
				:class="[currentIndex==index?'left-bar-bg':'']">{{item}}</view>
		</view>
		<view class="uni-row justify-around wrap">
			<view class="item" v-for="(item,index) in list" :key="index" @click="goDetail(item)">
				<image class="image" :src="item.image" />
				<view class="text-center padding-sm text-hidden">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0,
				category: ['全部', '玄幻', '修真', '都市', '穿越', '网游', '科幻', '完本', '其他'],
				list: [],
			}
		},
		onLoad() {
			this.changeCategory('全部', 0)
		},
		methods: {
			changeCategory(cate, index) {
				this.currentIndex = index
				let url = `http://39.96.77.250/view/bookList?category=${index}&size=10&page=1`
				if (index == 0) url = `http://39.96.77.250/view/bookList?&size=10&page=1`
				uni.request({
					url: url,
					mothed: "GET",
					success: (res => {
						// console.log(res)
						this.list = res.data.result
						console.log(this.list)
					})
				})
			},
			goDetail(item) {
				uni.navigateTo({
					url: `detail?item=${JSON.stringify(item)}`
				})
			}
		}
	}
</script>


<style scoped lang="scss">
	@import url("@/common/uni.scss");
	@import "@/components/color-ui/main.css";

	.left-bar {
		width: 100rpx;
		height: 100rpx;
		color: black;
		justify-content: center;
		text-align: center;
	}

	.left-bar-bg {
		color: white;
		box-shadow: 0px 1px 1px 0px #d2b4b4;
		background-color: blue
	}

	.item {
		padding: 10rpx;
		width: 300rpx;
		height: 400rpx;
	}

	.image {
		width: 100%;
		height: 100%;
	}

	.text-hidden {
		width: 100%;
		overflow: hidden;
		// white-space: nowrap;
		text-overflow: ellipsis
	}

	.bg-main {
		background-color: #fdefe7;
	}
</style>
