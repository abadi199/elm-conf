## Examples
```javascript
const hz = new Horizon();
const messages = hz('messages');

// Watch for data
messages.watch().subscribe(data => { console.log(data); });

// Storing data
messages.store({ msg: 'Hello World!' });

// Storing another data
messages.store({ msg: 'From Elm Conference' });
```

Console.log
```
[]
[ { id: "...", msg: "Hello World!" } ]
[ { id: "...", msg: "Hello World!" }, { id: "...", msg : "From Elm Conference" } ]
```