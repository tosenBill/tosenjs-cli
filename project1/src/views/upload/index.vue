<template>
	<div>
		<input type="file" @change="handleFileChange" />
    <el-button @click="handleUpload">upload</el-button>
	</div>
</template>

<script>
	export default {
	data () {
		return {
			container: {
				file: null
			}
		}
	},
	mounted() {
	},
	computed: {
	},
	methods: {
		handleFileChange(e) {
			const [file] = e.target.files
			if (!file) return
			Object.assign(this.$data, this.$options.data())
			this.container.file = file
		},
		async handleUpload() {}
	}
}
</script>
