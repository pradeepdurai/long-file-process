process.on("message", message => {
    const jsonResponse = uploadData(message.csvData);
    process.send(jsonResponse);
    process.exit();
})


function uploadData(data) {
    console.log(`I am working....${data}`)
    return {
        "record" : data.length,
        }
}