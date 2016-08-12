## Ports
```elm
port watchPort : { name: String, values : List Json.Value } -> Cmd msg

watchCmd : CollectionName -> List Modifier -> Cmd msg
```

note:
    Put your speaker notes here.
    You can see them pressing 's'.
