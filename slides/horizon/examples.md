## Examples
```javascript
var messages = new Horizon()('messages');
messages
    .findAll({from: 'elm'})
    .limit(5)
    .watch()
    .subscribe(data => { console.log(data); });

messages.store({ from: 'elm', msg: 'Hello World!' });
// [ { from: 'elm', msg: 'Hello World!' }]

messages.store({ from: 'elm', msg: 'From Elm Conference' });
// [ { from: 'elm', msg: 'Hello World!' }, { from: 'elm', msg: 'From Elm Conference' }]

messages.store({ from: 'abadi', msg: 'Just ignore me!' });
```