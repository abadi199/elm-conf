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
Hi, My name is Abadi Kurniawan.
I'm a senior software developer at a st. louis based company called engage software, where I've been using elm in production for about 7 months.

Today, I will be talking about using elm with horizon js to build a realtime app.
---
class: elm center middle
# I .heart[❤] Elm
???
I love elm. And since this is an elm conference, I think it's safe to assume that we all here we love elm. Or at least you're interested in elm.  
I think Elm is a great language and also a really fun language to use. But the thing about elm is, it makes me want to keep writing elm code,
and everytime I have to use other language to write my backend code, I can't wait to go back to switching back to front end so I can write more elm code.
I wish I can use elm to write my backend code. But since that probably won't happend anytime soon, I stuck with using other language to write my backend code.

But what if you don't have to use other language. What if I don't have to write any backend code at all?
---
class: horizon center middle
# Horizon

Horizon is a realtime, open source backend for JavaScript apps

[https://horizon.io](https://horizon.io)

.logo[.horizon[![Horizon Logo](images/horizon-logo.png "Horizon Logo")]]

???
So, what is horizon?
Horizon is an open-source development platform for building realtime, scalable web apps. 
It's built on top of RethinkDB by the RethinkDB team, and runs on node.js.

If you're familiar with Firebase, horizon is similar to Firebase, but it's open source, and you can host your own horizon server on your own server.

With horizon, you can write realtime client side javascript application without writing backend code. 
---
class: horizon api center
## Horizon API

???
Horizon provides several API. 
---
class: horizon api center
## Horizon API
- Authentication

???
The first one is authentication. Horizon provides a way for your app to do user authentication.
---
class: horizon api center  
## Horizon API
- Authentication
- Users & Groups

???
The second one is Users & Groups, which is how you manage the users and groups in their system when you use their authentication API. 
---
class: horizon api center  
## Horizon API
- Authentication
- Users & Groups
- Permissions

???
and then we have Permissions API, which is how you configure the permissions, which users will have access to which data.
---
class: horizon api center  
## Horizon API
- Authentication
- Users & Groups
- Permissions
- Collection API

???
the next one is Collection API. This is how you create, read, update, and delete data in the database.
---
class: horizon api center  
## Horizon API
- Authentication
- Users & Groups
- Permissions
- Collection API
- Horizon API

???
and the last one is Horizon API, which is the API to manage the connection to the horizon server itself, such as opening connection, error handling, and so on.
---
class: horizon api final center 
## Horizon API
- Authentication
- Users & Groups
- Permissions
- **Collection API**
- Horizon API

???
In this talk, I'm only going to cover Collection API.
---
class: horizon center collection write 
## Collection API

.table.medium.three-columns[
| Write       | Read    | Modifiers| 
|:-----------:|:-------:|:--------:|
| `remove`    | `fetch` | `above`
| `removeAll` | `watch` | `below`
| `insert`    |         | `find`
| `replace`   |         | `findAll`
| `store`     |         | `limit`
| `update`    |         | `order`
| `upsert`    |         |
]

???
What is collection?
In horizon, a Collection is an object represents a group of related documents, and it's backed by RethinkDB table. 
Collection API is a way for you to read and write into a collection, or RethinkDB table.

I'm grouping this API into 3 categories. This is not an official classification by Horizon. 
I just find it helpful to think about this API this way and how I can implement this in Elm.

The first category is the Write action, which consists of remove, removeAll, insert, replace, store, update, and upsert. 
These are all actions that do some sort of writing/updating to the database. 

---
class: horizon center collection read
## Collection API

.table.medium.three-columns[
| Write       | Read    | Modifiers| 
|:-----------:|:-------:|:--------:|
| `remove`    | `fetch` | `above`
| `removeAll` | `watch` | `below`
| `insert`    |         | `find`
| `replace`   |         | `findAll`
| `store`     |         | `limit`
| `update`    |         | `order`
| `upsert`    |         |
]

???
The second category is Read action, which contains fetch and watch. Both actions are use to read data from your collection, 
the difference is that with fetch, you only get the data once, similar to how select in sql works, while watch is you create a subscription to the data 
that you're interested in, and whenever there's some changes to these data, you will receive a new data.
---
class: horizon center collection modifiers
## Collection API

.table.medium.three-columns[
| Write       | Read    | Modifiers | 
|:-----------:|:-------:|:---------:|
| `remove`    | `fetch` | `above`
| `removeAll` | `watch` | `below`
| `insert`    |         | `find`
| `replace`   |         | `findAll`
| `store`     |         | `limit`
| `update`    |         | `order`
| `upsert`    |         |
]
???
The last category is Modifiers. This is the interesting one. So these are all action that will "modify" your read action. 

We have above and below methods which will restrict the results to values that are above or below some certain values. 

And then we have find and findAll that will restrict your results that matches certain values. 

And then we have limit that limit the number of data your want to get. 

And the last one is order, which will sort the results based on certain field. 

You use these modifiers methods with the read methods, to modify the results that you'll get back from horizon.
---
class: horizon
## Horizon.js - Example
```javascript
var messages = new Horizon()('chat_messages');
messages
    .findAll({from: 'elm'})
    .limit(5)
    .watch()
    .subscribe(data => { console.log(data); });

messages.store({ from: 'elm', msg: 'Hello World!' });
// [{from:'elm',msg:'Hello World!'}]

messages.store({ from: 'elm', msg: 'From Elm Conference' });
// [{from:'elm',msg:'Hello World!'},
// {from:'elm',msg:'From Elm Conference'}]

messages.store({ from: 'abadi', msg: 'Just ignore me!' });
```

---
class: elm center middle
# Elm-Horizon
.logo[.elm[![Elm Logo](images/elm-logo.png "Elm Logo")]]
.logo[.horizon[![Horizon Logo](images/horizon-logo.png "Horizon Logo")]]
???
Ok, since this is an Elm conference, so I'm gonna bring this back to elm. How can we use horizon with elm in a nice way, 
so we don't have to write any code other than Elm code. Of course, the best way is to use elm web socket to talk to horizon server, and perhaps implements a some library on top of elm web socket to make the api nicer. Unfortunatly, at least until today we can really do this yet. On version 1, horizon implemented their communication layer with engine.io, which they replaced with native web socket on version 2. But as far as I know, there's no public API available yet on how to do web socket communication directly. So, the second best way is to use their javascript client library, and we can use Ports and Subscriptions to communicate to this library.  
---
class: elm ports center middle
## Elm - Ports & Subscriptions

.diagram[.ports[![Ports & Subscriptions Diagram](images/ports.png "Ports & Subscriptions Diagram")]]

???
Ports and Subscriptions are a way for elm to interop with javascripts. It's basically a message passing between elm and javascript, just like message passing between elm app and server. For sending data from elm to javascript, we use ports, and for receiving data from javascript to elm, we use subscriptions.

---
class: elm elm-horizon center middle
## Elm-Horizon
.diagram[.elm-horizon[![Elm Horizon Diagram](images/elm-horizon.png "Elm Horizon")]]

???
Now, let's see how we we can use ports and subscription with Horizon. So we'll use port to send json values out to horizon javascript client, and then we receive the json values back in using subscriptions. Each read and write actions will have a pair of ports and subscriptions. 

In the case of read action, we will send the message of what queries we're interested in subscribing to via ports using watch command and fetch command, and then we will receive the data via the matching watch subscription and fetch subscription.

In the case of write action, we send the message of what to insert, remove, update, etc, via ports, and we use subscription to get the status of that command.
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
???
So, here are those 3 categories of Collection API look like in Elm-Horizon. We have pairs of command and subscription function for each read and write actions. What I found interesting is the modifiers. Here, I implemented modifiers as union types, with each values has some data relevant to what the modifier is trying to do. For example, Limit modifiers will have Int for the number of data you want to subscribe to.
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
        , watchCmd "chat_messages"
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
            ( model, insertCmd "chat_messages" [ encode message ] )

subscriptions = insertSub InsertResponse
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