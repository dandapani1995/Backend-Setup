const Success = (status, code, data, res)=>{
    res.send({
        status:status,
        statusCode: code,
        data: data
    })
};

const Failure = (status, code, message, res)=>{
    res.send( {
        status:status,
        statusCode: code,
        message:message
    })
};

module.exports ={
    Success,
    Failure
}