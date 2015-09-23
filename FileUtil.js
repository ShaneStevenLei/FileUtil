/**
 * Html5 file util, need JQuery and SparkMD5(https://github.com/satazor/SparkMD5)
 * 
 * Usage:
 *      1. var fileUtil = new FileUtil();
 *      2. Check the browser whether support: 
 *          if(!fileUtil.support){
 *              console.log(FileUtil isn't supported!);
 *              alert('FileUtil isn't supported!'); 
 *          }
 *      3. Get file md5:
 *          // Get the file md5 successfully
 *          fileUtil.get(file).done(function(data){
 *              console.log('Get the file md5 successfully: ' + data);
 *          });
 *          // Getting the file md5 in the progress
 *          fileUtil.getMd5(file.file).progress(function(progress){
 *              console.log('Getting the file md5 in the progress (' + progress + '%).');
 *          });
 *          // Get the file md5 unsuccessfully
 *          fileUtil.getMd5(file.file).fail(function(){
 *              console.log('Get the file md5 unsuccessfully.');
 *          });
 *
 * @author ShaneStevenLei[shanestevenlei@outlook.com]
 * 
 * @license based on MIT LICENSE
 * 
 */
var FileUtil = function() {}
FileUtil.prototype = {
    support: (typeof(File) !== 'undefined') &&
        (typeof(Blob) !== 'undefined') &&
        (typeof(FileList) !== 'undefined') &&
        (!!Blob.prototype.webkitSlice || !!Blob.prototype.mozSlice || !!Blob.prototype.slice || false),
    getMd5: function(file) {
        var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
            chunkSize = 2 * 1024 * 1024, // Read in chunks of 2MB
            chunks = Math.ceil(file.size / chunkSize),
            currentChunk = 0,
            spark = new SparkMD5.ArrayBuffer(),
            fileReader = new FileReader(),
            defer = $.Deferred();
        fileReader.onload = function(e) {
            defer.notify(Math.floor(script_r.progress() * 100));
            spark.append(e.target.result); // Append array buffer
            currentChunk++;
            if (currentChunk < chunks) {
                loadNext();
            } else {
                defer.resolve(spark.end());
            }
        };
        fileReader.onerror = function() {
            defer.reject('oops, something went wrong.');
        };
        var loadNext = function() {
            var start = currentChunk * chunkSize,
                end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
            fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
        };
        loadNext();
        return defer.promise();
    }
}
