process.on("message", message => {
    const jsonResponse = uploadData(message.csvData);
    process.send(jsonResponse);
    process.exit();
})


function uploadData(data) {
    console.log(`I am working....${data[0]}`)
    for(var i=0; i<data.length; i++){
        console.log(`----${data[0]}`); 
    }
    return {
        "record" : data.length,
        }
}