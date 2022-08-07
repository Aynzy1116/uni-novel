<template>
	<view>
		<u-navbar :title="title" title-width="400"></u-navbar>
		<view>详情</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				list:[]
			}
		},
		onLoad(option){
			
			this.list = JSON.parse(option.item)
			console.log('this.list ',this.list )
		}
	}
</script>

<style>
</style>