# messagesApp

Simple message storing app.

Please install dependancies before running e.g. npm install, yarn install

The service behaves as follows:<br>
$ curl $domain/messages/ -d 'my test message to store' <br>
{"id":12345} <br>
$ curl $domain/messages/12345 <br>
my test message to store <br>
