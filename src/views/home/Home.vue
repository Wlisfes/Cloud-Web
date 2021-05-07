<script>
import { defineComponent, reactive, onMounted } from 'vue'
import DPlayer from 'dplayer'
import flvjs from 'flv.js'
import { Button } from 'ant-design-vue'

export default defineComponent({
	name: 'Home',
	setup() {
		const state = reactive({
			flv:
				'https://cloud.lisfes.cn/customerTrans/7cfb694d9456cc5369e984004d41957f/2b9a89d6-178fdf22d0a-0005-5c87-c9a-697bc.flv',
			url:
				'https://cloud.lisfes.cn/8e9070ddc9c542829e41ee21b0a3c3de/63e7f3a43e4442fd8ec1d4dd43fb39cc-3cf2cb2c9aff46bbee33a8ba27aee685-hd.mp4'
		})

		onMounted(() => {
			// initPlayer()
		})

		const initPlayer = () => {
			new DPlayer({
				container: document.querySelector('#player'),
				theme: '#fb7299',
				video: {
					url: state.flv,
					type: 'customFlv',
					highlight:
						'https://cloud.lisfes.cn/8e9070ddc9c542829e41ee21b0a3c3de/snapshots/c167ca71ad0d4e38bb27b1e7215fe239-00001.jpg',
					customType: {
						customFlv: (video, player) => {
							const flvPlayer = flvjs.createPlayer({
								type: 'flv',
								url: video.src
							})
							flvPlayer.attachMediaElement(video)
							flvPlayer.load()
						}
					}
				}
			})
		}

		return () => {
			return (
				<div class="app-conter">
					<div id="player"></div>
				</div>
			)
		}
	}
})
</script>

<style lang="less" scoped>
.app-conter {
	display: flex;
	flex-direction: column;
	#player {
		width: 960px;
		height: 540px;
		margin: 0 auto;
		cursor: pointer;
		::v-deep(.dplayer-controller) {
			opacity: 1;
			padding: 0;
		}
		::v-deep(.dplayer-bar-wrap) {
			width: 100%;
		}
		&.dplayer-hide-controller {
			::v-deep(.dplayer-controller) {
				transform: translateY(38px);
			}
		}
	}
	#video {
		margin: 40px auto 0;
		cursor: pointer;
	}
}
</style>
