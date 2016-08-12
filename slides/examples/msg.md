## Msg
```elm
type Msg = 
    ...
    | Send
    | SendResponse (Result Error ())
    | NewMessage (Result Error (List (Maybe Message)))
    ...

```