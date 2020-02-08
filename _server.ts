const express = require('express')
const bodyParser = require('body-parser')
const robot = require("robotjs");
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static('./build'))

app.get('/', function (req: any, res: any) {
    res.send('0')
})

app.post('/move', function (req: any, res: any) {
    const mouse: any = robot.getMousePos();
    mouse.x += req.body.x;
    mouse.y += req.body.y; 
    robot.moveMouse(mouse.x, mouse.y);
    res.send('0')
})

app.post('/scroll', function (req: any, res: any){
    robot.scrollMouse(0, req.body.y);
    res.send('0')
})

app.post('/click', function (req: any, res: any){
    robot.mouseClick(req.body.button, req.body.double);
    res.send('0')
})

let lastKey = '';
app.post('/type', function (req: any, res: any){
    if(req.body.key.length > 1){
        res.send('0')
        return
    }
    if(lastKey === '.'){
        lastKey = ''
        res.send('0')
        return
    }
    lastKey = req.body.key
    robot.typeString(req.body.key);
    res.send('0')
})

app.post('/keytap', function (req: any, res: any){
    robot.keyTap(req.body.key.toLowerCase());
    res.send('0')
})
const ip = require("ip");
console.dir ( ip.address() );
app.listen(3002)