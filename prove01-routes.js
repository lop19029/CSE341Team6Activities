const fs = require('fs');
const users = [];

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    

    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>Welcome!</title></head>');
        res.write('<body><h1>Hello!</h1><p> Welcome to my first Node app.<p></br>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="user"><input type="submit" value="Register"></form></body>');
        res.write('</html>');
        return res.end();
    }
    
    if(url==='/users') {
        res.write('<html>');
        res.write('<head><title>Users</title></head>');
        res.write('<body><h1>Users</h1></br>');
        res.write('<ul><li>Clara</li><li>Carlos</li><li>Mario</li><li>Larissa</li>');
        users.forEach(user => {
            res.write('<li>'+user+'</li>');
        });
        res.write('</ul></body></html>');
        return res.end();     
    }

    if(url==='/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () =>{
            const parsedBody = Buffer.concat(body).toString();
            const user = parsedBody.split('=')[1];
            console.log(user);
            users.push(user);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    }
}

module.exports = {
    handler: requestHandler,
    someText: 'Some text just to show how to export multiple objects'
};

exports.moreText = 'Another way to do it';
