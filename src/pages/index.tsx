import { Option, getLeapMonth, getMonthDays, getYearPillar } from '@/utils/function';
import { Cascader } from 'antd';
import { useEffect, useState } from 'react';
// @ts-ignore
import _ from 'lodash';
import data from './data.ts';

export default function HomePage() {
    const [options, setOptions] = useState<Option[]>(data);
    useEffect(() => {
        setOptions(getYearPillar(data));
    }, []);
    const loadData = (selectedOptions: Option[]) => {
        console.log('selectedOptions', selectedOptions);
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        if (_.size(selectedOptions) === 1) {
            // load options lazily
            setTimeout(() => {
                targetOption.loading = false;
                // @ts-ignore
                targetOption.children = getLeapMonth(targetOption.value);
                setOptions([...options]);
            }, 500);
        }
        if (_.size(selectedOptions) === 2) {
            // load options lazily
            setTimeout(() => {
                targetOption.loading = false;
                // // @ts-ignore
                targetOption.children = getMonthDays(selectedOptions[0].value, String(selectedOptions[1].value));
                setOptions([...options]);
            }, 500);
        }
    };
    const onChange = (value: string[], selectedOptions: Option[]) => {
        console.log(value, selectedOptions);
    };

    return (
        <div>
            <Cascader options={options} loadData={loadData} onChange={onChange as any} changeOnSelect />
        </div>
    );
}
