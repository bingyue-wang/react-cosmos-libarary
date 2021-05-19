import React, {useRef} from 'react'
import {Form, Input, Select} from 'antd'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import moment from 'moment'
// import './style.scss'

const {Option} = Select

const tbPeriodForm = {
    name: 'tbPeriodForm',
    className: 'tbPeriodForm',
    label: 'TB Period',
    type: 'select',
    showSearch: false,
    rules: [{required: true, message: 'TB period is required!'}],
    children: [
        {value: 'FY', text: 'FY'},
        {value: '12moEnding', text: '12 mo. ending'},
    ],
}

const dateForm = {
    name: 'dateForm',
    className: 'dateForm',
}

function TbPeriod(props) {
    const inputRef = useRef()
    const {
        tbPeriodType : periodType,
        tbPeriodDate: date,
        setTbPeriodType : setPeriodType,
        setTbPeriodDate: setDate
    } = props
    // if you want to keep this as a stand alone component, uncomment the below and comment out the above props
    // const [periodType, setPeriodType] = useState()
    // const [date, setDate] = useState()
    
    const sectorChange = async (value, formName) => {
        setPeriodType(value)
        setDate()
        inputRef.current.handleReset('')
        inputRef.current.focus()
    }
    const optionsChange = (value, child) => {
        return child.map((optItem) => (
            <Option key={optItem.value} value={optItem.id}>
                {optItem.text}
            </Option>
        ))
    }
    const onDateChange = (periodType, e) => {
        if (validateDateFormat(periodType, e) && validateDateFormat(periodType, e)) {
            setDate(e.target.value)
        } else {
            setDate()
        }
    }
    
    const validateDateFormat = (periodType, e) => {
        const value = e.target ? e.target.value : e
        switch (periodType) {
            case 'FY':
                if (moment(value, 'YYYY', true).isValid()) return true
                break
            case '12moEnding':
                if (moment(value, 'MM-DD-YYYY', true).isValid()) return true
                break
            default:
                return false
        }
    }
    const validateDateAccuracy = (periodType, e) => {
        const value = e.target ? e.target.value : e
        switch (periodType) {
            case 'FY':
                if (moment(value, 'YYYY', true).isSameOrBefore(moment())) return true
                break
            case '12moEnding':
                if (moment(value, 'MM-DD-YYYY', true).isSameOrBefore(moment())) return true
                break
            default:
                return false
        }
    }
    
    const getInputRule = (periodType) => {
        return [
            {
                required: true,
                message: 'Date is required!',
            },
            {
                validator: async (_, value) => {
                    if (validateDateFormat(periodType, value)) return
                    throw new Error('Date format is not correct!')
                },
            },
            {
                validator: async (_, value) => {
                    if (validateDateAccuracy(periodType, value)) return
                    throw new Error('Date must not be after today!')
                },
            },
        ]
    }
    
    const inputPlaceHolder = (periodType) => {
        if (!periodType) return null
        return periodType === 'FY' ? 'yyyy' : 'mm-dd-yyyy'
    }
    return (
        <div className={'formitemtop'}>
            <div>696</div>
            <br/>
            <Form>
                <Form.Item
                    name={tbPeriodForm.name}
                    label={tbPeriodForm.label}
                    className={tbPeriodForm.className}
                    rules={tbPeriodForm.rules}
                    key={tbPeriodForm.name}
                >
                    <Select
                        showSearch={tbPeriodForm.showSearch}
                        onChange={(value) => sectorChange(value, tbPeriodForm.name)}
                        form={tbPeriodForm.name}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        dropdownClassName="project-team-dropdown"
                    >
                        {optionsChange(tbPeriodForm.action, tbPeriodForm.children)}
                    </Select>
                </Form.Item>
                <Form.Item
                    name={dateForm.name}
                    className={dateForm.className}
                    rules={getInputRule(periodType)}
                    key={dateForm.name}
                >
                    <Input
                        ref={inputRef}
                        placeholder={inputPlaceHolder(periodType)}
                        value={date}
                        allowClear
                        onChange={(e) => onDateChange(periodType, e)}
                    />
                </Form.Item>
            </Form>
        </div>
    )
}

export default TbPeriod
