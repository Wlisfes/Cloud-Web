import Day from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh'

export type IDate = string | number | Day.Dayjs | Date | null | undefined

Day.extend(relativeTime)
Day.locale('zh')

/**
 * DayJS实例
 * @param date
 */
export function initDate(date?: IDate): Day.Dayjs {
	return Day(date)
}

/**
 * 过去时间、多久前
 * @param date
 */
export function initFormer(date?: IDate): string {
	const current = initDate()
	const former = initDate(date)
	return current.to(former)
}
