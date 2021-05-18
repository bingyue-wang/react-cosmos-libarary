import React from 'react'
import {Form, Input, Select} from 'antd'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
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
    label: '-',
    rules: [{required: true, message: 'Date is required!'}],
}

function TrailBalancePeriod(props) {
    const [form] = Form.useForm()
    
    const sectorChange = async (value, type) => {
        console.log(`sector Changed to: ${value}, and type is ${type}`)
    }
    const optionsChange = (value, child) => {
        return child.map((optItem) => (
            <Option key={optItem.value} value={optItem.id}>
                {optItem.text}
            </Option>
        ))
    }
    const onDateChange = (e) => {
        console.log(e.target.value)
    }
    return (
        <div className={'formitemtop'}>
            <div>696</div>
            <br/>
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
                label={dateForm.label}
                className={dateForm.className}
                rules={dateForm.rules}
                key={dateForm.name}
                onChange={onDateChange}
            >
                <Input/>
            </Form.Item>
        </div>
    )
}

export default TrailBalancePeriod
