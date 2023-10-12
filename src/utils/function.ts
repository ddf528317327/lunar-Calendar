import _ from 'lodash';
import lunisolar from 'lunisolar';
export interface Option {
    value: number;
    label: string;
    children?: Option[];
    isLeaf?: boolean;
    loading?: boolean;
}

// 使用lunisolar 根据传入数据取得年柱
export function getYearPillar(list: Option[]) {
    return _.map(list, (item: Option) => {
        // 这个方法是根据阳历判断的  使用3月份去找年柱  阴历与阳历年是重合的 下面测试1990-2099年是全部吻合的
        // const str = lunisolar(`${item.value}-03-01`).lunar.toString();
        // const result = str.split('年')[0];
        // console.log('result', result === numToChineseYear(String(item.value)));
        const annualColumn = lunisolar(`${item.value}-03-01`).char8.year.toString();
        item.label = `${item.label}(${annualColumn} ${lunisolar(`${item.value}-03-01`).format('cZ')}年)`;
        return item;
    });
}
const m: string[] = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '腊月'];
// 根据传入年判断今年闰月以及闰月天数
export function getLeapMonth(year: string | number) {
    const leapMonth = lunisolar(new Date(Number(year), 3, 1)).lunar.leapMonth;
    if (leapMonth) {
        // 根据月份插入闰月
        m.splice(Number(leapMonth), 0, `${m[leapMonth - 1]}(闰)`);
    }
    return getLabelValue(m);
}
// 根据数组返回label value
export function getLabelValue(list: string[]) {
    return _.map(list, (item: string) => {
        let val = _.findIndex(m, (i) => item === i) + 1;
        if (item.includes('闰')) {
            val = _.findIndex(m, (i) => item.includes(i)) + 1;
        }
        return {
            label: item,
            value: item,
            isLeaf: false,
        };
    });
}
// 根据年月查询当月天数
export function getMonthDays(year: string | number, month: string) {
    const numMonth = m.findIndex((item) => item === month) + 1;
    console.log('numMonth', numMonth);
    if (month.includes('闰')) {
        const d = lunisolar(new Date(Number(year), numMonth, 1)).lunar.leapMonthIsBig ? 30 : 29;
        return getDaysList(d);
    } else {
        const d = lunisolar(new Date(Number(year), numMonth, 1)).lunar.isBigMonth ? 30 : 29;
        return getDaysList(d);
    }
}
// 根据传入数字生成当月多少天的数组
export function getDaysList(days: number) {
    const list = [];
    for (let i = 1; i <= days; i++) {
        list.push({
            label: numToChinese(i),
            value: i,
        });
    }
    return list;
}
// 农历日期
export function numToChinese(num: number) {
    const lunarMonth = [
        '初一',
        '初二',
        '初三',
        '初四',
        '初五',
        '初六',
        '初七',
        '初八',
        '初九',
        '初十',
        '十一',
        '十二',
        '十三',
        '十四',
        '十五',
        '十六',
        '十七',
        '十八',
        '十九',
        '二十',
        '廿一',
        '廿二',
        '廿三',
        '廿四',
        '廿五',
        '廿六',
        '廿七',
        '廿八',
        '廿九',
        '三十',
    ];
    return lunarMonth[num - 1];
}
// 把数字年份转换成中文年份 二零二三
export function numToChineseYear(year: string) {
    var chineseNum = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //汉字的数字
    const numArr = year.split('');
    const chineseYear = _.map(numArr, (item: string) => {
        return chineseNum[Number(item)];
    });
    return chineseYear.join('');
}
