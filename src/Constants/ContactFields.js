export default {
    name: {
        firstInput: false,
        error: false,
        placeholder: 'Enter your Name',
        errorText: '',
        type: 'text',
        textField: false,
        id: 'name',
        name: 'name',
        value: '',
        class: 'form-control',
    },
    email: {
        firstInput: false,
        value: '',
        placeholder: 'Enter your Email',
        error: false,
        textField: false,
        id: 'email',
        type: 'email',
        name: 'email',
        errorText: '',
        class: 'form-control'
    },
    number: {
        firstInput: false,
        value: '',
        placeholder: 'Enter your Mobile Number',
        error: false,
        textField: false,
        id: 'number',
        type: 'number',
        name: 'number',
        errorText: '',
        class: 'form-control'
    },
    message: {
        value: '',
        type: 'text',
        placeholder: 'Please Enter your message......',
        name: 'message',
        id: 'message',
        textField: true,
        rows: 10,
        firstInput: false,
        error: false,
        errorText: '',
        class: 'form-control'
    }
}