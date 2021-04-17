process.on("message", message => {

    const jsonResponse = uploadData(message.csvData);
    process.send(jsonResponse);
    process.exit();
})


function uploadData(data) {
    return {
        "record" : data,
        }
}