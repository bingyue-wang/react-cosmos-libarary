import React from 'react'
import {Form, Select} from 'antd'
import './style.scss'
const { Option } = Select;

const item = {
    name: 'pwcRepresentedRole',
    className: 'width-semi',
    label: 'PwC Is Representing',
    type: 'select',
    showSearch: false,
    rules: [{required: true, message: 'PwC Is Representing is required!'}],
    children: [
        {value: 'Buyer', text: 'Buyer'},
        {value: 'Seller', text: 'Seller'},
    ],
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
        ));
      };
    return (
        <div className={'formitemtop'}>
            <div>696</div>
            <Form.Item
                name={item.name}
                label={item.label}
                className={item.className}
                rules={item.rules}
                key={item.name}
            >
                <Select
                    showSearch={item.showSearch}
                    onChange={(value) => sectorChange(value, item.name)}
                    form={item.name}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    dropdownClassName="project-team-dropdown"
                >
                    {optionsChange(item.action, item.children)}
                </Select>
            </Form.Item>
        </div>
    )
}

export default TrailBalancePeriod
