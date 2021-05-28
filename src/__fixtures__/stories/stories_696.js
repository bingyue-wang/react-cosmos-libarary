import React from 'react'
import {useValue} from 'react-cosmos/fixture'
import Test from '../../stories/696'

export default () => {
    const [tbPeriodType, setTbPeriodType] = useValue('tbPeriodType', {defaultValue: ''})
    const [tbPeriodDate, setTbPeriodDate] = useValue('tbPeriodDate', {defaultValue: ''})
    return <Test
        tbPeriodType={tbPeriodType}
        setTbPeriodType={setTbPeriodType}
        tbPeriodDate={tbPeriodDate}
        setTbPeriodDate={setTbPeriodDate}
    />
};
