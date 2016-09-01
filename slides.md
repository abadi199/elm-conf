class: title middle center
# 0-60 in 15 Minutes
## Building a Realtime App With Elm and Horizon.js

.logo[.elm[![Elm Logo](images/elm-logo.png "Elm Logo")]]

- Abadi Kurniawan
- Senior Developer @Engage Software


.social-media[
.twitter[.logo[![Twitter Logo](images/twitter.png "Twitter Logo")] [@abadikurniawan](https://twitter/abadikurniawan)]
.github[.logo[![Github Logo](images/github.png "Github Logo")] [abadi199](https://github/abadi199)]
]

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

.table.medium.three-columns[
| Read | Write  | Modifiers 
|:----:|:------:|:--------:|
| `fetch` | `remove` | `above`
| `watch` | `removeAll`| `below`
| | `insert` | `find`
| | `replace` | `findAll`
| | `store` | `limit`
| | `update` | `order`
| | `upsert` |
]

???
This is  the note

---
class: horizon
## JS - Examples
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
class: elm center 
## Elm-Horizon
### Collection API



.table.wide.three-columns[
| Read           | Write              | Modifiers                | 
|:--------------:|:------------------:|:------------------------:|
| `watchCmd/Sub` | `removeCmd/Sub`    | `Above Json.Value`       |
| `fetchCmd/Sub` | `removeAllCmd/Sub` | `Below Json.Value`       |
|                | `insertCmd/Sub`    | `Find (List Json.Value)` |
|                | `replaceCmd/Sub`   | `FindAll Json.Value`     |
|                | `storeCmd/Sub`     | `Limit Int`              |
|                | `updateCmd/Sub`    | `Order String Direction` |
|                | `upsertCmd/Sub`    |                          |
]

---
class: elm
## watchCmd/Sub
```elm
watchCmd : String -> List Modifier -> Cmd msg
watchCmd collectionName modifiers = ...
   
watchSub : Decoder a -> (Result Error (List (Maybe a)) -> msg) -> Sub msg
watchSub decoder tagger = ...
```
#### Example 
```elm
subscriptions = watchSub messageDecoder NewMessage

init = ( initialModel
        , watchCmd "messages"
            [ FindAll <| encode { from = "Elm" }
            , Limit 5
            ]
        )
```
---
## insertCmd/Sub
```elm
insertCmd : String -> List Json.Value -> Cmd msg
insertCmd collectionName data = ...

insertSub : (Result Error () -> msg) -> Sub msg
insertSub resultTagger = ...
```
#### Example
```elm
update msg model = 
    case msg of
        Insert message -> 
            ( model, insertCmd "messages" [ encode message ] )

subscriptions = insertSub InsertResponse
```
---
## Modifiers
```elm
encodeModifier : Modifier -> Json.Value
encodeModifier modifier =
    case modifier of
        Limit number ->
            Encode.object 
                [ ( "modifier", Encode.string "limit" )
                , ( "value", Encode.int number ) 
                ]
```
#### Example
```bash
> encode <| Limit 100
{ modifier = "limit", value = 10 } : Json.Decode.Value\

> encodeModifier <| Horizon.FindAll <| encode { from = "Elm" }
{ modifier = "findAll", value = { from = "Elm" } } : Json.Decode.Value
```
---
class: center middle
# Demo
### Simple Chat App

---
class: thanks center middle
# Thanks

.image[.elm-whale[![Elm Whale](images/elm-whale.png "Elm Whale")]]

Source Code : [https://github.com/abadi199/elm-horizon](https://github.com/abadi199/elm-horizon)

Slide : [https://abadi199.github.com/elm-conf](https://abadi199.github.com/elm-conf)

