<script>
import { defineComponent, reactive, onMounted } from 'vue'
import DPlayer from 'dplayer'
import flvjs from 'flv.js'

export default defineComponent({
	name: 'Home',
	setup() {
		const state = reactive({
			flv: `https://cloud.lisfes.cn/customerTrans/7cfb694d9456cc5369e984004d41957f/12e10f3-17960a0e049-0005-5c87-c9a-697bc.flv`,
			cover: `https://cloud.lisfes.cn/8e9070ddc9c542829e41ee21b0a3c3de/snapshots/c167ca71ad0d4e38bb27b1e7215fe239-00001.jpg`
		})

		onMounted(() => {
			initPlayer()
		})

		const initPlayer = () => {
			new DPlayer({
				container: document.querySelector('#player'),
				theme: '#fb7299',
				video: {
					url: state.flv,
					pic: state.cover,
					type: 'customFlv',
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
					<div class="player">
						<div class="player-container">
							<div id="player"></div>
						</div>
					</div>
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
	padding: 12px;
	.player {
		width: 100%;
		max-width: 1080px;
		margin: 0 auto;
		cursor: pointer;
		position: relative;
		&-container {
			width: 100%;
			padding-bottom: 56.25%;
		}
	}
	#player {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
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
