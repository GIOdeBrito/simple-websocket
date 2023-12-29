
const websocket = require('ws'); 

const PORT = Number(8080);
const server = new websocket.Server({ port: PORT });

server.on('error', function (err)
{
    console.error(err);
});

server.on('connection', (ws) =>
{
    const serverMessage = (head, content) =>
    {
        ws.send(`${head} ${content}`);
        console.log(head, content);
    };

    serverMessage('Connection:', 'Accepted');

    ws.on('message', function ws_onmessage (__msg__)
    {
        let msg = __msg__.data;
        serverMessage('Msg:', `[ ${__msg__} ]`);
    });

    ws.on('close', function ws_onclosed ()
    {
        serverMessage('Connection:', 'Disconnected')
    });
});

console.log(`Server is listening on PORT ${PORT}`);


