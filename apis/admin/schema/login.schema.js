const loginSchema = {
    type:"object",
    properties: {
        username: {type:"string",minLength:1},
    },
    required: ["username"]
}

export default loginSchema;