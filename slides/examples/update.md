## Update
```elm
update msg model =
  case msg of
      ...
      Send ->
        ( model
        , Horizon.insertCmd "chat" (newMessageEncoder model.input |> toList)
        )

      NewMessage result ->
        case result of
          Err error -> ..

          Ok newMessages -> ( { model | messages = newMessages }, Cmd.none)
      ...
```  