class: title middle center
# 0-60 in 15 Minutes
## Building a Realtime App With Elm and Horizon.js

.logo[.elm[![Elm Logo](images/elm-logo.png "Elm Logo")]]

- Abadi Kurniawan
- Senior Developer @EngageSoftware


- [https://twitter.com/abadikurniawan](https://twitter/abadikurniawan)
- [https://github/abadi199](https://github/abadi199)

???
Hi, My name is Abadi Kurniawan, and today I will be talking about building a realtime app with elm and horizon js.
I'm a senior software developer at a st. louis based company called engage software, where I've been using elm in production for about 7 months.

---
class: horizon center middle
#  What is Horizon?

Horizon is realtime, open source backend for JavaScript apps

[https://horizon.io](https://horizon.io)

.logo[.horizon[![Horizon Logo](images/horizon-logo.png "Horizon Logo")]]

???
Before we begins, I'll give a quick background about what horizon is.
Horizon is an open-source development platform for building realtime, scalable web apps. 
It's built on top of Rethink DB by the Rethink DB team, and runs on node.js.




---
class: horizon center
## Horizon Client
### Collection API

| Read | Write  | Modifiers 
|:----:|:------:|:--------:|
| `fetch` | `remove` | `above`
| `watch` | `removeAll`| `below`
| | `insert` | `find`
| | `replace` | `findAll`
| | `store` | `limit`
| | `update` | `order`
| | `upsert` |

???
This is  the note

---
class: horizon
## Examples
```javascript
var messages = new Horizon()('messages');
messages
    .findAll({from: 'elm'})
    .limit(5)
    .watch()
    .subscribe(data => { console.log(data); });

messages.store({from:'elm',msg:'Hello World!'});
// [{from:'elm',msg:'Hello World!'}]

messages.store({from:'elm',msg:'From Elm Conference'});
// [{from:'elm',msg:'Hello World!'}
// ,{from:'elm',msg:'From Elm Conference'}
// ]

messages.store({from:'abadi',msg:'Just ignore me!'});
```

---
class: elm ports center middle
## Elm - Ports & Subscriptions

.diagram[.ports[![Ports & Subscriptions Diagram](images/ports.png "Ports & Subscriptions Diagram")]]

---
class: elm elm-horizon center middle
## Elm-Horizon
.diagram[.elm-horizon[![Elm Horizon Diagram](images/elm-horizon.png "Elm Horizon")]]

---
class: elm
## Example
```elm
subscriptions =
    Sub.batch 
    	[ watchSub messageDecoder NewMessage
        , insertSub responseDecoder SendMessageResponse
        ]

init = 
    ( initialModel
    , watchCmd "messages"
        [ FindAll [{ from = "Elm" }]
        , Limit 5
        ] 
    )
        
update msg model =
    SendMessage message ->
        ( model
        , insertCmd "messages" <| encoder message
        )
```

---
class: middle
# Demo
### Simple Chat App

---
class: thanks center middle
# Thanks

.image[.elm-whale[![Elm Whale](images/elm-whale.png "Elm Whale")]]

Source Code : [https://github.com/abadi199/elm-horizon](https://github.com/abadi199/elm-horizon)

Slide : [https://abadi199.github.com/elm-conf](https://abadi199.github.com/elm-conf)

