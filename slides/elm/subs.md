## Subscriptions

```elm
type alias Response = 
    { values : Maybe (List Json.Value), error : Maybe String }

port watchSubscription : (Response -> msg) -> Sub msg

watchSub : Decoder a -> (Result Error (List (Maybe a)) -> msg) -> Sub msg

```