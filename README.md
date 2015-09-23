# FileUtil

FileUtil is HTML5 file utils.

## Quick start
Several quick start options are available:
*   Download [JQuery](http://jquery.com/download)
*   Download [SparkMD5](https://github.com/satazor/SparkMD5)
*   Import JQuery and SparkMD5 to your project
*   Import FileUtil.js

## Usage
* Import the javascript
```
<script src="/project/jquery/jquery.min.js"></script>
<script src="/project/spark-md5/spark-md5.min.js"></script>
```
*  New FileUtil
```
var fileUtil = new FileUtil();
```
*  Check the browser whether support
```
if (!fileUtil.support) {
    console.log('FileUtil isn't supported!');
    alert('FileUtil isn't supported!');
    return;
}
```
*  Get the file md5 successfully
```
fileUtil.getMd5(file).done(function(data) {
    console.log('Get the file md5 successfully: ' + data);
});
```
* Getting the file md5 in the progress
```
fileUtil.getMd5(file).progress(function(progress){
    console.log('Getting the file md5 in the progress(' + progress + '%).');
});
```
* Get the file md5 unsuccessfully
```
fileUtil.getMd5(file).fail(function(){
    console.log('Get the file md5 unsuccessfully.');
});
```

### License
FileUtil is open-sourced software licensed under the [MIT license](https://github.com/ShaneStevenLei/FileUtil/blob/master/LICENSE)