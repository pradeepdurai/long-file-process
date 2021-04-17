  // var products = [
        //     ['demo-name', 'demo-sku', 'demo-desc'],
        //     ['demo-name', 'demo-sku', 'demo-desc'],
        //     ['demo-name', 'demo-sku', 'demo-desc'],
        //     ['demo-name', 'demo-sku', 'demo-desc'],
        //     ['demo-name', 'demo-sku', 'demo-desc']
        // ];
        // for(var i=0 ;i<products.lemgth;i++){
        //     products[i]['_id'] = new mongoose.Types.ObjectId();
        // }
        // const csvFile = new product(products)
        // csvFile.collection.insertMany(products,(err, product)=>{
        //     if(err){
        //         return res.status(400).json({
        //             message : err
        //         })
        //     }
        // })
        // return;
        var result = [];
        fs.createReadStream(file.csvFile.path)
            .pipe(csv({}))
            .on('data', (data) => {
                result.push(data['_id'])
            })
            .on('end', () => {
                console.log(result)
                const childProcess = fork('./uploadCsv');
                childProcess.send({ "csvData": result })
                childProcess.on("message", message => {
                    console.log(message)
                    return res.send(message);
                })
            })