const success = (status, code, data, res)=>{
    res.send({
        status:status,
        statusCode: code,
        data: data
    })
};

const failure = (status, code, message, res)=>{
    res.send( {
        status:status,
        statusCode: code,
        message:message
    })
};

module.exports ={
    success,
    failure
}