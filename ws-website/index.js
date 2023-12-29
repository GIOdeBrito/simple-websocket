
const server = {
    protocol: 'protocolOne',
    ws: null,
};

window.onload = function ()
{
    setSocketScope();
    
    window.bsend.onclick = () =>
    {
        server.ws.send(window.wsmsg.value);
    };
};

function setSocketScope ()
{
    // Insert here the server's address 
    server.ws = new WebSocket(
        'wss://curly-space-fortnight-9qg9rw9r66rh7p6r-8080.app.github.dev/',
        'protocolOne'
    );
    
    server.ws.onopen = function (event)
    {
        console.log("Connection open");
        window.pstatus.classList.add('status-on');
        window.pstatus.textContent = 'Connected';
    };

    server.ws.onmessage = function (__msg__)
    {
        //console.log(__msg__.data);

        let msgparagraph = document.createElement('p');
        msgparagraph.textContent = __msg__.data;
        msgparagraph.style.margin = '0';

        let msgsection = document.createElement('section');
        window.serverdump.appendChild(msgsection);
        msgsection.appendChild(msgparagraph);
    };

    server.ws.onclose = function ()
    {
        window.pstatus.classList.add('status-off');
        window.pstatus.textContent = 'Disconnected';
        
        setTimeout(() =>
        {
            console.log('Connection lost, attemping reconnection...');
            setSocketScope();
        }, 3000);
    };
}


