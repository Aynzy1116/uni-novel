<template>
	<view>
		<view>个人</view>
		<button @getphonenumber="getPhoneNumber" open-type="getPhoneNumber" >授权登入</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			getPhoneNumber(e){
				console.log('e',e);
			}
		}
	}
</script>

<style>
</style>