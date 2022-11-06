<template>
	<div>
		<input type="file" @change="handleFileChange" />
    <el-button @click="handleUpload">upload</el-button>
	</div>
</template>

<script>
	const SIZE = 10 * 1024 * 10

	import { request } from '@/utils'
	export default {
	data () {
		return {
			container: {
				file: null
			},
			data: []
		}
	},
	mounted() {
	},
	computed: {
	},
	methods: {
		handleFileChange(e) {
			const [file] = e.target.files
			console.log('file', file)
			if (!file) return
			Object.assign(this.$data, this.$options.data())
			this.container.file = file
		},
		// 生成切片文件
		createFileChunk(file, size = SIZE) {
			const fileChunkList = []
			let cur = 0
			while (cur < file.size) {
				fileChunkList.push({ file: file.slice(cur, cur + size) })
				cur += size
			}
			return fileChunkList
		},
		async handleUpload() {
			if (!this.container.file) return
			const fileChunkList = this.createFileChunk(this.container.file)
			this.data = fileChunkList.map(({ file }, index) => ({
				chunk: file,
				// 文件名 + 数组下标
				hash: this.container.file.name + '-' + index
			}))
			await this.uploadChunk()
		},
		// 上传切片
		async uploadChunk() {
			const requstList = this.data.map(({ chunk, hash }) => {
				const formData = new FormData()
				formData.append('chunk', chunk)
				formData.append('hash', hash)
				formData.append('filename', this.container.file.name)
				return { formData }
			}).map(({ formData }) =>
				(request({ url: 'http://localhost:3000', data: formData }))
			)

			console.log('requstList', requstList)

			// 并发请求
			await Promise.all(requstList)
			// 合并切片
			await this.mergeRequst()
		},
		async mergeRequst() {
			await this.request({
				url: 'http://localhost:3000/merge',
				headers: {
					'content-type': 'application/json'
				},
				data: JSON.stringify({
					filename: this.container.file.name
				})
			})
		}
	}
}
</script>
