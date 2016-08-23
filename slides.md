<!-- $theme: default -->

# 0-60 in 15 Minutes
## Building a Realtime App With Elm and Horizon

Abadi Kurniawan
@abadikurniawan

Senior Developer 
@EngageSoftware

---
#  What is Horizon?

[https://horizon.io](https://horizon.io)

Horizon is realtime, open source backend for JavaScript apps

---
## Collection API

| Read | Write  | Modifiers 
|-|-|-
| `fetch` | `remove` | `above`
| `watch` | `removeAll`| `below`
| | `insert` | `find`
| | `replace` | `findAll`
| | `store` | `limit`
| | `update` | `order`
| | `upsert` |

---
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
# Elm
## Ports & Subscriptions

---
[insert image here]

---
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
# Demo
### Simple Chat App

---
## Source Code
[https://github.com/abadi199/elm-horizon](https://github.com/abadi199/elm-horizon)

## Slide
[https://github.com/abadi199/elm-conf](https://github.com/abadi199/elm-conf)

---
# Thanks

@abadikurniawan
github.com/abadi199