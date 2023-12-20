import { Spinner } from '@vkontakte/vkui'
import { LuBadgeCheck } from 'react-icons/lu'

import { color } from '../lib/color'
import { useHello } from '../hooks/useHello'
import { useLoadImg } from '../hooks/useLoadImg'

import style from '../ui/Auth.module.scss'

export const Hello = () => {
	const { Snack, timeString, name, loading } = useHello()
	const { spinner, src } = useLoadImg()
	const sp = spinner || loading

	return (
		<div
			style={{ backgroundColor: color[timeString] }}
			className={style.helloWrapper}
		>
			{sp && <Spinner size='large' />}
			{!sp && (
				<div style={{ backgroundImage: `url(${src})` }} className={style.hello}>
					<LuBadgeCheck size={40} />
					<span style={{ color: '#fff' }}>
						{timeString} {name}
					</span>{' '}
					{Snack}
				</div>
			)}
		</div>
	)
}
