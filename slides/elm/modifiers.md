## Modifiers
```elm
type Modifier
    = Above Json.Value
    | Below Json.Value
    | Find (List Json.Value)
    | FindAll Json.Value
    | Limit Int
    | Order String Direction
```
```elm
toValue : Modifier -> Json.Value
toValue modifier =
    case modifier of
        Above value ->
            Encode.object [ ( "modifier", Encode.string "above" ), ( "value", value ) ]
        ...
```