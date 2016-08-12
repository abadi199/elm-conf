## Watch
```elm
update msg model =
    case msg of
        ...
        EnterChat ->
            ( { model | state = Chat }
            , Horizon.watchCmd "chat" [ Limit 20 ]
            )
        ...

```
```elm
subscriptions model =
    Sub.batch
        [ Horizon.watchSub messageDecoder NewMessage
        ...
        ]

```