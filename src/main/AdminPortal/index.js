const express = require("express");
const cookieParser = require('cookie-parser');
const { Authenticate } = require("./Authentication");
const { AttendanceSaver } = require("../Services/AttendanceService/AttendanceSaver");
const { BuildTimeTables } = require("../Services/TimeTableService/Utility/BuildTimeTable");
const { SaveSyllabus } = require("../Services/SyllabusService/SyllabusService");
const {AttendanceParser}=require("../Services/AttendanceService/AttendanceParser");
const { SaveDocument } = require("../Services/DocumentService.js/SaveDocument");
const upload=(require('multer'))();




function startWebApp(telegramBroker){
const app=express();
app.use(cookieParser());
app.use('/Admin',Authenticate);
app.use(express.static('./public'))
app.use(express.urlencoded({extended:true}));
app.set('case sensitive routing',true);

/**
 * Endpoint to set cookie
 */
app.post('/login',(req,res)=>
{
  if(req.body['username'] && req.body['password'])
  { let {username,password}=req.body;
    console.log(username,password);
    if(username == 'root'  && password == 'topfew' )
      {
        res.cookie('name','root',{maxAge:1000*3600});
        res.redirect('/Admin/HomePage.html');
        return;
      }
  }

    res.redirect('/login.html');

}  );

//Root page if contains cookie send to Admin
//HomePage else redirect to login page
app.get('/',
(req,res)=>{
    if('name' in req.cookies)
      if( req.cookies['name'] == 'root')
      {
        res.redirect('/Admin/HomePage.html');
        return;
      }
      res.redirect('/login.html');
  }
);



/**
 * End Point for attendace upload
 */
app.post('/Admin/UploadAttendance',upload.single('attendance'),async (req,res)=>
{
  console.log("Got request to Upload Attendance");
  console.log(req.file);
  let result=await AttendanceParser(req.file.buffer);
  
  if(result!=null && result != undefined)
    AttendanceSaver(result);

  console.log(req.body.submit);
  res.redirect('/');
});

/**
 * Endpoint to upload timetable
 */
app.post('/Admin/UploadTimeTable',upload.single('timetable'),(req,res)=>
{
  console.log("Got request to Upload Timetable");
  console.log(req.file);
  BuildTimeTables(req.file.buffer,req.body.year,null)
  console.log(req.body.year);
  res.redirect('/');
  
});


/**
 * Endpoint to upload syllabus
 */
 app.post('/Admin/UploadSyllabus',upload.single('syllabus'),(req,res)=>
 {
   console.log("Got request to Upload Syllabus");
   console.log(req.file);
   console.log(req.body.subjectname);
   console.log(req.body.subjectcode);
   SaveSyllabus(req.body.subjectcode,req.body.subjectname,req.file.buffer,req.file.originalname);
   res.redirect('/');

   
 });

 /**
  * Endpoint for sending notifications
  */
app.post('/Admin/SendNotification',upload.single('attachment'),(req,res)=>
{
  if(req.file == undefined || req.file == null)
    {
      telegramBroker.sendBroadCast(req.body.message,null);
      
    }
  else
    telegramBroker.sendBroadCast(req.body.message,req.file.buffer,req.file.originalname);
  res.redirect('/');
  
});
/**
 * Endpoint for Uploading document
 */
app.post('/Admin/UploadDocument',upload.single('document'),(req,res)=>
{
  console.log("Got request to Upload Document");
  
  SaveDocument(req.body['tags'],req.file.buffer,req.file.originalname,req.file.mimetype);
  
  res.redirect('/');

  
});

app.listen(4000);
return app;
}

exports.startWebApp=startWebApp;