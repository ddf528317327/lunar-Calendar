import { Option } from '@/utils/function';

const optionLists: Option[] = [];
// 以optionLists为例，循环生成1990 - 2099年的数据
for (let i = 1990; i < 2100; i++) {
    optionLists.push({
        value: i,
        label: i.toString(),
        isLeaf: false,
    });
}
export default optionLists;
