const AWS = require('aws-sdk');
exports.S3services = async(data, filename) =>{
    const BUCKET_NAME= 'expenseapptracking';
    const IAM_USER_KEY='AKIA3LKZSNOIEKZWYLQ6';
    const IAM_USER_SECRET = '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';
    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME
    })
    
        var params = {
            Bucket : BUCKET_NAME,
            Key: filename,
            Body: data,
            ACL: 'public-read'
        }

        return new Promise((resolve, reject) =>{
            s3bucket.upload(params, (err, s3response)=>{
                if(err){
                    console.log(err)
                    reject(err);
                }else{
                    console.log(s3response);
                    resolve(s3response.Location);
                }
            })
        })
      
        
    
}
