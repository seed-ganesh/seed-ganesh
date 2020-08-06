export default [
    {
        formName: 'Name',
        label: 'Name',
        mandatory: true,
        type: 'text',
        displayName: 'Name',
        validationText: 'It should be a alphabet'
    },
    {
        formName: 'Email',
        label: 'Email',
        mandatory: true,
        type: 'email',
        displayName: 'Email',
        validationText: 'Email is not valid'
    },
    {
        formName: 'Mobile_Number',
        label: '10 digit Mobile Number',
        mandatory: true,
        length: 10,
        type: 'number',
        multiline: false,
        displayName: 'Number',
        validationText: 'It should be a number with 10 characters'
    },
    {
        formName: 'Locality',
        label: 'Locality',
        mandatory: false,
        multiline: false,
        displayName: 'Locality',
        type: 'text'
    },
    {
        formName: 'Address',
        label: 'Address(Area and street)',
        mandatory: true,
        multiline: true,
        displayName: 'Address',
        type: 'text'
    },
    {
        formName: 'City',
        label: 'City/District/Town',
        mandatory: true,
        multiline: false,
        type: 'text',
        displayName: 'City',
        validationText: 'It should be alphabet'
    },
    {
        formName: 'State',
        label: 'State',
        mandatory: true,
        multiline: false,
        type: 'text',
        displayName: 'State',
        validationText: 'It should be alphabet'
    },
    {
        formName: 'Landmark',
        label: 'LandMark(optional)',
        mandatory: false,
        multiline: false,
        type: 'text',
        displayName: 'Landmark',
        validationText: 'It should be alphabet'
    },
    {
        formName: 'Pincode',
        label: 'Pincode',
        mandatory: true,
        multiline: false,
        length: 6,
        type: 'number',
        displayName: 'Pincode',
        validationText: 'It should be a number with 6 characters'
    },
    {
        formName: 'Alternate Phone',
        label: 'Alternate Phone(optional)',
        mandatory: false,
        multiline: false,
        type: 'number',
        length: 10,
        displayName: 'Alt Num',
    }
]