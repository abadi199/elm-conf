##  Ports

This is a new Markdown slide
```elm
port modules Horizon exposing (..)
```

```elm
{-| This is a comment

Bla bla bal
-} 
port fetchPort : ( CollectionName, List Json.Value ) -> Cmd msg

port fetchSubscription : (ValuesResponse -> msg) -> Sub msg
```

note:
    Put your speaker notes here.
    You can see them pressing 's'.
