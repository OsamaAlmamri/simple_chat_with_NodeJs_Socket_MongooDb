const content=require('fs').readFileSync(__dirname+'/index.html','utf8')
var httpServer=require('http').createServer((req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.setHeader('Content-Length',Buffer.byteLength(content));
    res.end(content);
})


const io=require('socket.io')(httpServer);

io.on('connect',socket=>{
    // socket.on('hey',)
    console.log('connected')
})

io.on('connect',socket=>{
    socket.on('hey',data=>{
        console.log('hey',data)
    })
})
//To send event from server to clint
io.on('connect',socket=>{
   let count=0;
   setInterval(()=>{
       socket.emit('hello',++count);
   },1000);
})

//To send messsage  from  clint to server
io.on('connect',socket=>{
  socket.on('hey',data=>{
      console.log('hey',data)
  })
})


httpServer.listen(3000,()=>{
    console.log('go to 127.0.0.1:3000') ;
})