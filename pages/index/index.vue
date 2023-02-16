<template>
	<view class="page">
		<view class="flex">
			<view>
				<view class="left-bar" @click="changeCategory(item,index)" v-for="(item,index) in category" :key="index"
					:class="[currentIndex==index?'left-bar-bg':'']">{{item}}</view>
			</view>
			<scroll-view scroll-y='true' style="height: calc(100vh);width: 100%;">
				<view class="flex justify-between flex-wrap padding-lr-10">
					<block v-for="(item,index) in list" :key="index">
						<view class="flex-column justify-center align-center" style="width: 48%;" :style="{margin:(index!=0&&index!=1)?'10rpx 0':'0'}" @click="goDetail(item)">
							<image class="image" src="../../static/suolong.jpg" mode=""></image>
							<view class="text-center text-hidden">{{item}}</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0,
				category: ['全部', '玄幻', '修真', '都市', '穿越', '网游', '科幻', '完本', '其他'],
				list: ['齐天大圣','小阿狸的天空','我是大富翁','狂野飙车','厨神小度','阿道夫','天空飘来五个字，那都不是事','黑核','我们的青春'],
			}
		},
		onLoad() {
			
		},
		methods: {
			changeCategory(item,index){
				this.currentIndex = index
			},
			goDetail(item){
				
			}
		}
	}
</script>


<style scoped lang="scss">
	.left-bar {
		width: 100rpx;
		height: 100rpx;
		color: black;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.left-bar-bg {
		color: white;
		box-shadow: 0px 1px 1px 0px #d2b4b4;
		background-color: #f4a8a8
	}

	.image {
		width: 100%;
		height: 360rpx
	}

	.text-hidden {
		width: 100%;
		overflow: hidden;
		// white-space: nowrap;
		text-overflow: ellipsis
	}
</style>
