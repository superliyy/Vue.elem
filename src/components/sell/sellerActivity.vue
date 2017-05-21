<template>
	<transition enter-active-class="fadeIn sell-animated" leave-active-class="fadeOut sell-animated">
		<div class="activity-page">
			活动
			
			<div class="cancel" @click="cancelAction()">取消</div>
			
		</div>
	</transition>
	
	
</template>

<script>
export default {
	methods:{
		cancelAction(){
			this.$emit('hide-page');
		}
	}
}
	
	
</script>

<style>
.activity-page{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #262626;
}	
	
.activity-page .cancel{
	color: #fff;
	position: absolute;
	bottom: 40px;
	left: 50%;
	transform: translateX(-50%);
	font-size: 20px;
	padding: 20px;
}	
</style>