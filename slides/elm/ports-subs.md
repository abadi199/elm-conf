#  Ports & Subscriptions

put diagram here

```elm
port out : String -> Cmd msg

port in : (String -> msg) -> Sub msg
```
